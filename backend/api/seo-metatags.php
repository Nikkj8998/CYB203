<?php
// SEO Meta Tags API
// Handles CRUD operations for SEO metadata

error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json');

try {
    require_once __DIR__ . '/cors.php';
    require_once __DIR__ . '/../config/database.php';

    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception('Database connection failed');
    }

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET') {
        // Get SEO metadata for a specific blog post
        if (isset($_GET['blog_id'])) {
            $query = "SELECT * FROM seo_metatags WHERE blog_post_id = :blog_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':blog_id', $_GET['blog_id']);
            $stmt->execute();
            
            $seoData = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($seoData) {
                echo json_encode(['success' => true, 'data' => $seoData]);
            } else {
                // Return empty SEO data structure with defaults
                echo json_encode([
                    'success' => true,
                    'data' => [
                        'blog_post_id' => $_GET['blog_id'],
                        'robots' => 'index, follow',
                        'geo_region' => 'IN-MH',
                        'geo_placename' => 'Pune',
                        'geo_position' => '18.5204;73.8567',
                        'geo_icbm' => '18.5204, 73.8567',
                        'og_type' => 'article',
                        'og_site_name' => 'Cybaem Tech',
                        'twitter_card_type' => 'summary_large_image'
                    ]
                ]);
            }
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'blog_id parameter required']);
        }
    } elseif ($method === 'POST') {
        // Create or update SEO metadata
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['blog_post_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'blog_post_id is required']);
            exit;
        }

        // Check if SEO record exists
        $checkQuery = "SELECT id FROM seo_metatags WHERE blog_post_id = :blog_id";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':blog_id', $data['blog_post_id']);
        $checkStmt->execute();
        $exists = $checkStmt->fetch();

        if ($exists) {
            // Update existing record
            $query = "UPDATE seo_metatags SET
                meta_title = :meta_title,
                meta_description = :meta_description,
                meta_keywords = :meta_keywords,
                meta_author = :meta_author,
                robots = :robots,
                geo_region = :geo_region,
                geo_placename = :geo_placename,
                geo_position = :geo_position,
                geo_icbm = :geo_icbm,
                og_type = :og_type,
                og_url = :og_url,
                og_title = :og_title,
                og_description = :og_description,
                og_image = :og_image,
                og_site_name = :og_site_name,
                twitter_card_type = :twitter_card_type,
                twitter_url = :twitter_url,
                twitter_title = :twitter_title,
                twitter_description = :twitter_description,
                twitter_image = :twitter_image,
                canonical_url = :canonical_url,
                alternate_hreflang_en = :alternate_hreflang_en,
                alternate_hreflang_default = :alternate_hreflang_default,
                schema_organization = :schema_organization,
                schema_website = :schema_website,
                schema_breadcrumb = :schema_breadcrumb,
                schema_article = :schema_article,
                schema_faq = :schema_faq,
                google_analytics_id1 = :google_analytics_id1,
                google_analytics_id2 = :google_analytics_id2,
                updated_at = CURRENT_TIMESTAMP
                WHERE blog_post_id = :blog_post_id";
        } else {
            // Insert new record
            $query = "INSERT INTO seo_metatags (
                blog_post_id, meta_title, meta_description, meta_keywords, meta_author, robots,
                geo_region, geo_placename, geo_position, geo_icbm,
                og_type, og_url, og_title, og_description, og_image, og_site_name,
                twitter_card_type, twitter_url, twitter_title, twitter_description, twitter_image,
                canonical_url, alternate_hreflang_en, alternate_hreflang_default,
                schema_organization, schema_website, schema_breadcrumb, schema_article, schema_faq,
                google_analytics_id1, google_analytics_id2
            ) VALUES (
                :blog_post_id, :meta_title, :meta_description, :meta_keywords, :meta_author, :robots,
                :geo_region, :geo_placename, :geo_position, :geo_icbm,
                :og_type, :og_url, :og_title, :og_description, :og_image, :og_site_name,
                :twitter_card_type, :twitter_url, :twitter_title, :twitter_description, :twitter_image,
                :canonical_url, :alternate_hreflang_en, :alternate_hreflang_default,
                :schema_organization, :schema_website, :schema_breadcrumb, :schema_article, :schema_faq,
                :google_analytics_id1, :google_analytics_id2
            )";
        }

        $stmt = $db->prepare($query);
        
        // Bind all parameters
        $stmt->bindParam(':blog_post_id', $data['blog_post_id']);
        $stmt->bindParam(':meta_title', $data['meta_title']);
        $stmt->bindParam(':meta_description', $data['meta_description']);
        $stmt->bindParam(':meta_keywords', $data['meta_keywords']);
        $stmt->bindParam(':meta_author', $data['meta_author']);
        $stmt->bindParam(':robots', $data['robots']);
        $stmt->bindParam(':geo_region', $data['geo_region']);
        $stmt->bindParam(':geo_placename', $data['geo_placename']);
        $stmt->bindParam(':geo_position', $data['geo_position']);
        $stmt->bindParam(':geo_icbm', $data['geo_icbm']);
        $stmt->bindParam(':og_type', $data['og_type']);
        $stmt->bindParam(':og_url', $data['og_url']);
        $stmt->bindParam(':og_title', $data['og_title']);
        $stmt->bindParam(':og_description', $data['og_description']);
        $stmt->bindParam(':og_image', $data['og_image']);
        $stmt->bindParam(':og_site_name', $data['og_site_name']);
        $stmt->bindParam(':twitter_card_type', $data['twitter_card_type']);
        $stmt->bindParam(':twitter_url', $data['twitter_url']);
        $stmt->bindParam(':twitter_title', $data['twitter_title']);
        $stmt->bindParam(':twitter_description', $data['twitter_description']);
        $stmt->bindParam(':twitter_image', $data['twitter_image']);
        $stmt->bindParam(':canonical_url', $data['canonical_url']);
        $stmt->bindParam(':alternate_hreflang_en', $data['alternate_hreflang_en']);
        $stmt->bindParam(':alternate_hreflang_default', $data['alternate_hreflang_default']);
        $stmt->bindParam(':schema_organization', $data['schema_organization']);
        $stmt->bindParam(':schema_website', $data['schema_website']);
        $stmt->bindParam(':schema_breadcrumb', $data['schema_breadcrumb']);
        $stmt->bindParam(':schema_article', $data['schema_article']);
        $stmt->bindParam(':schema_faq', $data['schema_faq']);
        $stmt->bindParam(':google_analytics_id1', $data['google_analytics_id1']);
        $stmt->bindParam(':google_analytics_id2', $data['google_analytics_id2']);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => $exists ? 'SEO metadata updated successfully' : 'SEO metadata created successfully',
                'data' => ['id' => $exists ? $exists['id'] : $db->lastInsertId()]
            ]);
        } else {
            throw new Exception('Failed to save SEO metadata');
        }
    } elseif ($method === 'DELETE') {
        // Delete SEO metadata
        if (isset($_GET['blog_id'])) {
            $query = "DELETE FROM seo_metatags WHERE blog_post_id = :blog_id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':blog_id', $_GET['blog_id']);
            
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'SEO metadata deleted successfully']);
            } else {
                throw new Exception('Failed to delete SEO metadata');
            }
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'blog_id parameter required']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    error_log("Database error in seo-metatags.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error',
        'message' => 'Failed to process SEO metadata'
    ]);
} catch (Exception $e) {
    error_log("Error in seo-metatags.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
?>
