<?php
require_once __DIR__ . '/config/database.php';

echo "🔧 Fixing blog post images to use existing files...\n";

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    // Get list of actual image files
    $actualImages = [];
    
    // Check public/uploads directory
    $publicUploadsDir = __DIR__ . '/../public/uploads/';
    if (is_dir($publicUploadsDir)) {
        $files = glob($publicUploadsDir . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
        foreach ($files as $file) {
            $filename = basename($file);
            $actualImages[] = '/public/uploads/' . $filename;
        }
    }
    
    // Check uploads directory
    $uploadsDir = __DIR__ . '/../uploads/';
    if (is_dir($uploadsDir)) {
        $files = glob($uploadsDir . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
        foreach ($files as $file) {
            $filename = basename($file);
            $actualImages[] = '/uploads/' . $filename;
        }
    }
    
    echo "Found " . count($actualImages) . " actual image files:\n";
    foreach ($actualImages as $img) {
        echo "- " . $img . "\n";
    }
    echo "\n";
    
    // Get blog posts with missing images
    $stmt = $conn->prepare("SELECT id, title, featured_image FROM blog_posts WHERE featured_image IS NOT NULL AND featured_image != ''");
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $updated = 0;
    foreach ($posts as $post) {
        $currentImage = $post['featured_image'];
        
        // Check if current image file exists
        $exists = false;
        if (strpos($currentImage, '/public/uploads/') === 0) {
            $filePath = __DIR__ . '/../' . $currentImage;
        } elseif (strpos($currentImage, '/uploads/') === 0) {
            $filePath = __DIR__ . '/..' . $currentImage;
        } else {
            $filePath = null;
        }
        
        if ($filePath && file_exists($filePath)) {
            echo "✅ Post {$post['id']}: Image exists - {$currentImage}\n";
            continue;
        }
        
        // Image doesn't exist, assign a random existing image
        if (!empty($actualImages)) {
            $newImage = $actualImages[array_rand($actualImages)];
            
            $updateStmt = $conn->prepare("UPDATE blog_posts SET featured_image = ? WHERE id = ?");
            $updateStmt->execute([$newImage, $post['id']]);
            
            echo "🔄 Post {$post['id']}: Updated {$currentImage} → {$newImage}\n";
            $updated++;
        } else {
            echo "❌ Post {$post['id']}: No images available to assign\n";
        }
    }
    
    echo "\n✅ Updated {$updated} blog posts with existing images.\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>