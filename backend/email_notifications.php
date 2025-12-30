<?php
/**
 * Email Notification Helper
 * Sends email notifications to info@imoexo.com for admin actions
 */

function sendAdminNotificationEmail($action, $details, $adminInfo = []) {
    $to = 'pramod.lohgaonkar@cybaemtech.com';
    
    // Get admin info from session if not provided
    if (empty($adminInfo)) {
        session_start();
        $adminInfo = [
            'email' => $_SESSION['admin_email'] ?? 'Unknown Admin',
            'name' => $_SESSION['admin_name'] ?? 'Admin User',
            'role' => $_SESSION['admin_role'] ?? 'Admin'
        ];
    }
    
    $timestamp = date('F j, Y, g:i a');
    
    // Build email subject and message based on action type
    switch ($action) {
        case 'blog_created':
            $subject = 'New Blog Post Created - ' . ($details['title'] ?? 'Untitled');
            $message = "A new blog post has been created.\n\n";
            break;
            
        case 'blog_updated':
            $subject = 'Blog Post Updated - ' . ($details['title'] ?? 'Untitled');
            $message = "A blog post has been updated.\n\n";
            break;
            
        case 'blog_deleted':
            $subject = 'Blog Post Deleted - ' . ($details['title'] ?? 'Untitled');
            $message = "A blog post has been deleted.\n\n";
            break;
            
        case 'user_created':
            $subject = 'New User Created - ' . ($details['username'] ?? 'Unknown');
            $message = "A new user has been created in the system.\n\n";
            break;
            
        case 'user_updated':
            $subject = 'User Updated - ' . ($details['username'] ?? 'Unknown');
            $message = "A user account has been updated.\n\n";
            break;
            
        case 'user_deleted':
            $subject = 'User Deleted - ' . ($details['username'] ?? 'Unknown');
            $message = "A user account has been deleted.\n\n";
            break;
            
        case 'content_created':
            $subject = 'New Content Created - ' . ($details['title'] ?? 'Untitled');
            $message = "New content has been created.\n\n";
            break;
            
        case 'content_updated':
            $subject = 'Content Updated - ' . ($details['title'] ?? 'Untitled');
            $message = "Content has been updated.\n\n";
            break;
            
        case 'content_deleted':
            $subject = 'Content Deleted - ' . ($details['title'] ?? 'Untitled');
            $message = "Content has been deleted.\n\n";
            break;
            
        case 'job_created':
            $subject = 'New Job Posted - ' . ($details['title'] ?? 'Untitled');
            $message = "A new job has been posted.\n\n";
            break;
            
        case 'job_updated':
            $subject = 'Job Updated - ' . ($details['title'] ?? 'Untitled');
            $message = "A job posting has been updated.\n\n";
            break;
            
        case 'job_deleted':
            $subject = 'Job Deleted - ' . ($details['title'] ?? 'Untitled');
            $message = "A job posting has been deleted.\n\n";
            break;
            
        case 'application_reviewed':
            $subject = 'Job Application Reviewed - ' . ($details['candidate_name'] ?? 'Unknown');
            $message = "A job application has been reviewed.\n\n";
            break;
            
        case 'lead_created':
            $subject = 'New Lead - ' . ($details['name'] ?? 'Unknown');
            $message = "A new lead has been submitted.\n\n";
            break;
            
        case 'lead_updated':
            $subject = 'Lead Updated - ' . ($details['name'] ?? 'Unknown');
            $message = "A lead has been updated.\n\n";
            break;
            
        case 'lead_deleted':
            $subject = 'Lead Deleted - ' . ($details['name'] ?? 'Unknown');
            $message = "A lead has been deleted.\n\n";
            break;
            
        case 'gallery_image_uploaded':
            $subject = 'Gallery Image Uploaded';
            $message = "A new image has been uploaded to the gallery.\n\n";
            break;
            
        case 'gallery_image_deleted':
            $subject = 'Gallery Image Deleted';
            $message = "An image has been deleted from the gallery.\n\n";
            break;
            
        case 'media_uploaded':
            $subject = 'Media File Uploaded - ' . ($details['filename'] ?? 'Unknown');
            $message = "A new media file has been uploaded.\n\n";
            break;
            
        case 'media_deleted':
            $subject = 'Media File Deleted - ' . ($details['filename'] ?? 'Unknown');
            $message = "A media file has been deleted.\n\n";
            break;
            
        default:
            $subject = 'Admin Action Notification';
            $message = "An admin action has been performed.\n\n";
    }
    
    // Add admin info
    $message .= "Performed By: {$adminInfo['name']} ({$adminInfo['email']})\n";
    $message .= "Role: {$adminInfo['role']}\n";
    $message .= "Timestamp: $timestamp\n\n";
    
    // Add details
    $message .= "--- Details ---\n";
    foreach ($details as $key => $value) {
        if (is_array($value)) {
            $value = json_encode($value);
        }
        $label = ucwords(str_replace('_', ' ', $key));
        $message .= "$label: " . ($value ?? 'N/A') . "\n";
    }
    
    // Email headers
    $headers = "From: Cybaem Tech CMS <noreply@cybaemtech.com>\r\n";
    $headers .= "Reply-To: pramod.lohgaonkar@cybaemtech.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    return @mail($to, $subject, $message, $headers);
}

