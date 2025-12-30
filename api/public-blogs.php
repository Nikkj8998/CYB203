<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['id'])) {
        // Get single published blog post - by ID
        $query = "SELECT id, title, slug, excerpt, content, type, author, author_linkedin, author_title, author_photo, featured_image, views, created_at, updated_at, tags 
                  FROM blog_posts 
                  WHERE id = :id AND status = 'published'";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $_GET['id']);
        $stmt->execute();
        
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post) {
            // Increment view count
            $updateQuery = "UPDATE blog_posts SET views = views + 1 WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':id', $_GET['id']);
            $updateStmt->execute();
            
            echo json_encode(['success' => true, 'data' => $post]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Post not found']);
        }
    } elseif (isset($_GET['slug'])) {
        // Get single published blog post - by slug
        $query = "SELECT id, title, slug, excerpt, content, type, author, author_linkedin, author_title, author_photo, featured_image, views, created_at, updated_at, tags 
                  FROM blog_posts 
                  WHERE slug = :slug AND status = 'published'";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':slug', $_GET['slug']);
        $stmt->execute();
        
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post) {
            // Increment view count
            $updateQuery = "UPDATE blog_posts SET views = views + 1 WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(':id', $post['id']);
            $updateStmt->execute();
            
            echo json_encode(['success' => true, 'data' => $post]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Post not found']);
        }
    } else {
        // Get all published blog posts
        $query = "SELECT id, title, slug, excerpt, content, type, author, author_linkedin, author_title, author_photo, featured_image, views, created_at, updated_at, tags 
                  FROM blog_posts 
                  WHERE status = 'published' 
                  ORDER BY created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();
        
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $posts]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
