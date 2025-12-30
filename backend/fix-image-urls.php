<?php
require_once __DIR__ . '/config/database.php';

echo "🔧 Fixing blog image URLs for live deployment...\n";

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Fix featured_image URLs in blog_posts table - convert /uploads/ to /public/uploads/
    echo "Checking blog_posts table for image URL issues...\n";
    
    $query = "SELECT id, featured_image FROM blog_posts WHERE featured_image LIKE '/uploads/%' AND featured_image NOT LIKE '/public/uploads/%'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $fixed_posts = 0;
    foreach ($posts as $post) {
        $old_url = $post['featured_image'];
        $new_url = str_replace('/uploads/', '/public/uploads/', $old_url);
        
        $update_query = "UPDATE blog_posts SET featured_image = :new_url WHERE id = :id";
        $update_stmt = $db->prepare($update_query);
        $update_stmt->bindParam(':new_url', $new_url);
        $update_stmt->bindParam(':id', $post['id']);
        
        if ($update_stmt->execute()) {
            echo "Fixed post ID {$post['id']}: {$old_url} → {$new_url}\n";
            $fixed_posts++;
        }
    }
    
    // Fix URLs in media_library table
    echo "\nChecking media_library table for URL issues...\n";
    
    $query = "SELECT id, url FROM media_library WHERE url LIKE '/uploads/%' AND url NOT LIKE '/public/uploads/%'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $media = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $fixed_media = 0;
    foreach ($media as $item) {
        $old_url = $item['url'];
        $new_url = str_replace('/uploads/', '/public/uploads/', $old_url);
        
        $update_query = "UPDATE media_library SET url = :new_url WHERE id = :id";
        $update_stmt = $db->prepare($update_query);
        $update_stmt->bindParam(':new_url', $new_url);
        $update_stmt->bindParam(':id', $item['id']);
        
        if ($update_stmt->execute()) {
            echo "Fixed media ID {$item['id']}: {$old_url} → {$new_url}\n";
            $fixed_media++;
        }
    }
    
    // Fix any content URLs in blog post content
    echo "\nChecking blog post content for embedded image URLs...\n";
    
    $query = "SELECT id, content FROM blog_posts WHERE content LIKE '%/uploads/%' AND content NOT LIKE '%/public/uploads/%'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $content_posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $fixed_content = 0;
    foreach ($content_posts as $post) {
        $old_content = $post['content'];
        $new_content = str_replace('/uploads/', '/public/uploads/', $old_content);
        
        if ($old_content !== $new_content) {
            $update_query = "UPDATE blog_posts SET content = :new_content WHERE id = :id";
            $update_stmt = $db->prepare($update_query);
            $update_stmt->bindParam(':new_content', $new_content);
            $update_stmt->bindParam(':id', $post['id']);
            
            if ($update_stmt->execute()) {
                echo "Fixed content in post ID {$post['id']}\n";
                $fixed_content++;
            }
        }
    }
    
    echo "\n✅ Database URL Fix Complete!\n";
    echo "Fixed {$fixed_posts} blog post featured images\n";
    echo "Fixed {$fixed_media} media library URLs\n";
    echo "Fixed {$fixed_content} blog post content URLs\n";
    echo "\nYour blog images should now work correctly with /public/uploads/ URLs.\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>