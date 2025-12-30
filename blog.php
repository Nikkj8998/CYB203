<?php
/**
 * Blog Post SSR Handler - Generates properly formatted HTML with organized sections
 * 
 * This file generates clean, well-structured HTML for blog posts
 * matching the format of static pages like Industries.html
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Extract blog identifier from URL
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($requestUri, PHP_URL_PATH);
$_SERVER['REQUEST_PATH'] = $path;

// Include the middleware to get blog data
$middlewarePath = __DIR__ . '/backend/blog-seo-middleware.php';
if (file_exists($middlewarePath)) {
    @include_once $middlewarePath;
}

// If no blog data found, fall back to index.html
if (!isset($_SERVER['BLOG_DATA']) || empty($_SERVER['BLOG_DATA'])) {
    $indexPath = __DIR__ . '/index.html';
    if (file_exists($indexPath)) {
        header('Content-Type: text/html; charset=utf-8');
        echo file_get_contents($indexPath);
    } else {
        http_response_code(404);
        echo "Page not found";
    }
    exit;
}

// Get blog data from middleware
$blog = $_SERVER['BLOG_DATA'];
$seo = $_SERVER['BLOG_SEO'] ?? [];

// Helper function
function e($text) {
    return htmlspecialchars($text ?? '', ENT_QUOTES, 'UTF-8');
}

// Generate the complete HTML
header('Content-Type: text/html; charset=utf-8');
?>
<!doctype html>
<html lang="en">

<head>
  <!-- Basic Meta -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <link rel="icon" href="/uploads/cicon.ico" sizes="any">

  <!-- ===========================
    SEO TAGS
    =========================== -->
  <title><?= e($seo['title']) ?></title>
  <meta name="description" content="<?= e($seo['description']) ?>" />
  <meta name="keywords" content="<?= e($seo['keywords']) ?>" />
  <meta name="author" content="<?= e($seo['author']) ?>" />
  <meta name="robots" content="<?= e($seo['robots']) ?>" />

  <!-- ===========================
    GEO TAGS (GEO SEO)
    =========================== -->
  <meta name="geo.region" content="<?= e($seo['geoRegion']) ?>" />
  <meta name="geo.placename" content="<?= e($seo['geoPlacename']) ?>" />
  <meta name="geo.position" content="<?= e($seo['geoPosition']) ?>" />
  <meta name="ICBM" content="<?= e($seo['geoIcbm']) ?>" />

  <!-- ===========================
    OPEN GRAPH TAGS (Facebook, LinkedIn, WhatsApp)
    =========================== -->
  <meta property="og:type" content="<?= e($seo['ogType']) ?>">
  <meta property="og:url" content="<?= e($seo['url']) ?>">
  <meta property="og:title" content="<?= e($seo['ogTitle']) ?>">
  <meta property="og:description" content="<?= e($seo['ogDescription']) ?>">
  <meta property="og:image" content="<?= e($seo['ogImage']) ?>">
  <meta property="og:site_name" content="<?= e($seo['ogSiteName']) ?>">
  <meta property="article:published_time" content="<?= e($blog['created_at'] ?? '') ?>">
<?php if (!empty($blog['updated_at'])): ?>
  <meta property="article:modified_time" content="<?= e($blog['updated_at']) ?>">
<?php endif; ?>
  <meta property="article:author" content="<?= e($seo['author']) ?>">

  <!-- ===========================
    TWITTER CARD TAGS
    =========================== -->
  <meta name="twitter:card" content="<?= e($seo['twitterCard']) ?>">
  <meta name="twitter:url" content="<?= e($seo['url']) ?>">
  <meta name="twitter:title" content="<?= e($seo['twitterTitle']) ?>">
  <meta name="twitter:description" content="<?= e($seo['twitterDescription']) ?>">
  <meta name="twitter:image" content="<?= e($seo['twitterImage']) ?>">

  <!-- ===========================
    CANONICAL & ALTERNATE LINKS
    =========================== -->
  <link rel="canonical" href="<?= e($seo['canonical']) ?>">
  <link rel="alternate" hreflang="en" href="<?= e($seo['canonical']) ?>">
  <link rel="alternate" hreflang="x-default" href="<?= e($seo['canonical']) ?>">

  <!-- ===========================
    THEME & ICONS
    =========================== -->
  <meta name="theme-color" content="#1a365d">
  <meta name="msapplication-TileColor" content="#1a365d">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="format-detection" content="telephone=no">

  <!-- ===========================
    PERFORMANCE OPTIMIZATION
    =========================== -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://www.google-analytics.com">
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//www.google-analytics.com">

  <!-- ===========================
    CSS
    =========================== -->
<?php
// Find the CSS file from index.html
$indexContent = file_get_contents(__DIR__ . '/index.html');
if (preg_match('/<link[^>]+href="([^"]+\.css)"[^>]*>/', $indexContent, $cssMatch)) {
    echo '  <link rel="stylesheet" crossorigin href="' . $cssMatch[1] . '">' . "\n";
}
?>

  <!-- ===========================
    SCHEMA MARKUP (Head Section - Critical for SEO)
    =========================== -->

  <!-- BlogPosting Schema -->
  <script type="application/ld+json">
<?= $seo['schemaBlogPosting'] ?>
  </script>

  <!-- Breadcrumb Schema -->
  <script type="application/ld+json">
<?= $seo['schemaBreadcrumb'] ?>
  </script>

<?php if (!empty($seo['schemaOrganization'])): ?>
  <!-- Organization Schema -->
  <script type="application/ld+json">
<?= $seo['schemaOrganization'] ?>
  </script>

<?php endif; ?>
<?php if (!empty($seo['schemaWebsite'])): ?>
  <!-- Website Schema -->
  <script type="application/ld+json">
<?= $seo['schemaWebsite'] ?>
  </script>

<?php endif; ?>
<?php if (!empty($seo['schemaFaq'])): ?>
  <!-- FAQ Schema -->
  <script type="application/ld+json">
<?= $seo['schemaFaq'] ?>
  </script>

<?php endif; ?>

  <!-- ===========================
    GOOGLE ANALYTICS
    =========================== -->
<?php 
$gaId1 = $seo['googleAnalyticsId1'] ?? 'G-NHQ9K2Z6NB';
$gaId2 = $seo['googleAnalyticsId2'] ?? 'G-H9RF346Q2X';
?>
  <script async src="https://www.googletagmanager.com/gtag/js?id=<?= e($gaId1) ?>"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '<?= e($gaId1) ?>', {
      'send_page_view': true,
      'enhanced_measurement': true
    });
    gtag('config', '<?= e($gaId2) ?>', {
      'send_page_view': true,
      'enhanced_measurement': true
    });
  </script>

  <!-- ===========================
    JAVASCRIPT
    =========================== -->
<?php
// Find the JS file from index.html
if (preg_match('/<script[^>]+src="([^"]+\.js)"[^>]*>/', $indexContent, $jsMatch)) {
    echo '  <script type="module" crossorigin src="' . $jsMatch[1] . '"></script>' . "\n";
}
?>

</head>

<body>
  <div id="root"></div>
</body>

</html>
