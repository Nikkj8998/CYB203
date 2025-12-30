<?php
require_once 'database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    // Create admin_users table
    $query = "CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $db->exec($query);

    // Create blog_posts table
    $query = "CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'draft',
        type VARCHAR(50) DEFAULT 'Blog Post',
        author VARCHAR(100),
        featured_image VARCHAR(500),
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $db->exec($query);

    // Create media_library table
    $query = "CREATE TABLE IF NOT EXISTS media_library (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        file_type VARCHAR(50),
        file_size VARCHAR(50),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $db->exec($query);

    // Create blog_comments table
    $query = "CREATE TABLE IF NOT EXISTS blog_comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        blog_post_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        comment TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
    )";
    $db->exec($query);

    // Create indexes for blog_comments
    $db->exec("CREATE INDEX IF NOT EXISTS idx_comment_status ON blog_comments(status)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_comment_blog_id ON blog_comments(blog_post_id)");

    // Check if admin user exists, if not create default
    $query = "SELECT COUNT(*) FROM admin_users WHERE username = 'admin'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        // Create default admin user
        $default_password = password_hash('admin123', PASSWORD_DEFAULT);
        $query = "INSERT INTO admin_users (username, password, email) VALUES ('admin', :password, 'pramod.lohgaonkar@cybaemtech.com')";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':password', $default_password);
        $stmt->execute();
    }

    echo "Database initialized successfully!\n";
    echo "Default admin user: admin / admin123\n";

} catch(PDOException $exception) {
    die("Database initialization failed: " . $exception->getMessage() . "\n");
}
?>
