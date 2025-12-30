<?php
// Database connection test script
require_once __DIR__ . '/config/database.php';

echo "<h2>Database Connection Test</h2>";

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    if ($conn) {
        echo "<p style='color: green;'>✅ Database connection successful!</p>";
        
        // Test the blog_posts table
        $stmt = $conn->prepare("SHOW TABLES LIKE 'blog_posts'");
        $stmt->execute();
        $tableExists = $stmt->fetch();
        
        if ($tableExists) {
            echo "<p style='color: green;'>✅ blog_posts table exists!</p>";
            
            // Count posts
            $stmt = $conn->prepare("SELECT COUNT(*) as total, 
                                         SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published,
                                         SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
                                  FROM blog_posts");
            $stmt->execute();
            $counts = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo "<p><strong>Posts in database:</strong></p>";
            echo "<ul>";
            echo "<li>Total: {$counts['total']}</li>";
            echo "<li>Published: {$counts['published']}</li>";
            echo "<li>Draft: {$counts['draft']}</li>";
            echo "</ul>";
            
            if ($counts['published'] > 0) {
                echo "<p style='color: green;'>✅ Published posts found!</p>";
                
                // Show sample published posts
                $stmt = $conn->prepare("SELECT id, title, status, featured_image, 
                                              LENGTH(content) as content_length,
                                              LENGTH(excerpt) as excerpt_length
                                      FROM blog_posts 
                                      WHERE status = 'published' 
                                      LIMIT 3");
                $stmt->execute();
                $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                echo "<h3>Sample Published Posts:</h3>";
                echo "<table border='1' style='border-collapse: collapse; margin: 10px 0;'>";
                echo "<tr><th>ID</th><th>Title</th><th>Status</th><th>Image</th><th>Content Length</th><th>Excerpt Length</th></tr>";
                foreach ($posts as $post) {
                    echo "<tr>";
                    echo "<td>{$post['id']}</td>";
                    echo "<td>{$post['title']}</td>";
                    echo "<td>{$post['status']}</td>";
                    echo "<td>" . (!empty($post['featured_image']) ? '✅' : '❌') . "</td>";
                    echo "<td>{$post['content_length']}</td>";
                    echo "<td>{$post['excerpt_length']}</td>";
                    echo "</tr>";
                }
                echo "</table>";
            } else {
                echo "<p style='color: orange;'>⚠️ No published posts found. Make sure you have posts with status = 'published'</p>";
                
                // Show all posts for debugging
                $stmt = $conn->prepare("SELECT id, title, status FROM blog_posts LIMIT 5");
                $stmt->execute();
                $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (!empty($posts)) {
                    echo "<h3>All Posts (for debugging):</h3>";
                    echo "<table border='1' style='border-collapse: collapse;'>";
                    echo "<tr><th>ID</th><th>Title</th><th>Status</th></tr>";
                    foreach ($posts as $post) {
                        echo "<tr>";
                        echo "<td>{$post['id']}</td>";
                        echo "<td>{$post['title']}</td>";
                        echo "<td>{$post['status']}</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                }
            }
        } else {
            echo "<p style='color: red;'>❌ blog_posts table does not exist!</p>";
            echo "<p>Please create the table or check your database name.</p>";
        }
    }
    
} catch (PDOException $e) {
    echo "<p style='color: red;'>❌ Database connection failed:</p>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Please check:</strong></p>";
    echo "<ul>";
    echo "<li>Database credentials in backend/.env file</li>";
    echo "<li>Database server is running</li>";
    echo "<li>Database name 'cybaemtech_CYB_db' exists</li>";
    echo "<li>User has proper permissions</li>";
    echo "</ul>";
    
    // Show current environment values (without password)
    echo "<h3>Current Configuration:</h3>";
    echo "<ul>";
    echo "<li>DB_HOST: " . (getenv('DB_HOST') ?: 'Not set') . "</li>";
    echo "<li>DB_NAME: " . (getenv('DB_NAME') ?: 'Not set') . "</li>";
    echo "<li>DB_USER: " . (getenv('DB_USER') ?: 'Not set') . "</li>";
    echo "<li>DB_PASSWORD: " . (getenv('DB_PASSWORD') ? '***' : 'Not set') . "</li>";
    echo "<li>DB_PORT: " . (getenv('DB_PORT') ?: 'Not set') . "</li>";
    echo "</ul>";
}
?>