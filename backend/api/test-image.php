<?php
// Image accessibility test for public_html/public/uploads structure
$imagePath = $_GET['path'] ?? '';

if (empty($imagePath)) {
    echo json_encode(['error' => 'No image path provided. Use ?path=public/uploads/filename.jpg']);
    exit;
}

// Remove leading slash if present
$imagePath = ltrim($imagePath, '/');

// For cPanel structure: public_html/public/uploads/
// Backend is in public_html/backend/, so we need to go up two levels to reach public_html
$fullPath = dirname(dirname(__DIR__)) . '/' . $imagePath;

header('Content-Type: application/json');

$result = [
    'requested_path' => $imagePath,
    'full_path' => $fullPath,
    'backend_dir' => __DIR__,
    'parent_dir' => dirname(dirname(__DIR__)),
    'file_exists' => file_exists($fullPath),
    'is_readable' => file_exists($fullPath) ? is_readable($fullPath) : false,
    'file_size' => file_exists($fullPath) ? filesize($fullPath) : 0,
    'timestamp' => date('Y-m-d H:i:s'),
    'expected_web_url' => '/' . $imagePath
];

// Check if directory exists
$dirPath = dirname($fullPath);
$result['directory_exists'] = is_dir($dirPath);
$result['directory_path'] = $dirPath;

if (file_exists($fullPath)) {
    $result['file_info'] = [
        'type' => mime_content_type($fullPath),
        'size_mb' => round(filesize($fullPath) / (1024 * 1024), 2)
    ];
} else {
    // List files in the upload directory for debugging
    if (is_dir($dirPath)) {
        $files = array_slice(scandir($dirPath), 2, 10); // Skip . and .., limit to 10 files
        $result['files_in_directory'] = $files;
    }
}

echo json_encode($result, JSON_PRETTY_PRINT);
?>