<?php
echo "Testing blog API...\n";

$url = 'http://localhost/cybaemtech11dec/backend/api/public-blogs.php';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);

if (curl_error($ch)) {
    echo "cURL Error: " . curl_error($ch) . "\n";
} else {
    $data = json_decode($response, true);
    if ($data && isset($data['success']) && $data['success']) {
        echo "✅ API Response: " . $data['message'] . "\n";
        echo "Posts found: " . count($data['data']) . "\n\n";
        foreach ($data['data'] as $post) {
            echo "Post: " . $post['title'] . "\n";
            echo "Image: " . $post['featured_image'] . "\n";
            echo "---\n";
        }
    } else {
        echo "❌ API Error or no data found\n";
        echo "Response: " . substr($response, 0, 500) . "\n";
    }
}

curl_close($ch);
?>