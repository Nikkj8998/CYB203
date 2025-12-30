<?php
/**
 * Manual Sitemap Generator Endpoint
 * 
 * URL: /server/generate-sitemap.php
 * 
 * This endpoint regenerates the sitemap.xml file instantly.
 * Can be called manually or via admin panel.
 * 
 * Returns JSON response with generation status.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/SitemapGenerator.php';

try {
    $generator = new SitemapGenerator();
    $result = $generator->generate();

    if ($result['success']) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Sitemap regenerated successfully!',
            'data' => [
                'blogs_count' => $result['blogs_count'],
                'static_pages_count' => $result['static_pages_count'],
                'total_urls' => $result['total_urls'],
                'generated_at' => $result['generated_at']
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => $result['message']
        ]);
    }
} catch (Exception $e) {
    error_log("generate-sitemap.php - Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error generating sitemap: ' . $e->getMessage()
    ]);
}