/**
 * Send notification for inquiry deletion
 */
function sendInquiryDeletionEmail($inquiry, $inquiryType, $adminInfo = []) {
    if (empty($adminInfo)) {
        session_start();
        $adminInfo = [
            'email' => $_SESSION['admin_email'] ?? 'Unknown Admin',
            'name' => $_SESSION['admin_name'] ?? 'Admin User',
            'role' => $_SESSION['admin_role'] ?? 'Admin'
        ];
    }
    
    $to = 'pramod.lohgaonkar@cybaemtech.com';
    $subject = 'Inquiry Deleted - ' . ucfirst($inquiryType) . ' Inquiry #' . $inquiry['id'];
    
    $message = "An inquiry has been deleted from the system.\n\n";
    $message .= "Deleted By: {$adminInfo['name']} ({$adminInfo['email']})\n";
    $message .= "Deletion Time: " . date('F j, Y, g:i a') . "\n\n";
    $message .= "--- Deleted Inquiry Details ---\n";
    $message .= "Inquiry ID: #{$inquiry['id']}\n";
    $message .= "Inquiry Type: " . ucfirst($inquiryType) . " Inquiry\n";
    
    foreach ($inquiry as $key => $value) {
        if ($key !== 'id' && $key !== 'ip_address') {
            $label = ucwords(str_replace('_', ' ', $key));
            $message .= "$label: " . ($value ?? 'N/A') . "\n";
        }
    }
    
    $headers = "From: Cybaem Tech CMS <noreply@cybaemtech.com>\r\n";
    $headers .= "Reply-To: pramod.lohgaonkar@cybaemtech.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    return @mail($to, $subject, $message, $headers);
}

/**
 * Send notification for admin profile update
 */
function sendAdminProfileUpdateEmail($details, $adminInfo = []) {
    $to = 'pramod.lohgaonkar@cybaemtech.com';
    $subject = 'Admin Profile Updated - ' . ($details['new_username'] ?? 'Unknown');
    
    $message = "An admin profile has been updated in the system.\n\n";
    $message .= "--- Update Details ---\n";
    $message .= "Updated By: {$adminInfo['name']} ({$adminInfo['email']})\n";
    $message .= "Update Time: " . ($details['updated_at'] ?? date('F j, Y, g:i a')) . "\n\n";
    
    $message .= "--- Changes ---\n";
    if (isset($details['previous_username']) && $details['previous_username'] !== $details['new_username']) {
        $message .= "Username Changed: {$details['previous_username']} → {$details['new_username']}\n";
    } else {
        $message .= "Username: {$details['new_username']}\n";
    }
    $message .= "Email: {$details['new_email']}\n";
    
    $headers = "From: Cybaem Tech CMS <noreply@cybaemtech.com>\r\n";
    $headers .= "Reply-To: pramod.lohgaonkar@cybaemtech.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    return @mail($to, $subject, $message, $headers);
}

