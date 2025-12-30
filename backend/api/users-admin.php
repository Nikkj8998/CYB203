<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../email_notifications.php';

session_start();

// Allowed roles
define('ALLOWED_ROLES', ['super_admin', 'admin', 'user']);

// Allowed permission modules
define('ALLOWED_MODULES', ['dashboard', 'content', 'comments', 'leads', 'jobs', 'job-applications', 'gallery', 'media', 'settings', 'users']);

// Check if user is authenticated and is super_admin
function checkSuperAdmin() {
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    
    // Check if user is super_admin
    if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super_admin') {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Access denied. Super admin only.']);
        exit;
    }
}

// Validate role
function validateRole($role) {
    return in_array($role, ALLOWED_ROLES);
}

// Validate permissions array
function validatePermissions($permissions) {
    if (!is_array($permissions)) {
        return false;
    }
    foreach ($permissions as $perm) {
        if (!in_array($perm, ALLOWED_MODULES)) {
            return false;
        }
    }
    return true;
}

// Validate email format
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Check if this is the only super admin
function isOnlySuperAdmin($db, $userId) {
    $stmt = $db->prepare("SELECT COUNT(*) as count FROM admin_users WHERE role = 'super_admin' AND id != ?");
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result['count'] == 0;
}

$database = new Database();
$db = $database->getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

