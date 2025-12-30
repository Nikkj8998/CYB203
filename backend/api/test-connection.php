<?php
// Simple API test to verify database connection and blog data
require_once __DIR__ . '/config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    // Test basic connection
    $result = [
        'connection' => 'success',
        'database' => 'cybaemtech_CYB_db',
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    // Check blog_posts table
    $stmt = $conn->prepare("SHOW TABLES LIKE 'blog_posts'");
    $stmt->execute();
    $tableExists = $stmt->fetch();
    
    if ($tableExists) {
        $result['table_exists'] = true;
        
        // Count posts
        $stmt = $conn->prepare("SELECT COUNT(*) as total, 
                                     SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published
                              FROM blog_posts");
        $stmt->execute();
        $counts = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $result['post_counts'] = $counts;
        
        // Get sample published posts
        if ($counts['published'] > 0) {
            $stmt = $conn->prepare("SELECT id, title, status, featured_image, 
                                          SUBSTRING(content, 1, 100) as content_preview,
                                          LENGTH(content) as content_length
                                  FROM blog_posts 
                                  WHERE status = 'published' 
                                  LIMIT 2");
            $stmt->execute();
            $result['sample_posts'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    } else {
        $result['table_exists'] = false;
    }
    
    echo json_encode($result, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'connection' => 'failed',
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_PRETTY_PRINT);
}
?>