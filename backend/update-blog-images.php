<?php
require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    // Update with more appropriate images
    $updates = [
        25 => '/public/uploads/Business_Acumen.png', // Computer AMC Services post
        37 => '/public/uploads/wordcloud.png'        // Supply Chain post
    ];
    
    foreach ($updates as $id => $image) {
        $stmt = $conn->prepare('UPDATE blog_posts SET featured_image = ? WHERE id = ?');
        $stmt->execute([$image, $id]);
        echo "Updated post $id with image $image\n";
    }
    echo "✅ Blog images updated successfully!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>