<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

// GET - Fetch gallery items
if ($method === 'GET') {
    try {
        if ($id) {
            // Get single gallery item
            $query = "SELECT * FROM gallery WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $gallery = $stmt->fetch(PDO::FETCH_ASSOC);
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $gallery
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Gallery item not found'
                ]);
            }
        } else {
            // Get all gallery items
            $status = isset($_GET['status']) ? $_GET['status'] : 'active';
            
            if ($status === 'all') {
                $query = "SELECT * FROM gallery ORDER BY display_order ASC, created_at DESC";
                $stmt = $db->prepare($query);
            } else {
                $query = "SELECT * FROM gallery WHERE status = :status ORDER BY display_order ASC, created_at DESC";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':status', $status);
            }
            
            $stmt->execute();
            $galleries = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $galleries
            ]);
        }
    } catch (PDOException $e) {
        error_log('Gallery API Error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while processing your request'
        ]);
    }
}

// POST - Create new gallery item
elseif ($method === 'POST') {
    session_start();
    
    // Check authentication
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized'
        ]);
        exit;
    }
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (empty($data->title) || empty($data->image_url)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Title and image URL are required'
        ]);
        exit;
    }
    
    try {
        $query = "INSERT INTO gallery (title, image_url, category, display_order, status) 
                  VALUES (:title, :image_url, :category, :display_order, :status)";
        
        $stmt = $db->prepare($query);
        
        $title = $data->title;
        $image_url = $data->image_url;
        $category = isset($data->category) ? $data->category : 'celebration';
        $display_order = isset($data->display_order) ? $data->display_order : 0;
        $status = isset($data->status) ? $data->status : 'active';
        
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':image_url', $image_url);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':display_order', $display_order);
        $stmt->bindParam(':status', $status);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                'success' => true,
                'message' => 'Gallery item created successfully',
                'id' => $db->lastInsertId()
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to create gallery item'
            ]);
        }
    } catch (PDOException $e) {
        error_log('Gallery API Error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while processing your request'
        ]);
    }
}

// PUT - Update gallery item
elseif ($method === 'PUT') {
    session_start();
    
    // Check authentication
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized'
        ]);
        exit;
    }
    
    if (!$id) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Gallery ID is required'
        ]);
        exit;
    }
    
    $data = json_decode(file_get_contents("php://input"));
    
    try {
        $query = "UPDATE gallery SET 
                  title = :title,
                  image_url = :image_url,
                  category = :category,
                  display_order = :display_order,
                  status = :status
                  WHERE id = :id";
        
        $stmt = $db->prepare($query);
        
        $title = $data->title;
        $image_url = $data->image_url;
        $category = $data->category;
        $display_order = $data->display_order;
        $status = $data->status;
        
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':image_url', $image_url);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':display_order', $display_order);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Gallery item updated successfully'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to update gallery item'
            ]);
        }
    } catch (PDOException $e) {
        error_log('Gallery API Error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while processing your request'
        ]);
    }
}

// DELETE - Delete gallery item
elseif ($method === 'DELETE') {
    session_start();
    
    // Check authentication
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized'
        ]);
        exit;
    }
    
    if (!$id) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Gallery ID is required'
        ]);
        exit;
    }
    
    try {
        $query = "DELETE FROM gallery WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Gallery item deleted successfully'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to delete gallery item'
            ]);
        }
    } catch (PDOException $e) {
        error_log('Gallery API Error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while processing your request'
        ]);
    }
}

else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
}
?>
