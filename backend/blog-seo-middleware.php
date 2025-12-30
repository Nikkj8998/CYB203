<?php
/**
 * Blog SEO Middleware - Prepares SEO data for blog.php
 * Returns structured SEO data that blog.php uses to generate formatted HTML
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

try {
    // Get database connection
    $configPath = __DIR__ . '/config/database.php';
    if (!file_exists($configPath)) {
        error_log("Blog SEO: Database config not found at $configPath");
        return;
    }
    
    require_once $configPath;
    
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        error_log("Blog SEO: Database connection failed");
        return;
    }
    
    // Extract blog slug from URL
    $requestUri = $_SERVER['REQUEST_PATH'] ?? $_SERVER['REQUEST_URI'] ?? '/';
    $path = parse_url($requestUri, PHP_URL_PATH);
    $path = rtrim($path, '/');
    
    $slug = null;
    if (preg_match('/\/blog-post\/([a-z0-9-]+)$/i', $path, $matches)) {
        $slug = $matches[1];
    } elseif (preg_match('/\/blog\/([a-z0-9-]+)$/i', $path, $matches)) {
        $slug = $matches[1];
    }
    
    if (!$slug) {
        return;
    }
    
    // Fetch blog data with SEO fields
    $query = "SELECT bp.*, 
               seo.meta_title, seo.meta_description, seo.meta_keywords, seo.meta_author, seo.robots,
               seo.geo_region, seo.geo_placename, seo.geo_position, seo.geo_icbm,
               seo.og_type, seo.og_url, seo.og_title, seo.og_description, seo.og_image, seo.og_site_name,
               seo.twitter_card_type, seo.twitter_url, seo.twitter_title, seo.twitter_description, seo.twitter_image,
               seo.canonical_url, seo.alternate_hreflang_en, seo.alternate_hreflang_default,
               seo.schema_organization, seo.schema_website, seo.schema_breadcrumb, seo.schema_article, seo.schema_faq,
               seo.google_analytics_id1, seo.google_analytics_id2
        FROM blog_posts bp
        LEFT JOIN seo_metatags seo ON bp.id = seo.blog_post_id
        WHERE bp.slug = :slug AND bp.status = 'published' 
        LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':slug', $slug);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        return;
    }
    
    $blogData = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Base URL
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $baseUrl = $protocol . '://' . ($_SERVER['HTTP_HOST'] ?? 'www.cybaemtech.com');
    $postUrl = $baseUrl . '/blog-post/' . $blogData['slug'];
    
    // Prepare SEO values with fallbacks
    $title = !empty($blogData['meta_title']) ? $blogData['meta_title'] : ($blogData['title'] . ' | Cybaem Tech');
    $description = !empty($blogData['meta_description']) ? $blogData['meta_description'] : ($blogData['excerpt'] ?? '');
    $keywords = !empty($blogData['meta_keywords']) ? $blogData['meta_keywords'] : ($blogData['tags'] ?? '');
    $author = !empty($blogData['meta_author']) ? $blogData['meta_author'] : ($blogData['author'] ?? 'Cybaem Tech');
    $robots = !empty($blogData['robots']) ? $blogData['robots'] : 'index, follow';
    
    // Open Graph
    $ogTitle = !empty($blogData['og_title']) ? $blogData['og_title'] : $title;
    $ogDescription = !empty($blogData['og_description']) ? $blogData['og_description'] : $description;
    $ogImage = !empty($blogData['og_image']) ? $blogData['og_image'] : ($blogData['featured_image'] ?? '');
    $ogType = !empty($blogData['og_type']) ? $blogData['og_type'] : 'article';
    $ogSiteName = !empty($blogData['og_site_name']) ? $blogData['og_site_name'] : 'Cybaem Tech';
    
    // Normalize image URLs
    if ($ogImage && strpos($ogImage, 'http') !== 0) {
        $ogImage = rtrim($baseUrl, '/') . '/' . ltrim($ogImage, '/');
    }
    if (!$ogImage) {
        $ogImage = $baseUrl . '/uploads/77cb2418-56bd-44ad-8bfd-3651e3cdb2c0.png';
    }
    
    // Twitter
    $twitterCard = !empty($blogData['twitter_card_type']) ? $blogData['twitter_card_type'] : 'summary_large_image';
    $twitterTitle = !empty($blogData['twitter_title']) ? $blogData['twitter_title'] : $ogTitle;
    $twitterDescription = !empty($blogData['twitter_description']) ? $blogData['twitter_description'] : $ogDescription;
    $twitterImage = !empty($blogData['twitter_image']) ? $blogData['twitter_image'] : $ogImage;
    
    // Normalize Twitter image
    if ($twitterImage && strpos($twitterImage, 'http') !== 0) {
        $twitterImage = rtrim($baseUrl, '/') . '/' . ltrim($twitterImage, '/');
    }
    
    // Geo
    $geoRegion = !empty($blogData['geo_region']) ? $blogData['geo_region'] : 'IN-MH';
    $geoPlacename = !empty($blogData['geo_placename']) ? $blogData['geo_placename'] : 'Pune';
    $geoPosition = !empty($blogData['geo_position']) ? $blogData['geo_position'] : '18.5204;73.8567';
    $geoIcbm = !empty($blogData['geo_icbm']) ? $blogData['geo_icbm'] : '18.5204, 73.8567';
    
    // Canonical
    $canonicalUrl = $postUrl; // Always use actual URL, not database value
    
    // Generate BlogPosting Schema
    if (!empty($blogData['schema_article'])) {
        $schemaBlogPosting = $blogData['schema_article'];
        // Validate it's proper JSON
        if (json_decode($schemaBlogPosting) === null) {
            $schemaBlogPosting = null;
        }
    }
    
    if (empty($schemaBlogPosting)) {
        $blogPostingData = [
            "@context" => "https://schema.org",
            "@type" => "BlogPosting",
            "headline" => $title,
            "description" => $description,
            "image" => $ogImage,
            "url" => $postUrl,
            "datePublished" => $blogData['created_at'] ?? date('Y-m-d'),
            "dateModified" => $blogData['updated_at'] ?? $blogData['created_at'] ?? date('Y-m-d'),
            "author" => [
                "@type" => "Person",
                "name" => $author
            ],
            "publisher" => [
                "@type" => "Organization",
                "name" => "Cybaem Tech",
                "logo" => [
                    "@type" => "ImageObject",
                    "url" => $baseUrl . '/uploads/77cb2418-56bd-44ad-8bfd-3651e3cdb2c0.png'
                ]
            ],
            "mainEntityOfPage" => [
                "@type" => "WebPage",
                "@id" => $postUrl
            ]
        ];
        if ($keywords) {
            $blogPostingData["keywords"] = $keywords;
        }
        $schemaBlogPosting = json_encode($blogPostingData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
    
    // Generate Breadcrumb Schema
    if (!empty($blogData['schema_breadcrumb'])) {
        $schemaBreadcrumb = $blogData['schema_breadcrumb'];
        if (json_decode($schemaBreadcrumb) === null) {
            $schemaBreadcrumb = null;
        }
    }
    
    if (empty($schemaBreadcrumb)) {
        $breadcrumbData = [
            "@context" => "https://schema.org",
            "@type" => "BreadcrumbList",
            "itemListElement" => [
                [
                    "@type" => "ListItem",
                    "position" => 1,
                    "name" => "Home",
                    "item" => $baseUrl . "/"
                ],
                [
                    "@type" => "ListItem",
                    "position" => 2,
                    "name" => "Resources",
                    "item" => $baseUrl . "/resources"
                ],
                [
                    "@type" => "ListItem",
                    "position" => 3,
                    "name" => $blogData['title'] ?? 'Blog',
                    "item" => $postUrl
                ]
            ]
        ];
        $schemaBreadcrumb = json_encode($breadcrumbData, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
    
    // Other schemas from database
    $schemaOrganization = !empty($blogData['schema_organization']) ? $blogData['schema_organization'] : '';
    $schemaWebsite = !empty($blogData['schema_website']) ? $blogData['schema_website'] : '';
    $schemaFaq = !empty($blogData['schema_faq']) ? $blogData['schema_faq'] : '';
    
    // Format JSON schemas with proper indentation
    $formatJson = function($json) {
        $decoded = json_decode($json, true);
        if ($decoded) {
            return '    ' . str_replace("\n", "\n    ", json_encode($decoded, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }
        return $json;
    };
    
    // Store all SEO data for blog.php to use
    $_SERVER['BLOG_DATA'] = $blogData;
    $_SERVER['BLOG_SEO'] = [
        'title' => $title,
        'description' => $description,
        'keywords' => $keywords,
        'author' => $author,
        'robots' => $robots,
        'url' => $postUrl,
        'canonical' => $canonicalUrl,
        
        // Geo
        'geoRegion' => $geoRegion,
        'geoPlacename' => $geoPlacename,
        'geoPosition' => $geoPosition,
        'geoIcbm' => $geoIcbm,
        
        // Open Graph
        'ogType' => $ogType,
        'ogTitle' => $ogTitle,
        'ogDescription' => $ogDescription,
        'ogImage' => $ogImage,
        'ogSiteName' => $ogSiteName,
        
        // Twitter
        'twitterCard' => $twitterCard,
        'twitterTitle' => $twitterTitle,
        'twitterDescription' => $twitterDescription,
        'twitterImage' => $twitterImage,
        
        // Schemas (formatted)
        'schemaBlogPosting' => $formatJson($schemaBlogPosting),
        'schemaBreadcrumb' => $formatJson($schemaBreadcrumb),
        'schemaOrganization' => $schemaOrganization ? $formatJson($schemaOrganization) : '',
        'schemaWebsite' => $schemaWebsite ? $formatJson($schemaWebsite) : '',
        'schemaFaq' => $schemaFaq ? $formatJson($schemaFaq) : '',
        
        // Analytics
        'googleAnalyticsId1' => $blogData['google_analytics_id1'] ?? '',
        'googleAnalyticsId2' => $blogData['google_analytics_id2'] ?? ''
    ];
    
} catch (Exception $e) {
    error_log("Blog SEO Middleware Error: " . $e->getMessage());
}
?>