// GET - List all users or get single user
if ($method === 'GET') {
    checkSuperAdmin();
    
    if ($action === 'list') {
        try {
            $stmt = $db->prepare("
                SELECT id, username, email, role, permissions, status, last_login, created_at, updated_at
                FROM admin_users 
                ORDER BY created_at DESC
            ");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Parse permissions JSON for each user
            foreach ($users as &$user) {
                $user['permissions'] = $user['permissions'] ? json_decode($user['permissions'], true) : [];
            }
            
            http_response_code(200);
            echo json_encode(['success' => true, 'data' => $users]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to fetch users']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
    }
}

// POST - Create new user
elseif ($method === 'POST') {
    checkSuperAdmin();
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Username, email, and password are required']);
        exit;
    }
    
    // Validate email format
    if (!validateEmail($data['email'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Validate role
    $role = isset($data['role']) ? $data['role'] : 'user';
    if (!validateRole($role)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid role. Allowed: ' . implode(', ', ALLOWED_ROLES)]);
        exit;
    }
    
    // Validate permissions
    $permissions = null;
    if (isset($data['permissions']) && !empty($data['permissions'])) {
        if (!validatePermissions($data['permissions'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid permissions. Allowed modules: ' . implode(', ', ALLOWED_MODULES)]);
            exit;
        }
        $permissions = json_encode($data['permissions']);
    }
    
    try {
        // Check if username or email already exists
        $stmt = $db->prepare("SELECT id FROM admin_users WHERE username = ? OR email = ?");
        $stmt->execute([$data['username'], $data['email']]);
        if ($stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
            exit;
        }
        
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
        $status = isset($data['status']) ? $data['status'] : 'active';
        
        $stmt = $db->prepare("
            INSERT INTO admin_users (username, email, password, role, permissions, status, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['username'],
            $data['email'],
            $hashedPassword,
            $role,
            $permissions,
            $status,
            $_SESSION['admin_id']
        ]);
        
        $userId = $db->lastInsertId();
        
        // Send email notification
        sendAdminNotificationEmail('user_created', [
            'id' => $userId,
            'username' => $data['username'],
            'email' => $data['email'],
            'role' => $role,
            'status' => $status,
            'permissions' => $data['permissions'] ?? []
        ]);
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'User created successfully',
            'user_id' => $userId
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create user: ' . $e->getMessage()]);
    }
}

// PUT - Update existing user
elseif ($method === 'PUT') {
    checkSuperAdmin();
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }
    
    // Prevent modifying user ID 1 (built-in super admin)
    if ($data['id'] == 1) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Cannot modify the built-in super admin account']);
        exit;
    }
    
    try {
        // Get current user info
        $stmt = $db->prepare("SELECT role FROM admin_users WHERE id = ?");
        $stmt->execute([$data['id']]);
        $currentUser = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$currentUser) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'User not found']);
            exit;
        }
        
        // Check if trying to demote the only super admin
        if (isset($data['role']) && $data['role'] !== 'super_admin' && $currentUser['role'] === 'super_admin') {
            if (isOnlySuperAdmin($db, $data['id'])) {
                http_response_code(403);
                echo json_encode(['success' => false, 'message' => 'Cannot demote the only super admin']);
                exit;
            }
        }
        
        // Check if trying to disable the only super admin
        if (isset($data['status']) && $data['status'] === 'disabled' && $currentUser['role'] === 'super_admin') {
            if (isOnlySuperAdmin($db, $data['id'])) {
                http_response_code(403);
                echo json_encode(['success' => false, 'message' => 'Cannot disable the only super admin']);
                exit;
            }
        }
        
        // Build update query dynamically based on provided fields
        $updateFields = [];
        $params = [];
        
        if (isset($data['username'])) {
            $updateFields[] = "username = ?";
            $params[] = $data['username'];
        }
        if (isset($data['email'])) {
            if (!validateEmail($data['email'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid email format']);
                exit;
            }
            $updateFields[] = "email = ?";
            $params[] = $data['email'];
        }
        if (isset($data['password']) && !empty($data['password'])) {
            $updateFields[] = "password = ?";
            $params[] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        if (isset($data['role'])) {
            if (!validateRole($data['role'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid role. Allowed: ' . implode(', ', ALLOWED_ROLES)]);
                exit;
            }
            $updateFields[] = "role = ?";
            $params[] = $data['role'];
        }
        if (isset($data['status'])) {
            $updateFields[] = "status = ?";
            $params[] = $data['status'];
        }
        if (isset($data['permissions'])) {
            if (!empty($data['permissions']) && !validatePermissions($data['permissions'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid permissions. Allowed modules: ' . implode(', ', ALLOWED_MODULES)]);
                exit;
            }
            $updateFields[] = "permissions = ?";
            $params[] = json_encode($data['permissions']);
        }
        
        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No fields to update']);
            exit;
        }
        
        $params[] = $data['id'];
        
        $sql = "UPDATE admin_users SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        // Send email notification
        sendAdminNotificationEmail('user_updated', [
            'id' => $data['id'],
            'username' => $data['username'] ?? 'N/A',
            'email' => $data['email'] ?? 'N/A',
            'role' => $data['role'] ?? 'N/A',
            'status' => $data['status'] ?? 'N/A',
            'updated_fields' => implode(', ', array_map(function($field) {
                return str_replace(' = ?', '', $field);
            }, $updateFields))
        ]);
        
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'User updated successfully']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update user: ' . $e->getMessage()]);
    }
}

// DELETE - Delete user
elseif ($method === 'DELETE') {
    checkSuperAdmin();
    
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'User ID is required']);
        exit;
    }
    
    // Prevent deleting built-in super admin (user id 1)
    if ($data['id'] == 1) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Cannot delete the built-in super admin account']);
        exit;
    }
    
    // Prevent deleting your own account
    if ($data['id'] == $_SESSION['admin_id']) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Cannot delete your own account']);
        exit;
    }
    
    try {
        // Check if this is the only super admin
        $stmt = $db->prepare("SELECT role FROM admin_users WHERE id = ?");
        $stmt->execute([$data['id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'User not found']);
            exit;
        }
        
        if ($user['role'] === 'super_admin' && isOnlySuperAdmin($db, $data['id'])) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Cannot delete the only super admin']);
            exit;
        }
        
        // Get full user details before deletion
        $stmt = $db->prepare("SELECT * FROM admin_users WHERE id = ?");
        $stmt->execute([$data['id']]);
        $userDetails = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $stmt = $db->prepare("DELETE FROM admin_users WHERE id = ?");
        $stmt->execute([$data['id']]);
        
        // Send email notification
        if ($userDetails) {
            sendAdminNotificationEmail('user_deleted', [
                'id' => $data['id'],
                'username' => $userDetails['username'],
                'email' => $userDetails['email'],
                'role' => $userDetails['role'],
                'status' => $userDetails['status']
            ]);
        }
        
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete user: ' . $e->getMessage()]);
    }
}

else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
