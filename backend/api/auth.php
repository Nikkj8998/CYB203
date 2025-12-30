<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'login') {
    try {
        if (!empty($data->username) && !empty($data->password)) {
            $query = "SELECT id, username, password, email, role, permissions FROM admin_users WHERE username = :username LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':username', $data->username);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($data->password, $row['password'])) {
                    // Parse permissions JSON
                    $permissions = $row['permissions'] ? json_decode($row['permissions'], true) : [];
                    
                    // Start session and create token
                    session_start();
                    $_SESSION['admin_id'] = $row['id'];
                    $_SESSION['admin_username'] = $row['username'];
                    $_SESSION['admin_email'] = $row['email'];
                    $_SESSION['admin_role'] = $row['role'];
                    $_SESSION['admin_permissions'] = $permissions;
                    
                    http_response_code(200);
                    echo json_encode([
                        'success' => true,
                        'message' => 'Login successful',
                        'user' => [
                            'id' => $row['id'],
                            'username' => $row['username'],
                            'email' => $row['email'],
                            'role' => $row['role'],
                            'permissions' => $permissions
                        ]
                    ]);
                } else {
                    http_response_code(401);
                    echo json_encode([
                        'success' => false,
                        'message' => 'Invalid credentials'
                    ]);
                }
            } else {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }
        } else {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Username and password required'
            ]);
        }
    } catch (Exception $e) {
        error_log("Auth login error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: ' . $e->getMessage()
        ]);
    }
} elseif ($action === 'logout') {
    session_start();
    session_destroy();
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Logout successful'
    ]);
} elseif ($action === 'check') {
    session_start();
    
    if (isset($_SESSION['admin_id'])) {
        // Fetch fresh user data from database
        $query = "SELECT id, username, email, role, permissions FROM admin_users WHERE id = :id LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $_SESSION['admin_id']);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $permissions = $row['permissions'] ? json_decode($row['permissions'], true) : [];
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'authenticated' => true,
                'user' => [
                    'id' => $row['id'],
                    'username' => $row['username'],
                    'email' => $row['email'],
                    'role' => $row['role'],
                    'permissions' => $permissions
                ]
            ]);
        } else {
            // User not found in database, clear session
            session_destroy();
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'authenticated' => false
            ]);
        }
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'authenticated' => false
        ]);
    }
} elseif ($action === 'change-password') {
    session_start();
    
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Not authenticated'
        ]);
        exit;
    }
    
    if (empty($data->currentPassword) || empty($data->newPassword)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Current password and new password are required'
        ]);
        exit;
    }
    
    // Get current user
    $query = "SELECT id, password FROM admin_users WHERE id = :id LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $_SESSION['admin_id']);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify current password
        if (password_verify($data->currentPassword, $row['password'])) {
            // Hash new password
            $hashedPassword = password_hash($data->newPassword, PASSWORD_DEFAULT);
            
            // Update password
            $updateQuery = "UPDATE admin_users SET password = :password WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':password', $hashedPassword);
            $updateStmt->bindParam(':id', $_SESSION['admin_id']);
            
            if ($updateStmt->execute()) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Password updated successfully'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to update password'
                ]);
            }
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Current password is incorrect'
            ]);
        }
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid action'
    ]);
}
?>
