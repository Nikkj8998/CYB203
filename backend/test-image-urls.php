<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    echo "🔍 Testing blog image URLs...\n\n";
    
    // Get all blog posts with images
    $stmt = $conn->prepare("SELECT id, title, featured_image FROM blog_posts WHERE featured_image IS NOT NULL AND featured_image != '' ORDER BY created_at DESC LIMIT 10");
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Found " . count($posts) . " blog posts with images:\n\n";
    
    foreach ($posts as $post) {
        echo "Post ID: " . $post['id'] . "\n";
        echo "Title: " . $post['title'] . "\n";
        echo "Image URL in DB: " . $post['featured_image'] . "\n";
        
        // Test different URL variations
        $imageUrl = $post['featured_image'];
        $baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'];
        
        // Check if it's already a full URL
        if (strpos($imageUrl, 'http') === 0) {
            echo "Full URL: " . $imageUrl . "\n";
        } else {
            // Test various URL formats
            $testUrls = [
                $baseUrl . $imageUrl,
                $baseUrl . '/public' . $imageUrl,
                $baseUrl . '/public/uploads/' . basename($imageUrl),
                $baseUrl . '/uploads/' . basename($imageUrl)
            ];
            
            foreach ($testUrls as $testUrl) {
                $headers = @get_headers($testUrl);
                $exists = $headers && strpos($headers[0], '200') !== false;
                echo ($exists ? "✅" : "❌") . " " . $testUrl . "\n";
            }
        }
        echo "---\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>