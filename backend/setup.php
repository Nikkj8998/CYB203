<?php
/**
 * Database Setup Script for cPanel
 * 
 * Access this file via: https://www.cybaemtech.com/backend/setup.php
 * This will create the admin user automatically.
 * 
 * DELETE THIS FILE after setup for security!
 */

header('Content-Type: text/html; charset=utf-8');

// Check if already setup (prevent accidental re-runs)
$lockFile = __DIR__ . '/.setup_complete';
if (file_exists($lockFile)) {
    die('<h1>⚠️ Setup Already Complete</h1>
         <p>The database has already been initialized.</p>
         <p>If you need to reset, delete the file: <code>backend/.setup_complete</code></p>
         <p><strong>For security, please delete this setup.php file!</strong></p>');
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Cybaem Tech - Database Setup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        .info { 
            background: #e3f2fd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: monospace;
        }
        .credentials {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Cybaem Tech Database Setup</h1>
        
        <?php
        try {
            require_once __DIR__ . '/config/database.php';
            
            $database = new Database();
            $db = $database->getConnection();
            
            echo '<p class="success">✅ Database connection successful!</p>';
            
            // Check if admin_users table exists
            $query = "SHOW TABLES LIKE 'admin_users'";
            $stmt = $db->prepare($query);
            $stmt->execute();
            
            if ($stmt->rowCount() == 0) {
                echo '<p class="error">❌ Table "admin_users" does not exist.</p>';
                echo '<p>Please run the schema.sql file first in phpMyAdmin.</p>';
                exit;
            }
            
            echo '<p class="success">✅ Table "admin_users" exists</p>';
            
            // Check if admin user exists
            $query = "SELECT COUNT(*) FROM admin_users WHERE username = 'admin'";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $count = $stmt->fetchColumn();
            
            if ($count > 0) {
                echo '<div class="info">';
                echo '<p><strong>ℹ️ Admin user already exists!</strong></p>';
                echo '<p>The default admin user is already in the database.</p>';
                echo '</div>';
            } else {
                // Create admin user
                $default_password = password_hash('admin123', PASSWORD_DEFAULT);
                $query = "INSERT INTO admin_users (username, password, email) VALUES ('admin', :password, 'pramod.lohgaonkar@cybaemtech.com')";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':password', $default_password);
                
                if ($stmt->execute()) {
                    echo '<p class="success">✅ Admin user created successfully!</p>';
                } else {
                    echo '<p class="error">❌ Failed to create admin user.</p>';
                    exit;
                }
            }
            
            // Check all required tables
            $tables = ['admin_users', 'blog_posts', 'media_library', 'blog_comments'];
            echo '<h2>Database Tables Status:</h2><ul>';
            
            foreach ($tables as $table) {
                $query = "SHOW TABLES LIKE '$table'";
                $stmt = $db->prepare($query);
                $stmt->execute();
                
                if ($stmt->rowCount() > 0) {
                    // Count records
                    $countQuery = "SELECT COUNT(*) FROM $table";
                    $countStmt = $db->prepare($countQuery);
                    $countStmt->execute();
                    $recordCount = $countStmt->fetchColumn();
                    
                    echo "<li class='success'>✅ Table <strong>$table</strong> exists ($recordCount records)</li>";
                } else {
                    echo "<li class='error'>❌ Table <strong>$table</strong> missing</li>";
                }
            }
            echo '</ul>';
            
            // Display credentials
            echo '<div class="credentials">';
            echo '<h2>🔐 Admin Login Credentials</h2>';
            echo '<p><strong>Username:</strong> <code>admin</code></p>';
            echo '<p><strong>Password:</strong> <code>admin123</code></p>';
            echo '<p><strong>Admin URL:</strong> <a href="https://www.cybaemtech.com/admin">https://www.cybaemtech.com/admin</a></p>';
            echo '</div>';
            
            // Create lock file
            file_put_contents($lockFile, date('Y-m-d H:i:s'));
            
            echo '<div class="warning">';
            echo '<h2>⚠️ Security Warning</h2>';
            echo '<p><strong>IMPORTANT: Delete this file immediately!</strong></p>';
            echo '<p>For security reasons, please delete <code>backend/setup.php</code> from your server.</p>';
            echo '<ol>';
            echo '<li>Go to cPanel File Manager</li>';
            echo '<li>Navigate to <code>backend/</code> folder</li>';
            echo '<li>Delete <code>setup.php</code></li>';
            echo '</ol>';
            echo '<p>After deleting, you can login to your admin panel.</p>';
            echo '</div>';
            
            echo '<h2>✅ Setup Complete!</h2>';
            echo '<p>You can now:</p>';
            echo '<ol>';
            echo '<li>Login to admin panel: <a href="https://www.cybaemtech.com/admin">https://www.cybaemtech.com/admin</a></li>';
            echo '<li>Publish blog posts</li>';
            echo '<li>View them at: <a href="https://www.cybaemtech.com/resources">https://www.cybaemtech.com/resources</a></li>';
            echo '</ol>';
            
        } catch(PDOException $exception) {
            echo '<p class="error">❌ Database Error: ' . htmlspecialchars($exception->getMessage()) . '</p>';
            echo '<p>Please check your .env file configuration:</p>';
            echo '<ul>';
            echo '<li>DB_HOST: Should be 82.25.105.94</li>';
            echo '<li>DB_NAME: Should be cybaemtech_CYB_db</li>';
            echo '<li>DB_USER: Should be cybaemtech_CYB_db</li>';
            echo '<li>DB_PASSWORD: Check your password</li>';
            echo '</ul>';
        }
        ?>
    </div>
</body>
</html>
