<?php
header('Content-Type: application/json');
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

session_start();

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        throw new Exception('Database connection failed');
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    
    // Admin authentication check for write operations
    function checkAuth() {
        if (!isset($_SESSION['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            exit;
        }
    }
    
    if ($method === 'GET') {
        // Check if user is authenticated admin
        $isAdmin = isset($_SESSION['admin_id']);
        
        if (isset($_GET['id'])) {
            // Get single job by ID
            if ($isAdmin) {
                // Admins get all fields
                $query = "SELECT * FROM jobs WHERE id = :id";
            } else {
                // Public gets only safe fields and only active jobs
                $query = "SELECT id, title, location, type, experience, description, requirements, responsibilities, salary, department, created_at 
                          FROM jobs WHERE id = :id AND status = 'active'";
            }
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $_GET['id']);
            $stmt->execute();
            
            $job = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($job) {
                echo json_encode(['success' => true, 'data' => $job]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Job not found']);
            }
        } else {
            // Get all jobs
            $status = $_GET['status'] ?? null;
            
            if ($isAdmin) {
                // Admins can filter by any status and see all fields
                if ($status) {
                    $query = "SELECT * FROM jobs WHERE status = :status ORDER BY created_at DESC";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(':status', $status);
                } else {
                    $query = "SELECT * FROM jobs ORDER BY created_at DESC";
                    $stmt = $db->prepare($query);
                }
            } else {
                // Public gets only safe fields of active jobs
                $query = "SELECT id, title, location, type, experience, description, requirements, responsibilities, salary, department, created_at 
                          FROM jobs WHERE status = 'active' ORDER BY created_at DESC";
                $stmt = $db->prepare($query);
            }
            
            $stmt->execute();
            $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode(['success' => true, 'data' => $jobs]);
        }
    } elseif ($method === 'POST') {
        checkAuth();
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['title']) || !isset($data['location']) || !isset($data['type']) || !isset($data['description'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit;
        }
        
        $query = "INSERT INTO jobs (title, location, type, experience, description, requirements, responsibilities, salary, department, status) 
                  VALUES (:title, :location, :type, :experience, :description, :requirements, :responsibilities, :salary, :department, :status)";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':location', $data['location']);
        $stmt->bindParam(':type', $data['type']);
        $stmt->bindParam(':experience', $data['experience']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':requirements', $data['requirements']);
        $stmt->bindParam(':responsibilities', $data['responsibilities']);
        $salary = $data['salary'] ?? 'Competitive';
        $stmt->bindParam(':salary', $salary);
        $department = $data['department'] ?? 'General';
        $stmt->bindParam(':department', $department);
        $status = $data['status'] ?? 'active';
        $stmt->bindParam(':status', $status);
        
        if ($stmt->execute()) {
            $jobId = $db->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => 'Job created successfully',
                'data' => ['id' => $jobId]
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to create job']);
        }
    } elseif ($method === 'PUT') {
        checkAuth();
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Job ID is required']);
            exit;
        }
        
        $query = "UPDATE jobs SET 
                  title = :title,
                  location = :location,
                  type = :type,
                  experience = :experience,
                  description = :description,
                  requirements = :requirements,
                  responsibilities = :responsibilities,
                  salary = :salary,
                  department = :department,
                  status = :status
                  WHERE id = :id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $data['id']);
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':location', $data['location']);
        $stmt->bindParam(':type', $data['type']);
        $stmt->bindParam(':experience', $data['experience']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':requirements', $data['requirements']);
        $stmt->bindParam(':responsibilities', $data['responsibilities']);
        $salary = $data['salary'] ?? 'Competitive';
        $stmt->bindParam(':salary', $salary);
        $department = $data['department'] ?? 'General';
        $stmt->bindParam(':department', $department);
        $stmt->bindParam(':status', $data['status']);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Job updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to update job']);
        }
    } elseif ($method === 'DELETE') {
        checkAuth();
        
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Job ID is required']);
            exit;
        }
        
        $query = "DELETE FROM jobs WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $data['id']);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Job deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete job']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    }
    
} catch (PDOException $e) {
    error_log("Database error in jobs.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    error_log("Error in jobs.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
