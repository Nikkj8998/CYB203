<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Debug function
function debugLog($message) {
    file_put_contents('contact_debug.log', date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

debugLog("=== Script started ===");

// Use leads database for contact form submissions
$host = getenv('LEADS_DB_HOST') ?: getenv('DB_HOST') ?: 'localhost';
$dbname = getenv('LEADS_DB_NAME') ?: getenv('DB_NAME') ?: '';
$username = getenv('LEADS_DB_USER') ?: getenv('DB_USER') ?: '';
$password = getenv('LEADS_DB_PASSWORD') ?: getenv('DB_PASSWORD') ?: '';

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Check if it's JSON or form data
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if (strpos($contentType, 'application/json') !== false) {
    // JSON input
    $raw = file_get_contents("php://input");
    $input = json_decode($raw, true);
    debugLog("JSON input: " . $raw);

    if ($input) {
        $name         = $input['name'] ?? '';
        $email        = $input['email'] ?? '';
        $phone        = $input['phone'] ?? '';
        $country      = $input['country'] ?? '';
        $message      = $input['message'] ?? '';
        $sourcePage   = $input['sourcePage'] ?? '';
        $selectedPlan = $input['selectedPlan'] ?? '';
    } else {
        $name = $email = $phone = $country = $message = $sourcePage = $selectedPlan = '';
    }
} else {
    // Form data
    $name         = $_POST['name'] ?? '';
    $email        = $_POST['email'] ?? '';
    $phone        = $_POST['phone'] ?? '';
    $country      = $_POST['country'] ?? '';
    $message      = $_POST['message'] ?? '';
    $sourcePage   = $_POST['sourcePage'] ?? '';
    $selectedPlan = $_POST['selectedPlan'] ?? '';

    debugLog("Form data - Name: $name, Email: $email, Phone: $phone");
}

// Log the extracted values
debugLog("Extracted values - Name: '$name', Email: '$email', Phone: '$phone', Country: '$country', Message: '$message', SourcePage: '$sourcePage', SelectedPlan: '$selectedPlan'");

// Validate required fields
if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "Name and email are required fields"]);
    exit();
}

// Use the exact column names from your database
$stmt = $conn->prepare("INSERT INTO contact_submissions_v2 
    (name, email, phone, country, message, sourcePage, selectedPlan) 
    VALUES (?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("sssssss", $name, $email, $phone, $country, $message, $sourcePage, $selectedPlan);

if ($stmt->execute()) {
    $insert_id = $stmt->insert_id;
    debugLog("Database insert successful - ID: $insert_id");

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: CybaemTech <no-reply@cybaemtech.com>\r\n";
    $headers .= "Reply-To: info@cybaemtech.com\r\n";

    $adminEmail   = "info@cybaemtech.com";
    $adminSubject = "🚀 New Contact Form Submission - Cybaem Tech";
    $adminMessage = '
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:20px; }
    .container { max-width:600px; margin:auto; background:#ffffff; border-radius:12px; 
                 box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden; }
    .header { background:#0f172a; padding:20px; text-align:center; }
    .header img { max-width:160px; }
    .content { padding:30px; color:#333333; }
    .content h2 { margin-top:0; color:#0f172a; font-size:22px; }
    table { width:100%; border-collapse:collapse; margin-top:20px; }
    td { padding:12px 15px; border-bottom:1px solid #eaeaea; font-size:15px; }
    td.label { font-weight:600; color:#0f172a; background:#f9fafb; width:30%; }
    td.value { color:#333; }
    .footer { background:#f9fafb; padding:15px; text-align:center; font-size:13px; color:#666; }
    .footer a { color:#0f172a; text-decoration:none; font-weight:600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://www.cybaemtech.com/uploads/footerlogo.webp" alt="Cybaem Tech Logo" width="160" style="max-width:160px;">
    </div>
    <div class="content">
      <h2>New Contact Submission</h2>
      <table>
        <tr><td class="label">Name</td><td class="value">' . htmlspecialchars($name) . '</td></tr>
        <tr><td class="label">Email</td><td class="value">' . htmlspecialchars($email) . '</td></tr>
        <tr><td class="label">Phone</td><td class="value">' . htmlspecialchars($phone) . '</td></tr>
        <tr><td class="label">Country</td><td class="value">' . htmlspecialchars($country) . '</td></tr>
        <tr><td class="label">Project Details</td><td class="value">' . nl2br(htmlspecialchars($message)) . '</td></tr>
        <tr><td class="label">Source Page</td><td class="value">' . htmlspecialchars($sourcePage) . '</td></tr>
      </table>
    </div>
    <div class="footer">
      © ' . date("Y") . ' <a href="https://www.cybaemtech.com">Cybaem Tech</a> — All Rights Reserved
    </div>
  </div>
</body>
</html>';

    $userSubject = "Thank You for Contacting Cybaem Tech";
    $userMessage = '
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:20px; }
        .container { max-width:600px; margin:auto; background:#ffffff; border-radius:12px; 
                     box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden; }
        .header { background:#0f172a; padding:20px; text-align:center; }
        .header img { max-width:160px; }
        .content { padding:30px; color:#333333; text-align:center; }
        .content h2 { margin-top:0; color:#0f172a; }
        .btn { display:inline-block; margin-top:20px; padding:12px 24px; background:#0f172a; 
               color:#fff; text-decoration:none; border-radius:8px; font-weight:bold; }
        .footer { background:#f1f5f9; padding:15px; text-align:center; font-size:13px; color:#666; }
        .footer a { color:#0f172a; text-decoration:none; font-weight:600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://www.cybaemtech.com/uploads/footerlogo.webp" alt="Cybaem Tech Logo" width="160" style="max-width:160px;">
        </div>
        <div class="content">
          <h2>Thank You, ' . htmlspecialchars($name) . '!</h2>
          <p>We have received your inquiry and our team will get back to you shortly.</p>
          <p>Meanwhile, feel free to explore our website for services & solutions.</p>
          <a href="https://www.cybaemtech.com" class="btn">Visit Our Website</a>
        </div>
        <div class="footer">
          You receiving this email because you reached out to <a href="https://www.cybaemtech.com">Cybaem Tech</a>.<br>
           ' . date("Y") . ' Cybaem Tech. All Rights Reserved.
        </div>
      </div>
    </body>
    </html>';

    // Send emails
    $adminMailResult = @mail($adminEmail, $adminSubject, $adminMessage, $headers);
    $userMailResult = @mail($email, $userSubject, $userMessage, $headers);

    debugLog("Admin email sent: " . ($adminMailResult ? "Yes" : "No"));
    debugLog("User email sent: " . ($userMailResult ? "Yes" : "No"));

    echo json_encode([
        "success" => true, 
        "message" => "Contact saved & emails sent",
        "insert_id" => $insert_id
    ]);
} else {
    $error = $stmt->error;
    debugLog("Database error: " . $error);
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $error]);
}

$stmt->close();
$conn->close();

debugLog("=== Script ended ===\n");
?>