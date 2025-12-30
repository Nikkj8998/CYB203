<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../SitemapGenerator.php';
require_once __DIR__ . '/../email_notifications.php';

session_start();

// Check authentication
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"));

// Helper function to generate URL-friendly slugs
function generateSlug($input) {
    // Step 1: Convert camelCase to spaced words (insert space before uppercase letters)
    $slug = preg_replace('/([a-z])([A-Z])/', '$1 $2', $input);
    
    // Step 2: Convert to lowercase
    $slug = strtolower($slug);
    
    // Step 3: Replace spaces, underscores, and multiple whitespace with single hyphen
    $slug = preg_replace('/[\s_]+/', '-', $slug);
    
    // Step 4: Remove special characters (keep only alphanumeric and hyphens)
    $slug = preg_replace('/[^a-z0-9-]/', '', $slug);
    
    // Step 5: Collapse multiple hyphens into single hyphen
    $slug = preg_replace('/-+/', '-', $slug);
    
    // Step 6: Trim leading and trailing hyphens
    $slug = trim($slug, '-');
    
    // Step 7: If slug is empty, return a default value
    if (empty($slug)) {
        $slug = 'post-' . uniqid();
    }
    
    return $slug;
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single blog post with SEO data
            $query = "SELECT p.*, 
                      s.meta_title, s.meta_description, s.meta_keywords, s.meta_author, s.robots,
                      s.geo_region, s.geo_placename, s.geo_position, s.geo_icbm,
                      s.og_type, s.og_url, s.og_title, s.og_description, s.og_image, s.og_site_name,
                      s.twitter_card_type, s.twitter_url, s.twitter_title, s.twitter_description, s.twitter_image,
                      s.canonical_url, s.alternate_hreflang_en, s.alternate_hreflang_default,
                      s.schema_organization, s.schema_website, s.schema_breadcrumb, s.schema_article, s.schema_faq,
                      s.google_analytics_id1, s.google_analytics_id2
                      FROM blog_posts p 
                      LEFT JOIN seo_metatags s ON p.id = s.blog_post_id 
                      WHERE p.id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $_GET['id']);
            $stmt->execute();
            
            $post = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($post) {
                echo json_encode(['success' => true, 'data' => $post]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Post not found']);
            }
        } else {
            // Get all blog posts (summary only, no heavy SEO data needed for list view)
            $query = "SELECT * FROM blog_posts ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();
            
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $posts]);
        }
        break;
        
    case 'POST':
        // Create new blog post
        try {
            // Auto-generate slug from title if not provided
            if (isset($data->slug) && !empty($data->slug)) {
                $slug = generateSlug($data->slug);
            } else {
                $slug = generateSlug($data->title);
            }
            $tags = isset($data->tags) ? $data->tags : null;
            $authorLinkedIn = isset($data->authorLinkedIn) ? $data->authorLinkedIn : null;
            $authorTitle = isset($data->authorTitle) ? $data->authorTitle : null;
            $authorPhoto = isset($data->authorPhoto) ? $data->authorPhoto : null;
            $includeInSitemap = isset($data->includeInSitemap) ? ($data->includeInSitemap ? 1 : 0) : 1;
            
            // Note: SEO fields are now handled by seo-metatags.php
            
            $query = "INSERT INTO blog_posts (title, slug, tags, excerpt, content, status, include_in_sitemap, type, author, author_linkedin, author_title, author_photo, featured_image) 
                      VALUES (:title, :slug, :tags, :excerpt, :content, :status, :include_in_sitemap, :type, :author, :author_linkedin, :author_title, :author_photo, :featured_image)";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':title', $data->title);
            $stmt->bindParam(':slug', $slug);
            $stmt->bindParam(':tags', $tags);
            $stmt->bindParam(':excerpt', $data->excerpt);
            $stmt->bindParam(':content', $data->content);
            $stmt->bindParam(':status', $data->status);
            $stmt->bindParam(':include_in_sitemap', $includeInSitemap);
            $stmt->bindParam(':type', $data->type);
            $stmt->bindParam(':author', $data->author);
            $stmt->bindParam(':author_linkedin', $authorLinkedIn);
            $stmt->bindParam(':author_title', $authorTitle);
            $stmt->bindParam(':author_photo', $authorPhoto);
            $stmt->bindParam(':featured_image', $data->image);
            
            if ($stmt->execute()) {
                $id = $db->lastInsertId();
                // Regenerate sitemap
                SitemapGenerator::regenerate();
                // Send email notification
                sendAdminNotificationEmail('blog_created', [
                    'id' => $id,
                    'title' => $data->title,
                    'status' => $data->status,
                    'type' => $data->type
                ]);
                echo json_encode(['success' => true, 'message' => 'Post created', 'id' => $id]);
            } else {
                $errorInfo = $stmt->errorInfo();
                http_response_code(500);
                echo json_encode([
                    'success' => false, 
                    'message' => 'Failed to create post', 
                    'error' => $errorInfo[2]
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false, 
                'message' => 'Error creating post', 
                'error' => $e->getMessage()
            ]);
        }
        break;
        
    case 'PUT':
        // Update blog post
        try {
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Post ID required']);
                exit();
            }
            
            // Auto-generate slug from title if not provided
            if (isset($data->slug) && !empty($data->slug)) {
                $slug = generateSlug($data->slug);
            } else {
                $slug = generateSlug($data->title);
            }
            $tags = isset($data->tags) ? $data->tags : null;
            $authorLinkedIn = isset($data->authorLinkedIn) ? $data->authorLinkedIn : null;
            $authorTitle = isset($data->authorTitle) ? $data->authorTitle : null;
            $authorPhoto = isset($data->authorPhoto) ? $data->authorPhoto : null;
            $includeInSitemap = isset($data->includeInSitemap) ? ($data->includeInSitemap ? 1 : 0) : 1;
            
            // Note: SEO fields are now handled by seo-metatags.php
            
            $query = "UPDATE blog_posts SET 
                      title = :title,
                      slug = :slug,
                      tags = :tags, 
                      excerpt = :excerpt, 
                      content = :content, 
                      status = :status,
                      include_in_sitemap = :include_in_sitemap, 
                      type = :type, 
                      author = :author,
                      author_linkedin = :author_linkedin,
                      author_title = :author_title,
                      author_photo = :author_photo, 
                      featured_image = :featured_image,
                      updated_at = CURRENT_TIMESTAMP
                      WHERE id = :id";
            
            $stmt = $db->prepare($query);
            $stmt->bindParam(':title', $data->title);
            $stmt->bindParam(':slug', $slug);
            $stmt->bindParam(':tags', $tags);
            $stmt->bindParam(':excerpt', $data->excerpt);
            $stmt->bindParam(':content', $data->content);
            $stmt->bindParam(':status', $data->status);
            $stmt->bindParam(':include_in_sitemap', $includeInSitemap);
            $stmt->bindParam(':type', $data->type);
            $stmt->bindParam(':author', $data->author);
            $stmt->bindParam(':author_linkedin', $authorLinkedIn);
            $stmt->bindParam(':author_title', $authorTitle);
            $stmt->bindParam(':author_photo', $authorPhoto);
            $stmt->bindParam(':featured_image', $data->image);
            $stmt->bindParam(':id', $_GET['id']);
            
            if ($stmt->execute()) {
                // Regenerate sitemap
                SitemapGenerator::regenerate();
                // Send email notification
                sendAdminNotificationEmail('blog_updated', [
                    'id' => $_GET['id'],
                    'title' => $data->title,
                    'status' => $data->status,
                    'type' => $data->type
                ]);
                echo json_encode(['success' => true, 'message' => 'Post updated']);
            } else {
                $errorInfo = $stmt->errorInfo();
                http_response_code(500);
                echo json_encode([
                    'success' => false, 
                    'message' => 'Failed to update post',
                    'error' => $errorInfo[2]
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false, 
                'message' => 'Error updating post',
                'error' => $e->getMessage()
            ]);
        }
        break;
        
    case 'DELETE':
        // Delete blog post
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Post ID required']);
            exit();
        }
        
        $query = "DELETE FROM blog_posts WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $_GET['id']);
        
        if ($stmt->execute()) {
            // Regenerate sitemap
            SitemapGenerator::regenerate();
            // Send email notification  
            sendAdminNotificationEmail('blog_deleted', [
                'id' => $_GET['id']
            ]);
            echo json_encode(['success' => true, 'message' => 'Post deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete post']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
