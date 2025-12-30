<?php
// PHP Built-in server router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Health check endpoint
if ($uri === '/' || $uri === '/health') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'message' => 'Backend server is running']);
    exit;
}

// Serve static files from uploads directory (both /backend/uploads/ and /public/uploads/)
if (preg_match('/^\/backend\/uploads\//', $uri)) {
    $file = __DIR__ . $uri;
    if (file_exists($file)) {
        $mime = mime_content_type($file);
        header('Content-Type: ' . $mime);
        readfile($file);
        exit;
    }
}

// Serve static files from public/uploads
if (preg_match('/^\/public\/uploads\//', $uri)) {
    $file = __DIR__ . '/..' . $uri;
    if (file_exists($file)) {
        $mime = mime_content_type($file);
        header('Content-Type: ' . $mime);
        readfile($file);
        exit;
    }
}

// Route API requests (handle both /api/ and /backend/api/)
// Restrict to safe PHP filenames only to prevent directory traversal
if (preg_match('#^/backend/api/([A-Za-z0-9_-]+\.php)$#', $uri, $matches)) {
    $file = __DIR__ . '/api/' . $matches[1];
    if (file_exists($file)) {
        include $file;
        exit;
    }
}

if (preg_match('#^/api/([A-Za-z0-9_-]+\.php)$#', $uri, $matches)) {
    $file = __DIR__ . '/api/' . $matches[1];
    if (file_exists($file)) {
        include $file;
        exit;
    }
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
?>
