<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

session_start();

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

switch ($method) {
    case 'GET':
        // Check if admin is logged in
        $isAdmin = isset($_SESSION['admin_id']);
        
        if (isset($_GET['id'])) {
            // Get single comment
            $query = "SELECT * FROM blog_comments WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $_GET['id']);
            $stmt->execute();
            
            $comment = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($comment) {
                echo json_encode(['success' => true, 'data' => $comment]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Comment not found']);
            }
        } elseif (isset($_GET['blog_id'])) {
            // Get comments for a specific blog post
            if ($isAdmin) {
                // Admin can see all comments
                $query = "SELECT * FROM blog_comments WHERE blog_post_id = :blog_id ORDER BY created_at DESC";
            } else {
                // Public users only see approved comments
                $query = "SELECT * FROM blog_comments WHERE blog_post_id = :blog_id AND status = 'approved' ORDER BY created_at DESC";
            }
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':blog_id', $_GET['blog_id']);
            $stmt->execute();
            
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $comments]);
        } else {
            // Get all comments (admin only)
            if (!$isAdmin) {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Unauthorized']);
                exit();
            }
            
            // Get all comments with blog post title
            $query = "SELECT c.*, b.title as blog_title 
                      FROM blog_comments c 
                      LEFT JOIN blog_posts b ON c.blog_post_id = b.id 
                      ORDER BY c.created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $comments]);
        }
        break;
        
    case 'POST':
        // Submit new comment (public)
        if (!isset($data->blog_post_id) || !isset($data->name) || !isset($data->email) || !isset($data->comment)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            exit();
        }
        
        // Validate email
        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid email address']);
            exit();
        }
        
        $query = "INSERT INTO blog_comments (blog_post_id, name, email, comment, status) 
                  VALUES (:blog_post_id, :name, :email, :comment, 'pending')";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':blog_post_id', $data->blog_post_id);
        $stmt->bindParam(':name', $data->name);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':comment', $data->comment);
        
        if ($stmt->execute()) {
            $id = $db->lastInsertId();
            echo json_encode([
                'success' => true, 
                'message' => 'Comment submitted successfully! It will be visible after admin approval.',
                'id' => $id
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to submit comment']);
        }
        break;
        
    case 'PUT':
        // Update comment status (admin only)
        if (!isset($_SESSION['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            exit();
        }
        
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Comment ID required']);
            exit();
        }
        
        if (!isset($data->status)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Status required']);
            exit();
        }
        
        $query = "UPDATE blog_comments SET status = :status WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':status', $data->status);
        $stmt->bindParam(':id', $_GET['id']);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Comment status updated']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to update comment']);
        }
        break;
        
    case 'DELETE':
        // Delete comment (admin only)
        if (!isset($_SESSION['admin_id'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            exit();
        }
        
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Comment ID required']);
            exit();
        }
        
        $query = "DELETE FROM blog_comments WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $_GET['id']);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Comment deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete comment']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
