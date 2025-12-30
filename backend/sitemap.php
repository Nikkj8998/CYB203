<?php
/**
 * Dynamic Sitemap Generator
 * Generates sitemap.xml including all published blog posts with sitemap inclusion enabled
 * 
 * This file can be accessed directly to output XML sitemap
 * OR use SitemapGenerator class for file-based generation
 */

header('Content-Type: application/xml; charset=utf-8');

require_once __DIR__ . '/SitemapGenerator.php';

try {
    $generator = new SitemapGenerator();
    echo $generator->generateXml();
} catch (Exception $e) {
    error_log("Error generating sitemap: " . $e->getMessage());
    header("HTTP/1.1 500 Internal Server Error");
    echo "Error generating sitemap";
}
