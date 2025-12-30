<?php
// Session configuration for cross-origin requests
// Detect if HTTPS is being used
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || 
           (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');

// Use SameSite=Lax for local development (more compatible with browsers)
// Use SameSite=None with Secure flag only when HTTPS is available
if ($isHttps) {
    ini_set('session.cookie_samesite', 'None');
    ini_set('session.cookie_secure', '1');
} else {
    ini_set('session.cookie_samesite', 'Lax');
    ini_set('session.cookie_secure', '0');
}

ini_set('session.cookie_httponly', '1');
ini_set('session.use_strict_mode', '1');
ini_set('session.cookie_lifetime', '86400');

// CORS headers with strict origin checking
$allowedOrigins = [
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://0.0.0.0:5000'
];

// Add production frontend URL from environment
if (getenv('FRONTEND_URL')) {
    $allowedOrigins[] = getenv('FRONTEND_URL');
}

// Add Replit domains if available
if (getenv('REPLIT_DOMAINS')) {
    $replitDomains = explode(',', getenv('REPLIT_DOMAINS'));
    foreach ($replitDomains as $domain) {
        $allowedOrigins[] = 'https://' . trim($domain);
    }
}

// Get current domain from SERVER_NAME (for cPanel deployment)
if (isset($_SERVER['SERVER_NAME'])) {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $currentDomain = $protocol . '://' . $_SERVER['SERVER_NAME'];
    $allowedOrigins[] = $currentDomain;
}

// Check origin and allow if in whitelist or matches replit.dev pattern
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$originClean = rtrim($origin, '/');

// Extract base origin (protocol + host + port) in case full URL is passed
$parsedOrigin = parse_url($originClean);
if ($parsedOrigin && isset($parsedOrigin['scheme']) && isset($parsedOrigin['host'])) {
    $baseOrigin = $parsedOrigin['scheme'] . '://' . $parsedOrigin['host'];
    if (isset($parsedOrigin['port'])) {
        $baseOrigin .= ':' . $parsedOrigin['port'];
    }
} else {
    $baseOrigin = $originClean;
}

$isReplitDev = preg_match('/^https:\/\/.*\.replit\.dev/', $baseOrigin);
$isLocalhost = preg_match('/^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?/', $baseOrigin);

// Allow empty origin for proxied requests (Vite dev server proxy) and same-origin requests
$isEmptyOrigin = empty($origin) || empty($baseOrigin);

if (in_array($origin, $allowedOrigins) || in_array($originClean, $allowedOrigins) || in_array($baseOrigin, $allowedOrigins) || $isReplitDev || $isLocalhost || $isEmptyOrigin) {
    // For empty origins (proxied/same-origin requests), allow all
    if ($isEmptyOrigin) {
        header("Access-Control-Allow-Origin: *");
    } else {
        header("Access-Control-Allow-Origin: " . ($origin ?: $baseOrigin));
        header("Access-Control-Allow-Credentials: true");
    }
} else {
    // For development, log the origin but don't allow it
    error_log("Blocked CORS request from origin: $origin (base: $baseOrigin)");
}
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Cache-Control");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
