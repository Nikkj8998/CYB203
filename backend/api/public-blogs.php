<?php
require_once __DIR__ . '/../config/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $database = new Database();
        $conn = $database->getConnection();
        
        // Add debug mode
        $debug = isset($_GET['debug']) && $_GET['debug'] === 'true';
        
        if (isset($_GET['id'])) {
            // Get single blog post by ID
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT id, title, slug, excerpt, content, status, type, author, author_linkedin, author_title, author_photo, featured_image, views, created_at, updated_at, tags FROM blog_posts WHERE id = :id AND status = 'published'");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $post = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($post) {
                // Process the post to ensure proper formatting
                if ($post['content']) {
                    $post['content'] = html_entity_decode($post['content'], ENT_QUOTES, 'UTF-8');
                }
                
                // Ensure excerpt exists
                if (empty($post['excerpt']) && !empty($post['content'])) {
                    $post['excerpt'] = substr(strip_tags($post['content']), 0, 200) . '...';
                }
                
                // Ensure featured image has proper URL format
                if ($post['featured_image']) {
                    if (!preg_match('/^https?:\/\//', $post['featured_image'])) {
                        if (!str_starts_with($post['featured_image'], '/public/uploads/')) {
                            if (str_starts_with($post['featured_image'], '/uploads/')) {
                                $post['featured_image'] = str_replace('/uploads/', '/public/uploads/', $post['featured_image']);
                            } elseif (!str_starts_with($post['featured_image'], '/')) {
                                $post['featured_image'] = '/public/uploads/' . $post['featured_image'];
                            }
                        }
                    }
                }
                
                // Ensure title and author are set
                if (empty($post['title'])) {
                    $post['title'] = 'Untitled Post';
                }
                if (empty($post['author'])) {
                    $post['author'] = 'Cybaem Tech';
                }
                
                if ($debug) {
                    error_log("Single post fetched: " . json_encode($post));
                    // Add debug info
                    $post['debug_info'] = [
                        'content_length' => strlen($post['content'] ?? ''),
                        'excerpt_length' => strlen($post['excerpt'] ?? ''),
                        'has_featured_image' => !empty($post['featured_image']),
                        'image_url' => $post['featured_image']
                    ];
                }
                echo json_encode(['success' => true, 'data' => $post]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Post not found']);
            }
        } elseif (isset($_GET['slug'])) {
            // Get single blog post by slug
            $slug = $_GET['slug'];
            $stmt = $conn->prepare("SELECT id, title, slug, excerpt, content, status, type, author, author_linkedin, author_title, author_photo, featured_image, views, created_at, updated_at, tags FROM blog_posts WHERE slug = :slug AND status = 'published'");
            $stmt->bindParam(':slug', $slug, PDO::PARAM_STR);
            $stmt->execute();
            $post = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($post) {
                // Process the post to ensure proper formatting
                if ($post['content']) {
                    $post['content'] = html_entity_decode($post['content'], ENT_QUOTES, 'UTF-8');
                }
                
                // Ensure excerpt exists
                if (empty($post['excerpt']) && !empty($post['content'])) {
                    $post['excerpt'] = substr(strip_tags($post['content']), 0, 200) . '...';
                }
                
                // Ensure featured image has proper URL format
                if ($post['featured_image']) {
                    if (!preg_match('/^https?:\/\//', $post['featured_image'])) {
                        if (!str_starts_with($post['featured_image'], '/public/uploads/')) {
                            if (str_starts_with($post['featured_image'], '/uploads/')) {
                                $post['featured_image'] = str_replace('/uploads/', '/public/uploads/', $post['featured_image']);
                            } elseif (!str_starts_with($post['featured_image'], '/')) {
                                $post['featured_image'] = '/public/uploads/' . $post['featured_image'];
                            }
                        }
                    }
                }
                
                // Ensure title and author are set
                if (empty($post['title'])) {
                    $post['title'] = 'Untitled Post';
                }
                if (empty($post['author'])) {
                    $post['author'] = 'Cybaem Tech';
                }
                
                if ($debug) {
                    error_log("Single post by slug fetched: " . json_encode($post));
                    $post['debug_info'] = [
                        'content_length' => strlen($post['content'] ?? ''),
                        'excerpt_length' => strlen($post['excerpt'] ?? ''),
                        'has_featured_image' => !empty($post['featured_image']),
                        'image_url' => $post['featured_image']
                    ];
                }
                echo json_encode(['success' => true, 'data' => $post]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Post not found']);
            }
        } else {
            // Get all published blog posts
            $stmt = $conn->prepare("SELECT id, title, slug, excerpt, content, status, type, author, author_linkedin, author_title, author_photo, featured_image, views, created_at, updated_at, tags FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC");
            $stmt->execute();
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Process posts to ensure proper formatting
            foreach ($posts as &$post) {
                // Ensure content is properly encoded
                if ($post['content']) {
                    $post['content'] = html_entity_decode($post['content'], ENT_QUOTES, 'UTF-8');
                }
                
                // Ensure excerpt exists
                if (empty($post['excerpt']) && !empty($post['content'])) {
                    $post['excerpt'] = substr(strip_tags($post['content']), 0, 200) . '...';
                }
                
                // Ensure featured image has proper URL format
                if ($post['featured_image']) {
                    if (!preg_match('/^https?:\/\//', $post['featured_image'])) {
                        if (!str_starts_with($post['featured_image'], '/public/uploads/')) {
                            if (str_starts_with($post['featured_image'], '/uploads/')) {
                                $post['featured_image'] = str_replace('/uploads/', '/public/uploads/', $post['featured_image']);
                            } elseif (!str_starts_with($post['featured_image'], '/')) {
                                $post['featured_image'] = '/public/uploads/' . $post['featured_image'];
                            }
                        }
                    }
                }
                
                // Ensure title is not empty
                if (empty($post['title'])) {
                    $post['title'] = 'Untitled Post';
                }
                
                // Ensure author is set
                if (empty($post['author'])) {
                    $post['author'] = 'Cybaem Tech';
                }
            }
            
            // Log the actual data being returned for debugging
            error_log("Blog posts query returned: " . count($posts) . " posts");
            if (!empty($posts)) {
                error_log("Sample post data: " . json_encode($posts[0]));
                
                if ($debug) {
                    // Add debug info to each post
                    foreach ($posts as &$post) {
                        $post['debug_info'] = [
                            'content_length' => strlen($post['content'] ?? ''),
                            'excerpt_length' => strlen($post['excerpt'] ?? ''),
                            'has_featured_image' => !empty($post['featured_image']),
                            'image_url' => $post['featured_image']
                        ];
                    }
                }
            }
            
            echo json_encode(['success' => true, 'data' => $posts, 'count' => count($posts)]);
        }
    } catch (PDOException $e) {
        error_log("Database error in public-blogs.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection error']);
    } catch (Exception $e) {
        error_log("Error in public-blogs.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
