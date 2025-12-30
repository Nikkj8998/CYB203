<?php
/**
 * Blog HTML Generator and Publisher
 * 
 * This script automatically generates static HTML files for blog posts
 * with all SEO meta tags, and updates the vite.config.ts and .htaccess
 * to serve these files statically.
 * 
 * Called when:
 * 1. A blog post is published/updated in admin
 * 2. SEO settings are saved for a blog
 * 3. Manual regeneration is needed
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

class BlogPublisher {
    private $db;
    private $rootPath;
    private $baseUrl = 'https://www.cybaemtech.com';
    
    public function __construct() {
        try {
            $database = new Database();
            $this->db = $database->getConnection();
            $this->rootPath = dirname(__DIR__, 2); // Project root
            
            // Get base URL from environment or request
            if (!empty($_SERVER['HTTP_HOST'])) {
                $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
                $this->baseUrl = $protocol . '://' . $_SERVER['HTTP_HOST'];
            }
        } catch (Exception $e) {
            $this->error("Failed to initialize database: " . $e->getMessage());
        }
    }
    
    /**
     * Generate HTML for a single blog post
     */
    public function generateBlogHTML($blogId) {
        try {
            // Fetch blog data
            $blog = $this->getBlogData($blogId);
            if (!$blog) {
                return $this->error("Blog post not found with ID: $blogId");
            }
            
            // Generate HTML content
            $html = $this->buildBlogHTML($blog);
            
            // Save to file
            $filename = $blog['slug'] . '.html';
            $filepath = $this->rootPath . '/' . $filename;
            
            if (file_put_contents($filepath, $html) === false) {
                return $this->error("Failed to write file: $filepath");
            }
            
            return [
                'success' => true,
                'message' => "Blog HTML generated successfully",
                'file' => $filename,
                'path' => $filepath,
                'url' => '/blog-post/' . $blog['slug']
            ];
        } catch (Exception $e) {
            return $this->error("Error generating blog HTML: " . $e->getMessage());
        }
    }
    
    /**
     * Generate HTML for all published blogs
     */
    public function generateAllBlogsHTML() {
        try {
            $query = "SELECT id, slug FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC";
            $stmt = $this->db->query($query);
            
            $results = [];
            $errors = [];
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result = $this->generateBlogHTML($row['id']);
                if ($result['success']) {
                    $results[] = $result;
                } else {
                    $errors[] = $result;
                }
            }
            
            // Update configuration files
            $this->updateViteConfig($results);
            $this->updateHtaccess($results);
            
            return [
                'success' => true,
                'message' => "Generated HTML files for " . count($results) . " blog posts",
                'generated' => $results,
                'errors' => $errors,
                'vite_updated' => true,
                'htaccess_updated' => true
            ];
        } catch (Exception $e) {
            return $this->error("Error generating all blogs: " . $e->getMessage());
        }
    }
    
    /**
     * Get blog data from database with all SEO fields
     * JOINs with seo_metatags table to get complete SEO metadata
     */
    private function getBlogData($blogId) {
        try {
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
                WHERE bp.id = :id 
                LIMIT 1";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':id', $blogId, PDO::PARAM_INT);
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }
            return null;
        } catch (Exception $e) {
            error_log("Database error: " . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Build complete HTML file with SEO data
     */
    private function buildBlogHTML($blog) {
        // Read template (index.html)
        $templatePath = $this->rootPath . '/index.html';
        $template = file_get_contents($templatePath);
        
        // Generate meta tags
        $metaTags = $this->generateMetaTags($blog);
        
        // Inject meta tags into template before </head>
        $html = str_replace('</head>', $metaTags . '</head>', $template);
        
        // Also set canonical URL specifically for this blog
        $canonicalUrl = $this->baseUrl . '/blog-post/' . $blog['slug'];
        $canonical = '<link rel="canonical" href="' . htmlspecialchars($canonicalUrl) . '">';
        $html = str_replace(
            '<link rel="canonical"',
            $canonical . "\n  <link rel=\"canonical\" style=\"display:none;",
            $html
        );
        
        return $html;
    }
    
    /**
     * Generate all SEO meta tags from blog data
     */
    private function generateMetaTags($blog) {
        $metaTags = "\n  <!-- BLOG POST SEO META TAGS - Auto-generated -->\n";
        
        // Helper function
        $escape = fn($text) => htmlspecialchars($text ?? '', ENT_QUOTES, 'UTF-8');
        $url = $this->baseUrl . '/blog-post/' . $blog['slug'];
        
        // 1. Basic SEO Tags
        $title = !empty($blog['meta_title']) ? $blog['meta_title'] : ($blog['title'] . ' | Cybaem Tech');
        $description = !empty($blog['meta_description']) ? $blog['meta_description'] : $blog['excerpt'];
        $keywords = $blog['meta_keywords'] ?? $blog['tags'] ?? '';
        $author = $blog['meta_author'] ?? $blog['author'] ?? 'Cybaem Tech';
        $robots = $blog['robots'] ?? 'index, follow';
        
        $metaTags .= "  <title>" . $escape($title) . "</title>\n";
        $metaTags .= "  <meta name=\"description\" content=\"" . $escape($description) . "\">\n";
        
        if ($keywords) {
            $metaTags .= "  <meta name=\"keywords\" content=\"" . $escape($keywords) . "\">\n";
        }
        
        $metaTags .= "  <meta name=\"author\" content=\"" . $escape($author) . "\">\n";
        $metaTags .= "  <meta name=\"robots\" content=\"" . $escape($robots) . "\">\n";
        
        // 2. Canonical and Alternate Links
        $canonical = $blog['canonical_url'] ?? $url;
        $metaTags .= "  <link rel=\"canonical\" href=\"" . $escape($canonical) . "\">\n";
        $metaTags .= "  <link rel=\"alternate\" hrefLang=\"en\" href=\"" . $escape($canonical) . "\">\n";
        
        if (!empty($blog['alternate_hreflang_en'])) {
            $metaTags .= "  <link rel=\"alternate\" hrefLang=\"en\" href=\"" . $escape($blog['alternate_hreflang_en']) . "\">\n";
        }
        if (!empty($blog['alternate_hreflang_default'])) {
            $metaTags .= "  <link rel=\"alternate\" hrefLang=\"x-default\" href=\"" . $escape($blog['alternate_hreflang_default']) . "\">\n";
        }
        
        // 3. Open Graph Tags
        $ogTitle = $blog['og_title'] ?? $title;
        $ogDescription = $blog['og_description'] ?? $description;
        $ogImage = $blog['og_image'] ?? $blog['featured_image'] ?? '';
        $ogType = $blog['og_type'] ?? 'article';
        $ogSiteName = $blog['og_site_name'] ?? 'Cybaem Tech';
        
        // Normalize image URL - ensure absolute URL
        if (empty($ogImage)) {
            $ogImage = $this->baseUrl . '/public/uploads/default-image.jpg';
        } elseif (strpos($ogImage, 'http') !== 0) {
            $ogImage = rtrim($this->baseUrl, '/') . '/' . ltrim($ogImage, '/');
        }
        
        $metaTags .= "  <meta property=\"og:type\" content=\"" . $escape($ogType) . "\">\n";
        $metaTags .= "  <meta property=\"og:url\" content=\"" . $escape($url) . "\">\n";
        $metaTags .= "  <meta property=\"og:title\" content=\"" . $escape($ogTitle) . "\">\n";
        $metaTags .= "  <meta property=\"og:description\" content=\"" . $escape($ogDescription) . "\">\n";
        $metaTags .= "  <meta property=\"og:image\" content=\"" . $escape($ogImage) . "\">\n";
        $metaTags .= "  <meta property=\"og:site_name\" content=\"" . $escape($ogSiteName) . "\">\n";
        
        // Article meta
        $metaTags .= "  <meta property=\"article:published_time\" content=\"" . $escape($blog['created_at']) . "\">\n";
        if (!empty($blog['updated_at'])) {
            $metaTags .= "  <meta property=\"article:modified_time\" content=\"" . $escape($blog['updated_at']) . "\">\n";
        }
        $metaTags .= "  <meta property=\"article:author\" content=\"" . $escape($author) . "\">\n";
        
        // Article tags
        if (!empty($blog['tags'])) {
            $tags = array_filter(array_map('trim', explode(',', $blog['tags'])));
            foreach ($tags as $tag) {
                $metaTags .= "  <meta property=\"article:tag\" content=\"" . $escape($tag) . "\">\n";
            }
        }
        
        // 4. Twitter Card Tags
        $twitterCard = $blog['twitter_card_type'] ?? 'summary_large_image';
        $twitterTitle = $blog['twitter_title'] ?? $ogTitle;
        $twitterDescription = $blog['twitter_description'] ?? $ogDescription;
        $twitterImage = $blog['twitter_image'] ?? '';
        
        // Normalize Twitter image URL
        if (empty($twitterImage)) {
            $twitterImage = $ogImage;
        } elseif (strpos($twitterImage, 'http') !== 0) {
            $twitterImage = rtrim($this->baseUrl, '/') . '/' . ltrim($twitterImage, '/');
        }
        
        $metaTags .= "  <meta name=\"twitter:card\" content=\"" . $escape($twitterCard) . "\">\n";
        $metaTags .= "  <meta name=\"twitter:url\" content=\"" . $escape($url) . "\">\n";
        $metaTags .= "  <meta name=\"twitter:title\" content=\"" . $escape($twitterTitle) . "\">\n";
        $metaTags .= "  <meta name=\"twitter:description\" content=\"" . $escape($twitterDescription) . "\">\n";
        $metaTags .= "  <meta name=\"twitter:image\" content=\"" . $escape($twitterImage) . "\">\n";
        
        // 5. Geo Tags
        $geoRegion = $blog['geo_region'] ?? 'IN-MH';
        $geoPlacename = $blog['geo_placename'] ?? 'Pune';
        $geoPosition = $blog['geo_position'] ?? '18.5204;73.8567';
        $geoIcbm = $blog['geo_icbm'] ?? '18.5204, 73.8567';
        
        $metaTags .= "  <meta name=\"geo.region\" content=\"" . $escape($geoRegion) . "\">\n";
        $metaTags .= "  <meta name=\"geo.placename\" content=\"" . $escape($geoPlacename) . "\">\n";
        $metaTags .= "  <meta name=\"geo.position\" content=\"" . $escape($geoPosition) . "\">\n";
        $metaTags .= "  <meta name=\"ICBM\" content=\"" . $escape($geoIcbm) . "\">\n";
        
        // 6. Google Analytics
        if (!empty($blog['google_analytics_id1'])) {
            $metaTags .= "  <script async src=\"https://www.googletagmanager.com/gtag/js?id=" . $escape($blog['google_analytics_id1']) . "\"></script>\n";
            $metaTags .= "  <script>\n";
            $metaTags .= "    window.dataLayer = window.dataLayer || [];\n";
            $metaTags .= "    function gtag(){dataLayer.push(arguments);}\n";
            $metaTags .= "    gtag('js', new Date());\n";
            $metaTags .= "    gtag('config', '" . $escape($blog['google_analytics_id1']) . "');\n";
            $metaTags .= "  </script>\n";
        }
        
        // 7. Schema Markup
        $schemas = $this->generateSchemas($blog, $url);
        foreach ($schemas as $schema) {
            $metaTags .= "  <script type=\"application/ld+json\">\n";
            $metaTags .= "  " . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
            $metaTags .= "  </script>\n";
        }
        
        return $metaTags;
    }
    
    /**
     * Generate schema markup (Article, Breadcrumb, etc.)
     */
    private function generateSchemas($blog, $url) {
        $schemas = [];
        
        // Article Schema
        if (!empty($blog['schema_article'])) {
            try {
                $schemas[] = json_decode($blog['schema_article'], true);
            } catch (Exception $e) {
                $schemas[] = $this->defaultArticleSchema($blog, $url);
            }
        } else {
            $schemas[] = $this->defaultArticleSchema($blog, $url);
        }
        
        // Breadcrumb Schema
        if (!empty($blog['schema_breadcrumb'])) {
            try {
                $schemas[] = json_decode($blog['schema_breadcrumb'], true);
            } catch (Exception $e) {
                $schemas[] = $this->defaultBreadcrumbSchema($blog, $url);
            }
        } else {
            $schemas[] = $this->defaultBreadcrumbSchema($blog, $url);
        }
        
        // Custom schemas if present
        foreach (['schema_organization', 'schema_website', 'schema_faq'] as $field) {
            if (!empty($blog[$field])) {
                try {
                    $schemas[] = json_decode($blog[$field], true);
                } catch (Exception $e) {}
            }
        }
        
        return $schemas;
    }
    
    private function defaultArticleSchema($blog, $url) {
        $image = $blog['og_image'] ?? $blog['featured_image'] ?? '';
        
        // Normalize image URL
        if (empty($image)) {
            $image = $this->baseUrl . '/public/uploads/default-image.jpg';
        } elseif (strpos($image, 'http') !== 0) {
            $image = rtrim($this->baseUrl, '/') . '/' . ltrim($image, '/');
        }
        
        return [
            "@context" => "https://schema.org",
            "@type" => "Article",
            "headline" => $blog['title'] ?? '',
            "description" => $blog['excerpt'] ?? '',
            "image" => $image,
            "author" => [
                "@type" => "Person",
                "name" => $blog['author'] ?? 'Cybaem Tech',
                "jobTitle" => $blog['author_title'] ?? ''
            ],
            "publisher" => [
                "@type" => "Organization",
                "name" => "Cybaem Tech",
                "logo" => [
                    "@type" => "ImageObject",
                    "url" => $this->baseUrl . '/uploads/77cb2418-56bd-44ad-8bfd-3651e3cdb2c0.png'
                ]
            ],
            "datePublished" => $blog['created_at'] ?? date('Y-m-d'),
            "dateModified" => $blog['updated_at'] ?? $blog['created_at'] ?? date('Y-m-d'),
            "mainEntityOfPage" => [
                "@type" => "WebPage",
                "@id" => $url
            ],
            "keywords" => $blog['tags'] ?? ''
        ];
    }
    
    private function defaultBreadcrumbSchema($blog, $url) {
        return [
            "@context" => "https://schema.org",
            "@type" => "BreadcrumbList",
            "itemListElement" => [
                [
                    "@type" => "ListItem",
                    "position" => 1,
                    "name" => "Home",
                    "item" => $this->baseUrl
                ],
                [
                    "@type" => "ListItem",
                    "position" => 2,
                    "name" => "Resources",
                    "item" => $this->baseUrl . "/resources"
                ],
                [
                    "@type" => "ListItem",
                    "position" => 3,
                    "name" => $blog['title'] ?? 'Blog',
                    "item" => $url
                ]
            ]
        ];
    }
    
    /**
     * Update vite.config.ts with new blog routes
     */
    private function updateViteConfig($blogResults) {
        try {
            $viteConfigPath = $this->rootPath . '/vite.config.ts';
            if (!file_exists($viteConfigPath)) {
                return false;
            }
            
            // Read existing config
            $configContent = file_get_contents($viteConfigPath);
            
            // Build blog route map
            $blogRoutes = "            // Blog posts - Auto-generated routes\n";
            foreach ($blogResults as $blog) {
                if (isset($blog['file'])) {
                    $slug = pathinfo($blog['file'], PATHINFO_FILENAME);
                    $blogRoutes .= "            '/blog-post/" . $slug . "': '/" . $blog['file'] . "',\n";
                }
            }
            
            // Find and replace the routeMap section
            // Look for the pattern and replace just the blog comment and entries
            $pattern = '/(\s*\/\/ Blog posts[^\n]*\n(?:\s*\'\/blog-post\/[^\']+\':[^\n]*\n)*)(?=\s*\/\/|        \};)/';
            
            if (preg_match($pattern, $configContent)) {
                $newContent = preg_replace($pattern, $blogRoutes, $configContent);
            } else {
                // If pattern not found, insert before closing of routeMap
                $newContent = str_replace(
                    "          };\n\n          if (routeMap[pathname]) {",
                    $blogRoutes . "          };\n\n          if (routeMap[pathname]) {",
                    $configContent
                );
            }
            
            file_put_contents($viteConfigPath, $newContent);
            return true;
        } catch (Exception $e) {
            error_log("Error updating vite.config.ts: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Update .htaccess with blog post rewrite rules
     */
    private function updateHtaccess($blogResults) {
        try {
            $htaccessPath = $this->rootPath . '/.htaccess';
            if (!file_exists($htaccessPath)) {
                return false;
            }
            
            $content = file_get_contents($htaccessPath);
            
            // Build rewrite rules for each blog
            $rules = "    # Blog posts - Auto-generated static files\n";
            foreach ($blogResults as $blog) {
                if (isset($blog['file'])) {
                    $file = $blog['file'];
                    $slug = pathinfo($file, PATHINFO_FILENAME);
                    $rules .= "    RewriteRule ^blog-post/" . preg_quote($slug) . "/?$ " . $file . " [L]\n";
                }
            }
            
            // Remove old auto-generated blog rules
            $content = preg_replace(
                '/\s*# Blog posts - Auto-generated static files\s+(?:RewriteRule \^blog-post\/[^\n]+\n)*/m',
                '',
                $content
            );
            
            // Add new rules after API rules
            $content = str_replace(
                '    RewriteRule ^api/(.*)$ api/$1 [L]',
                "    RewriteRule ^api/(.*)\$ api/\$1 [L]\n\n" . $rules,
                $content
            );
            
            file_put_contents($htaccessPath, $content);
            return true;
        } catch (Exception $e) {
            error_log("Error updating .htaccess: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Delete blog HTML file and update config
     */
    public function deleteBlogHTML($blogId) {
        try {
            $blog = $this->getBlogData($blogId);
            if (!$blog) {
                return $this->error("Blog not found");
            }
            
            $filename = $blog['slug'] . '.html';
            $filepath = $this->rootPath . '/' . $filename;
            
            if (file_exists($filepath)) {
                unlink($filepath);
            }
            
            // Regenerate all config files
            $this->generateAllBlogsHTML();
            
            return [
                'success' => true,
                'message' => "Blog HTML file deleted and config updated"
            ];
        } catch (Exception $e) {
            return $this->error("Error deleting blog HTML: " . $e->getMessage());
        }
    }
    
    private function error($message) {
        return [
            'success' => false,
            'error' => $message
        ];
    }
}

// API Handler
$action = $_GET['action'] ?? $_POST['action'] ?? '';
$publisher = new BlogPublisher();

switch ($action) {
    case 'generate-blog':
        $blogId = $_POST['blog_id'] ?? $_GET['blog_id'] ?? null;
        if (!$blogId) {
            echo json_encode($publisher->error("blog_id is required"));
        } else {
            echo json_encode($publisher->generateBlogHTML($blogId));
        }
        break;
        
    case 'generate-all':
        echo json_encode($publisher->generateAllBlogsHTML());
        break;
        
    case 'delete-blog':
        $blogId = $_POST['blog_id'] ?? $_GET['blog_id'] ?? null;
        if (!$blogId) {
            echo json_encode($publisher->error("blog_id is required"));
        } else {
            echo json_encode($publisher->deleteBlogHTML($blogId));
        }
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'error' => 'Invalid action. Use: generate-blog, generate-all, or delete-blog'
        ]);
}
?>