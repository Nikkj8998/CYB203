<?php
/**
 * Upload this file to your cPanel public_html/cybaemtech.com/ folder
 * Then visit: https://cybaemtech.com/CHECK_DEPLOYMENT.php
 * This will show you exactly what's wrong with your deployment
 */

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Cybaem Tech - Deployment Check</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .warning { color: orange; font-weight: bold; }
        .box { background: #f9f9f9; padding: 15px; margin: 10px 0; border-left: 4px solid #ccc; }
        .box.success { border-color: green; background: #f0fff0; }
        .box.error { border-color: red; background: #fff0f0; }
        h2 { color: #333; }
        code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Cybaem Tech Deployment Checker</h1>
        <p>This page checks if your API files are deployed correctly.</p>
        <hr>

        <?php
        $errors = 0;
        $warnings = 0;

        // Check 1: Current directory
        echo "<h2>1. Current Directory</h2>";
        echo "<div class='box'>";
        echo "<strong>This file is in:</strong> <code>" . __DIR__ . "</code><br>";
        echo "<strong>Document root:</strong> <code>" . $_SERVER['DOCUMENT_ROOT'] . "</code>";
        echo "</div>";

        // Check 2: API folder exists
        echo "<h2>2. API Folder Check</h2>";
        $apiPath = __DIR__ . '/api';
        if (is_dir($apiPath)) {
            echo "<div class='box success'>";
            echo "<span class='success'>✅ FOUND:</span> api/ folder exists at: <code>$apiPath</code>";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='error'>❌ ERROR:</span> api/ folder NOT found!<br>";
            echo "Expected location: <code>$apiPath</code><br>";
            echo "<strong>Fix:</strong> Upload the api/ folder to the same directory as this file.";
            echo "</div>";
            $errors++;
        }

        // Check 3: comments.php exists
        echo "<h2>3. Comments API File Check</h2>";
        $commentsPath = $apiPath . '/comments.php';
        if (file_exists($commentsPath)) {
            echo "<div class='box success'>";
            echo "<span class='success'>✅ FOUND:</span> comments.php exists<br>";
            echo "File size: " . filesize($commentsPath) . " bytes";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='error'>❌ ERROR:</span> api/comments.php NOT found!<br>";
            echo "Expected: <code>$commentsPath</code><br>";
            echo "<strong>Fix:</strong> Upload comments.php to the api/ folder.";
            echo "</div>";
            $errors++;
        }

        // Check 4: config folder
        echo "<h2>4. Config Folder Check</h2>";
        $configPath = __DIR__ . '/config';
        if (is_dir($configPath)) {
            echo "<div class='box success'>";
            echo "<span class='success'>✅ FOUND:</span> config/ folder exists";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='error'>❌ ERROR:</span> config/ folder NOT found!<br>";
            echo "<strong>Fix:</strong> Upload the config/ folder.";
            echo "</div>";
            $errors++;
        }

        // Check 5: database.php
        echo "<h2>5. Database Config Check</h2>";
        $dbPath = $configPath . '/database.php';
        if (file_exists($dbPath)) {
            echo "<div class='box success'>";
            echo "<span class='success'>✅ FOUND:</span> config/database.php exists";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='error'>❌ ERROR:</span> config/database.php NOT found!<br>";
            echo "<strong>Fix:</strong> Upload database.php to the config/ folder.";
            echo "</div>";
            $errors++;
        }

        // Check 6: .htaccess files
        echo "<h2>6. .htaccess Files Check</h2>";
        
        $rootHtaccess = __DIR__ . '/.htaccess';
        if (file_exists($rootHtaccess)) {
            echo "<div class='box success'>";
            echo "<span class='success'>✅ FOUND:</span> Root .htaccess exists";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='error'>❌ ERROR:</span> Root .htaccess NOT found!<br>";
            echo "<strong>Fix:</strong> Upload .htaccess to root directory.";
            echo "</div>";
            $warnings++;
        }

        $apiHtaccess = $apiPath . '/.htaccess';
        if (file_exists($apiHtaccess)) {
            echo "<div class='box success'>";
            echo "<span class='success'>✅ FOUND:</span> api/.htaccess exists";
            echo "</div>";
        } else {
            echo "<div class='box error'>";
            echo "<span class='error'>❌ ERROR:</span> api/.htaccess NOT found!<br>";
            echo "<strong>Fix:</strong> Upload .htaccess to api/ folder.";
            echo "</div>";
            $warnings++;
        }

        // Check 7: All API files
        echo "<h2>7. API Files Inventory</h2>";
        echo "<div class='box'>";
        if (is_dir($apiPath)) {
            $apiFiles = scandir($apiPath);
            $requiredFiles = ['comments.php', 'auth.php', 'blogs.php', 'public-blogs.php', 'media.php', 'contact.php', 'cors.php'];
            
            echo "<strong>Required files:</strong><br>";
            foreach ($requiredFiles as $file) {
                $filePath = $apiPath . '/' . $file;
                if (file_exists($filePath)) {
                    echo "✅ <code>$file</code><br>";
                } else {
                    echo "❌ <code>$file</code> - MISSING<br>";
                    $errors++;
                }
            }
        } else {
            echo "<span class='error'>Cannot check - api/ folder not found!</span>";
        }
        echo "</div>";

        // Summary
        echo "<hr>";
        echo "<h2>📊 Summary</h2>";
        echo "<div class='box'>";
        if ($errors == 0 && $warnings == 0) {
            echo "<span class='success' style='font-size: 20px;'>🎉 ALL CHECKS PASSED!</span><br><br>";
            echo "Your deployment looks good. Try visiting:<br>";
            echo "<a href='/api/comments.php?blog_id=7' target='_blank'>Test Comments API</a>";
        } else {
            echo "<span class='error' style='font-size: 18px;'>❌ Found $errors errors and $warnings warnings</span><br><br>";
            echo "<strong>Action needed:</strong> Fix the issues listed above and refresh this page.";
        }
        echo "</div>";

        // Test link
        echo "<hr>";
        echo "<h2>🧪 Quick Tests</h2>";
        echo "<div class='box'>";
        echo "<p><strong>If all checks passed, test these URLs:</strong></p>";
        echo "<ul>";
        echo "<li><a href='/api/comments.php?blog_id=7' target='_blank'>Comments API (blog_id=7)</a></li>";
        echo "<li><a href='/api/auth.php?action=check' target='_blank'>Auth API Check</a></li>";
        echo "<li><a href='/api/public-blogs.php' target='_blank'>Public Blogs API</a></li>";
        echo "</ul>";
        echo "</div>";
        ?>

        <hr>
        <p style="color: #666; font-size: 12px;">
            <strong>Note:</strong> Delete this CHECK_DEPLOYMENT.php file after fixing all issues.
        </p>
    </div>
</body>
</html>
