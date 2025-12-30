<?php
/**
 * Blog Regeneration Helper
 * 
 * Quick endpoints for admin actions:
 * - POST ?action=regenerate-all: Regenerates all published blogs
 * - GET ?action=list: Lists all generated blog files
 * - POST ?action=clear: Deletes all generated blog HTML files
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
header('Content-Type: application/json');

require_once __DIR__ . '/../api/blog-publisher.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$publisher = new BlogPublisher();

switch ($action) {
    case 'regenerate-all':
        // Regenerate all published blogs
        echo json_encode($publisher->generateAllBlogsHTML());
        break;
        
    case 'list':
        // List all generated blog HTML files
        $rootPath = dirname(__DIR__, 2);
        $files = glob($rootPath . '/*.html');
        $blogFiles = [];
        
        foreach ($files as $file) {
            $filename = basename($file);
            // Exclude index.html and other system files
            if ($filename !== 'index.html' && !in_array($filename, ['about.html', 'contact.html', 'Careers.html'])) {
                $blogFiles[] = [
                    'file' => $filename,
                    'slug' => pathinfo($filename, PATHINFO_FILENAME),
                    'size' => filesize($file),
                    'modified' => date('Y-m-d H:i:s', filemtime($file))
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'total' => count($blogFiles),
            'files' => $blogFiles
        ]);
        break;
        
    case 'clear':
        // Delete all generated blog HTML files (use with caution!)
        $rootPath = dirname(__DIR__, 2);
        $files = glob($rootPath . '/*.html');
        $deleted = 0;
        $errors = [];
        
        foreach ($files as $file) {
            $filename = basename($file);
            // Only delete blog-generated files (not system HTML files)
            if ($filename !== 'index.html' && !in_array($filename, ['about.html', 'contact.html', 'Careers.html'])) {
                if (@unlink($file)) {
                    $deleted++;
                } else {
                    $errors[] = $filename;
                }
            }
        }
        
        echo json_encode([
            'success' => true,
            'message' => "Deleted $deleted blog HTML files",
            'deleted' => $deleted,
            'errors' => $errors
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'error' => 'Invalid action. Available: regenerate-all, list, clear'
        ]);
}
?>
