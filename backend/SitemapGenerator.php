<?php
/**
 * SitemapGenerator - Automatically generates sitemap.xml with all published blog posts
 * 
 * Features:
 * - Fetches all blogs where status='published' AND include_in_sitemap=1
 * - Orders newest first
 * - Generates proper XML sitemap format
 * - Auto-saves to root sitemap.xml
 * 
 * Usage:
 * $generator = new SitemapGenerator();
 * $result = $generator->generate();
 */

require_once __DIR__ . '/config/database.php';

class SitemapGenerator
{
    private $baseUrl = 'https://www.cybaemtech.com';
    private $sitemapPath;
    private $pdo;

    public function __construct()
    {
        $this->sitemapPath = dirname(__DIR__) . '/sitemap.xml';
        $database = new Database();
        $this->pdo = $database->getConnection();
    }

    /**
     * Fetch all published blogs with sitemap inclusion enabled
     * Ordered by newest first
     */
    public function fetchSitemapBlogs()
    {
        try {
            $query = "SELECT 
                        id,
                        slug,
                        title,
                        updated_at,
                        created_at
                      FROM blog_posts 
                      WHERE status = 'published' 
                        AND include_in_sitemap = 1
                      ORDER BY created_at DESC";

            $stmt = $this->pdo->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("SitemapGenerator - Error fetching blogs: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Get static pages configuration
     */
    private function getStaticPages()
    {
        $today = date('Y-m-d');
        return [
            ['loc' => '/', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['loc' => '/about', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => '/leadership', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => '/awards', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => '/careers', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => '/life-at-cybaemtech', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => '/industries', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => '/managed-services', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/cloud-solutions', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/cybersecurity-services', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/enterprise-solutions', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/digital-marketing', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/ai-data-analytics', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/computer-amc-services', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.9'],
            ['loc' => '/contact', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.9'],
            ['loc' => '/it-augmentation', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => '/onsite-it-engineer', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => '/resources', 'lastmod' => $today, 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => '/privacy-policy', 'lastmod' => $today, 'changefreq' => 'monthly', 'priority' => '0.5']
        ];
    }

    /**
     * Generate a single URL entry for sitemap
     */
    private function generateUrlEntry($loc, $lastmod, $changefreq, $priority)
    {
        $xml = "  <url>\n";
        $xml .= "    <loc>" . htmlspecialchars($loc) . "</loc>\n";
        $xml .= "    <lastmod>" . htmlspecialchars($lastmod) . "</lastmod>\n";
        $xml .= "    <changefreq>" . htmlspecialchars($changefreq) . "</changefreq>\n";
        $xml .= "    <priority>" . htmlspecialchars($priority) . "</priority>\n";
        $xml .= "  </url>\n";
        return $xml;
    }

    /**
     * Generate the complete sitemap XML content
     */
    public function generateXml()
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($this->getStaticPages() as $page) {
            $xml .= $this->generateUrlEntry(
                $this->baseUrl . $page['loc'],
                $page['lastmod'],
                $page['changefreq'],
                $page['priority']
            );
        }

        $blogs = $this->fetchSitemapBlogs();
        foreach ($blogs as $post) {
            $lastmod = !empty($post['updated_at']) ? $post['updated_at'] : $post['created_at'];
            $lastmodDate = date('Y-m-d', strtotime($lastmod));

            $blogUrl = $this->baseUrl . '/blog-post/' . $post['slug'];

            $xml .= $this->generateUrlEntry(
                $blogUrl,
                $lastmodDate,
                'weekly',
                '0.8'
            );
        }

        $xml .= '</urlset>';

        return $xml;
    }

    /**
     * Save sitemap XML to file
     */
    public function saveToFile($xml = null)
    {
        if ($xml === null) {
            $xml = $this->generateXml();
        }

        $result = file_put_contents($this->sitemapPath, $xml);

        if ($result === false) {
            error_log("SitemapGenerator - Failed to write sitemap to: " . $this->sitemapPath);
            return false;
        }

        error_log("SitemapGenerator - Sitemap saved successfully to: " . $this->sitemapPath);
        return true;
    }

    /**
     * Main generate function - creates and saves sitemap
     * Returns array with status and details
     */
    public function generate()
    {
        try {
            $blogs = $this->fetchSitemapBlogs();
            $blogCount = count($blogs);

            $xml = $this->generateXml();

            $saved = $this->saveToFile($xml);

            if (!$saved) {
                return [
                    'success' => false,
                    'message' => 'Failed to save sitemap file',
                    'blogs_count' => $blogCount
                ];
            }

            return [
                'success' => true,
                'message' => 'Sitemap generated successfully',
                'blogs_count' => $blogCount,
                'static_pages_count' => count($this->getStaticPages()),
                'total_urls' => $blogCount + count($this->getStaticPages()),
                'sitemap_path' => $this->sitemapPath,
                'generated_at' => date('Y-m-d H:i:s')
            ];
        } catch (Exception $e) {
            error_log("SitemapGenerator - Error: " . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error generating sitemap: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Static helper to quickly regenerate sitemap
     * Can be called from other scripts
     */
    public static function regenerate()
    {
        $generator = new self();
        return $generator->generate();
    }
}
