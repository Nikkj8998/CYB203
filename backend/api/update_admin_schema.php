<?php
/**
 * Database Schema Update Script
 * Adds missing columns to admin_users table for proper authentication
 */

require_once 'db_config.php';

try {
    $db = getDbConnection();
    
    echo "Updating admin_users table schema...\n";
    
    // Check if columns exist and add them if they don't
    $columns_to_add = [
        'role' => "ALTER TABLE admin_users ADD COLUMN role VARCHAR(50) DEFAULT 'user' AFTER email",
        'permissions' => "ALTER TABLE admin_users ADD COLUMN permissions TEXT AFTER role", 
        'status' => "ALTER TABLE admin_users ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER permissions",
        'last_login' => "ALTER TABLE admin_users ADD COLUMN last_login TIMESTAMP NULL AFTER status"
    ];
    
    foreach ($columns_to_add as $column => $sql) {
        try {
            // Check if column exists
            $stmt = $db->prepare("SHOW COLUMNS FROM admin_users LIKE ?");
            $stmt->execute([$column]);
            
            if ($stmt->rowCount() == 0) {
                // Column doesn't exist, add it
                $db->exec($sql);
                echo "✓ Added column: $column\n";
            } else {
                echo "- Column already exists: $column\n";
            }
        } catch (PDOException $e) {
            echo "✗ Error adding column $column: " . $e->getMessage() . "\n";
        }
    }
    
    // Update existing admin users to have proper role and permissions if they don't
    echo "\nUpdating existing admin users...\n";
    
    $default_permissions = json_encode([
        'blogs' => ['create', 'read', 'update', 'delete'],
        'users' => ['create', 'read', 'update', 'delete'], 
        'comments' => ['create', 'read', 'update', 'delete'],
        'media' => ['create', 'read', 'update', 'delete'],
        'settings' => ['read', 'update']
    ]);
    
    $stmt = $db->prepare("
        UPDATE admin_users 
        SET role = CASE WHEN role IS NULL OR role = '' THEN 'super_admin' ELSE role END,
            permissions = CASE WHEN permissions IS NULL OR permissions = '' THEN ? ELSE permissions END,
            status = CASE WHEN status IS NULL OR status = '' THEN 'active' ELSE status END
    ");
    $stmt->execute([$default_permissions]);
    
    echo "✓ Updated " . $stmt->rowCount() . " admin user records\n";
    
    // Show current admin users
    echo "\nCurrent admin users:\n";
    $stmt = $db->query("SELECT id, username, email, role, status, created_at FROM admin_users");
    $users = $stmt->fetchAll();
    
    foreach ($users as $user) {
        echo "- ID: {$user['id']}, Username: {$user['username']}, Email: {$user['email']}, Role: {$user['role']}, Status: {$user['status']}\n";
    }
    
    echo "\nSchema update completed successfully!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>