<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json');

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    // Get a sample blog post to debug the data structure
    $stmt = $conn->prepare("SELECT * FROM blog_posts WHERE status = 'published' LIMIT 1");
    $stmt->execute();
    $samplePost = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Get the total count
    $countStmt = $conn->prepare("SELECT COUNT(*) as total FROM blog_posts WHERE status = 'published'");
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Get all posts
    $allStmt = $conn->prepare("SELECT id, title, featured_image, content, excerpt, status FROM blog_posts ORDER BY created_at DESC");
    $allStmt->execute();
    $allPosts = $allStmt->fetchAll(PDO::FETCH_ASSOC);
    
    $response = [
        'success' => true,
        'debug_info' => [
            'total_published_posts' => $totalCount,
            'sample_post' => $samplePost,
            'all_posts_summary' => array_map(function($post) {
                return [
                    'id' => $post['id'],
                    'title' => $post['title'],
                    'featured_image' => $post['featured_image'],
                    'has_content' => !empty($post['content']),
                    'content_length' => strlen($post['content'] ?? ''),
                    'has_excerpt' => !empty($post['excerpt']),
                    'status' => $post['status']
                ];
            }, $allPosts),
            'database_structure' => [
                'table_exists' => true,
                'connection_test' => 'successful'
            ]
        ]
    ];
    
    echo json_encode($response, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug_info' => [
            'error_type' => 'database_connection_failed'
        ]
    ]);
}
?>