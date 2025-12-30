<?php
// Start output buffering
ob_start();

// Set headers first
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://www.cybaemtech.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    ob_clean();
    http_response_code(200);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_clean();
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit();
}

// Simple response function
function sendResponse($success, $message, $error = null, $code = null, $extraData = []) {
    ob_clean();
    $response = ["success" => $success, "message" => $message];
    if ($error) $response["error"] = $error;
    if ($code) $response["code"] = $code;
    if ($extraData) $response = array_merge($response, $extraData);
    
    http_response_code($success ? 200 : ($code === "MISSING_FIELDS" ? 400 : 500));
    echo json_encode($response);
    exit();
}

try {
    // Include PHPMailer
    require_once __DIR__ . '/../lib/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/../lib/PHPMailer/SMTP.php';
    require_once __DIR__ . '/../lib/PHPMailer/Exception.php';
    
    // Database connection
    require_once __DIR__ . '/../config/database.php';
    $database = new Database();
    $conn = $database->getConnection();
    
    if (!$conn) {
        sendResponse(false, "Database connection failed", "Database connection failed", "DATABASE_ERROR");
    }
    
} catch (Exception $e) {
    sendResponse(false, "Server configuration error", "Server configuration error", "CONFIG_ERROR");
}

// Validate required fields
if (empty($_POST['job_id']) || empty($_POST['job_title']) || empty($_POST['applicant_name']) || empty($_POST['applicant_email'])) {
    sendResponse(false, "Missing required fields", "Missing required fields", "MISSING_FIELDS");
}

$jobId = intval($_POST['job_id']);
$jobTitle = trim($_POST['job_title']);
$applicantName = trim($_POST['applicant_name']);
$applicantEmail = trim($_POST['applicant_email']);
$applicantPhone = isset($_POST['applicant_phone']) ? trim($_POST['applicant_phone']) : null;
$sourceUrl = isset($_POST['source_url']) ? trim($_POST['source_url']) : null;

// Validate email
if (!filter_var($applicantEmail, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, "Invalid email format", "Invalid email format", "INVALID_EMAIL");
}

// Handle file upload
if (!isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    sendResponse(false, "Resume file is required", "Resume file is required", "FILE_UPLOAD_ERROR");
}

$resumeFile = $_FILES['resume'];

// Validate file size (10MB)
if ($resumeFile['size'] > 10 * 1024 * 1024) {
    sendResponse(false, "File size exceeds 10MB limit", "File size exceeds 10MB limit", "FILE_TOO_LARGE");
}

// Validate file type and get MIME type
$allowedExtensions = ['pdf', 'doc', 'docx'];
$fileExtension = strtolower(pathinfo($resumeFile['name'], PATHINFO_EXTENSION));

if (!in_array($fileExtension, $allowedExtensions)) {
    sendResponse(false, "Invalid file type. Only PDF, DOC, and DOCX files are allowed", "Invalid file type", "INVALID_FILE_TYPE");
}

