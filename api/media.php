<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

session_start();

// Check authentication
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all media
        $query = "SELECT * FROM media_library ORDER BY uploaded_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $media = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $media]);
        break;
        
    case 'POST':
        // Upload media
        if (isset($_FILES['file'])) {
            // Handle file upload
            $file = $_FILES['file'];
            $upload_dir = '../public/uploads/';
            
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            
            $file_ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            $file_name = uniqid() . '.' . $file_ext;
            $file_path = $upload_dir . $file_name;
            
            if (move_uploaded_file($file['tmp_name'], $file_path)) {
                $url = '/public/uploads/' . $file_name;
                $name = $_POST['name'] ?? pathinfo($file['name'], PATHINFO_FILENAME);
                $file_type = $file['type'];
                $file_size = round($file['size'] / 1024, 2) . ' KB';
                
                $query = "INSERT INTO media_library (name, url, file_type, file_size) 
                          VALUES (:name, :url, :file_type, :file_size)";
                
                $stmt = $db->prepare($query);
                $stmt->bindParam(':name', $name);
                $stmt->bindParam(':url', $url);
                $stmt->bindParam(':file_type', $file_type);
                $stmt->bindParam(':file_size', $file_size);
                
                if ($stmt->execute()) {
                    $id = $db->lastInsertId();
                    echo json_encode([
                        'success' => true, 
                        'message' => 'Media uploaded',
                        'data' => [
                            'id' => $id,
                            'name' => $name,
                            'url' => $url,
                            'file_type' => $file_type,
                            'file_size' => $file_size
                        ]
                    ]);
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'message' => 'Failed to save media info']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
            }
        } else {
            // Handle URL-based media
            $data = json_decode(file_get_contents("php://input"));
            
            $query = "INSERT INTO media_library (name, url, file_type, file_size) 
                      VALUES (:name, :url, :file_type, :file_size)";
            
            $stmt = $db->prepare($query);
            $file_type = 'external';
            $file_size = 'N/A';
            
            $stmt->bindParam(':name', $data->name);
            $stmt->bindParam(':url', $data->url);
            $stmt->bindParam(':file_type', $file_type);
            $stmt->bindParam(':file_size', $file_size);
            
            if ($stmt->execute()) {
                $id = $db->lastInsertId();
                echo json_encode(['success' => true, 'message' => 'Media added', 'id' => $id]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to add media']);
            }
        }
        break;
        
    case 'DELETE':
        // Delete media
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Media ID required']);
            exit();
        }
        
        // Get media info to delete file
        $query = "SELECT url FROM media_library WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $_GET['id']);
        $stmt->execute();
        $media = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($media && strpos($media['url'], '/backend/uploads/') === 0) {
            $file_path = '..' . substr($media['url'], 8); // Remove '/backend' prefix
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }
        
        // Delete from database
        $query = "DELETE FROM media_library WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $_GET['id']);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Media deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete media']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