// Get MIME type based on extension
$mimeTypes = [
    'pdf' => 'application/pdf',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

$resumeMimeType = $mimeTypes[$fileExtension] ?? 'application/octet-stream';

// FIXED: Use correct path for your domain
$uploadDir = '/home/cybaemtech/public_html/backend/uploads/resumes/';

// Check if directory exists and is writable
$dirExists = is_dir($uploadDir);
$dirWritable = is_writable($uploadDir);

// If directory doesn't exist, try to create it
if (!$dirExists) {
    if (!mkdir($uploadDir, 0755, true)) {
        sendResponse(false, "Upload directory not available", "Cannot create upload directory: " . $uploadDir, "DIRECTORY_ERROR");
    }
    $dirExists = true;
    $dirWritable = is_writable($uploadDir);
}

// If directory exists but not writable, try to fix permissions
if ($dirExists && !$dirWritable) {
    // Try to change permissions
    if (!chmod($uploadDir, 0755)) {
        sendResponse(false, "Upload directory not writable", "Directory exists but is not writable: " . $uploadDir, "DIRECTORY_PERMISSION_ERROR");
    }
    $dirWritable = is_writable($uploadDir);
}

// Final check - if still not writable, show specific error
if (!$dirWritable) {
    sendResponse(false, 
        "System configuration issue - please contact support", 
        "Upload directory is not writable. Please check folder permissions for: " . $uploadDir, 
        "DIRECTORY_PERMISSION_ERROR"
    );
}

// Generate unique filename
$filename = 'resume_' . uniqid() . '_' . time() . '.' . $fileExtension;
$filePath = $uploadDir . $filename;

// Move uploaded file
if (!move_uploaded_file($resumeFile['tmp_name'], $filePath)) {
    sendResponse(false, "Failed to save file", "Failed to save file to: " . $filePath, "FILE_SAVE_ERROR");
}

// Set file permissions
chmod($filePath, 0644);

try {
    // Insert into database - Use relative path for backend/uploads/resumes
    $relativePath = 'backend/uploads/resumes/' . $filename;
    
    $stmt = $conn->prepare("
        INSERT INTO job_applications 
        (job_id, job_title, applicant_name, applicant_email, applicant_phone, 
         resume_path, resume_original_name, resume_mime_type, resume_size_bytes, source_url, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    ");
    
    $result = $stmt->execute([
        $jobId,
        $jobTitle,
        $applicantName,
        $applicantEmail,
        $applicantPhone,
        $relativePath,
        $resumeFile['name'],
        $resumeMimeType,
        $resumeFile['size'],
        $sourceUrl
    ]);
    
    if (!$result) {
        throw new Exception("Database insert failed");
    }
    
    $applicationId = $conn->lastInsertId();
    
} catch (Exception $e) {
    // Clean up file if database insert fails
    if (file_exists($filePath)) {
        unlink($filePath);
    }
    sendResponse(false, "Failed to save application", "Database error: " . $e->getMessage(), "DATABASE_ERROR");
}

// Send emails to both HR and Applicant
$hrEmailSent = false;
$applicantEmailSent = false;
$emailErrors = [];

try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'mail.cybaemtech.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'hr@cybaemtech.com';
    $mail->Password = 'Cybaem@123';
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    
    // ========== EMAIL 1: Send to HR ==========
    $mail->clearAddresses();
    $mail->clearAttachments();
    
    $mail->setFrom('no-reply@cybaemtech.com', 'CybaemTech Careers');
    $mail->addAddress('hr@cybaemtech.com');
    $mail->addReplyTo($applicantEmail, $applicantName);
    $mail->isHTML(true);
    $mail->Subject = "ðŸŽ¯ New Job Application - " . $jobTitle;
    $mail->Body = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:20px; }
                .container { max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden; }
                .header { background:#0f172a; padding:20px; text-align:center; }
                .content { padding:30px; color:#333333; }
                .job-title { background:#f0f9ff; padding:15px; border-left:4px solid #0f172a; margin:20px 0; }
                table { width:100%; border-collapse:collapse; margin-top:20px; }
                td { padding:12px 15px; border-bottom:1px solid #eaeaea; font-size:15px; }
                td.label { font-weight:600; color:#0f172a; background:#f9fafb; width:35%; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2 style='color:white; margin:0;'>New Job Application</h2>
                </div>
                <div class='content'>
                    <div class='job-title'>
                        <h3 style='margin:0; color:#0f172a;'>{$jobTitle}</h3>
                    </div>
                    
                    <h4 style='color:#0f172a;'>Applicant Information</h4>
                    <table>
                        <tr><td class='label'>Name</td><td>{$applicantName}</td></tr>
                        <tr><td class='label'>Email</td><td><a href='mailto:{$applicantEmail}'>{$applicantEmail}</a></td></tr>
                        <tr><td class='label'>Phone</td><td>" . ($applicantPhone ?: 'Not provided') . "</td></tr>
                    </table>
                    
                    <h4 style='color:#0f172a; margin-top:25px;'>Application Details</h4>
                    <table>
                        <tr><td class='label'>Application ID</td><td>#{$applicationId}</td></tr>
                        <tr><td class='label'>Resume File</td><td>{$resumeFile['name']}</td></tr>
                        <tr><td class='label'>File Size</td><td>" . round($resumeFile['size'] / 1024, 2) . " KB</td></tr>
                        <tr><td class='label'>Source</td><td>" . ($sourceUrl ?: 'Career Page') . "</td></tr>
                    </table>
                </div>
            </div>
        </body>
        </html>
    ";
    
    // Attach resume to HR email
    if (file_exists($filePath)) {
        $mail->addAttachment($filePath, $resumeFile['name']);
    }
    
    $hrEmailSent = $mail->send();
    
} catch (Exception $e) {
    $emailErrors[] = "HR email failed: " . $e->getMessage();
    $hrEmailSent = false;
}

try {
    // ========== EMAIL 2: Send confirmation to Applicant ==========
    $mail->clearAddresses();
    $mail->clearAttachments();
    
    $mail->setFrom('no-reply@cybaemtech.com', 'CybaemTech Careers');
    $mail->addAddress($applicantEmail);
    $mail->addReplyTo('hr@cybaemtech.com', 'HR Department');
    $mail->isHTML(true);
    $mail->Subject = "Thank You for Your Application - " . $jobTitle;
    $mail->Body = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background:#f4f6f9; margin:0; padding:20px; }
                .container { max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden; }
                .header { background:#0f172a; padding:20px; text-align:center; }
                .content { padding:30px; color:#333333; }
                .highlight { background:#f0f9ff; padding:15px; border-radius:8px; margin:20px 0; }
                .btn { display:inline-block; margin-top:20px; padding:12px 24px; background:#0f172a; color:#fff; text-decoration:none; border-radius:8px; font-weight:bold; }
                .footer { background:#f1f5f9; padding:15px; text-align:center; font-size:13px; color:#666; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2 style='color:white; margin:0;'>Application Received</h2>
                </div>
                <div class='content'>
                    <h2>Thank You for Applying, {$applicantName}!</h2>
                    <p>We have successfully received your application for the following position:</p>
                    
                    <div class='highlight'>
                        <h3 style='margin:0; color:#0f172a;'>{$jobTitle}</h3>
                    </div>
                    
                    <p>Our HR team will carefully review your application and resume. If your qualifications match our requirements, we will contact you within 5-7 business days to discuss the next steps.</p>
                    
                    <p><strong>Application Reference:</strong> #{$applicationId}</p>
                    
                    <p style='margin-top:25px;'>Meanwhile, feel free to explore our website and learn more about what we do at Cybaem Tech.</p>
                    
                    <div style='text-align:center;'>
                        <a href='https://www.cybaemtech.com' class='btn'>Visit Our Website</a>
                    </div>
                </div>
                <div class='footer'>
                    You are receiving this email because you applied for a position at <a href='https://www.cybaemtech.com' style='color:#0f172a; text-decoration:none; font-weight:600;'>Cybaem Tech</a>.<br>
                    Â© " . date("Y") . " Cybaem Tech. All Rights Reserved.
                </div>
            </div>
        </body>
        </html>
    ";
    
    // Don't attach resume to applicant email (just confirmation)
    
    $applicantEmailSent = $mail->send();
    
} catch (Exception $e) {
    $emailErrors[] = "Applicant email failed: " . $e->getMessage();
    $applicantEmailSent = false;
}

// Return success response
sendResponse(true, "Application submitted successfully!", null, null, [
    "application_id" => $applicationId,
    "emails_sent" => [
        "hr" => $hrEmailSent,
        "applicant" => $applicantEmailSent
    ],
    "email_errors" => $emailErrors,
    "file_uploaded" => true,
    "file_path" => $relativePath
]);
?>