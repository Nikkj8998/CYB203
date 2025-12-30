<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

// Check authentication
session_start();
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized. Please login to access this resource.'
    ]);
    exit();
}

// Get database connection
$database = new Database();
$conn = $database->getConnection();

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Get action from query parameter
$action = isset($_GET['action']) ? $_GET['action'] : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

try {
    switch ($method) {
        case 'GET':
            if ($action === 'download' && $id > 0) {
                // Download resume file
                downloadResume($conn, $id);
            } elseif ($id > 0) {
                // Get single application
                getApplication($conn, $id);
            } else {
                // Get all applications
                getAllApplications($conn);
            }
            break;
            
        case 'PUT':
            // Update application status
            updateApplicationStatus($conn);
            break;
            
        case 'DELETE':
            // Delete application
            deleteApplication($conn);
            break;
            
        default:
            echo json_encode([
                'success' => false,
                'message' => 'Method not allowed'
            ]);
            break;
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}

// Get all job applications
function getAllApplications($conn) {
    try {
        $query = "SELECT 
                    ja.id,
                    ja.job_id,
                    ja.applicant_name as full_name,
                    ja.applicant_email as email,
                    ja.applicant_phone as phone,
                    ja.resume_path,
                    ja.resume_original_name,
                    ja.resume_mime_type,
                    ja.resume_size_bytes,
                    ja.source_url,
                    ja.status,
                    ja.created_at,
                    ja.updated_at,
                    ja.job_title
                  FROM job_applications ja 
                  ORDER BY ja.created_at DESC";
        
        $stmt = $conn->prepare($query);
        $stmt->execute();
        
        $applications = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $applications[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $applications
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching applications: ' . $e->getMessage()
        ]);
    }
}

// Get single application
function getApplication($conn, $id) {
    try {
        $query = "SELECT 
                    ja.id,
                    ja.job_id,
                    ja.applicant_name as full_name,
                    ja.applicant_email as email,
                    ja.applicant_phone as phone,
                    ja.resume_path,
                    ja.resume_original_name,
                    ja.resume_mime_type,
                    ja.resume_size_bytes,
                    ja.source_url,
                    ja.status,
                    ja.created_at,
                    ja.updated_at,
                    ja.job_title
                  FROM job_applications ja 
                  WHERE ja.id = :id";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        $application = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($application) {
            echo json_encode([
                'success' => true,
                'data' => $application
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Application not found'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching application: ' . $e->getMessage()
        ]);
    }
}

// Download resume file
function downloadResume($conn, $id) {
    try {
        $query = "SELECT resume_path, resume_original_name, applicant_name as full_name, resume_mime_type FROM job_applications WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        $application = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$application) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Application not found'
            ]);
            return;
        }
        
        if (empty($application['resume_path'])) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'No resume file attached to this application'
            ]);
            return;
        }
        
        // Get the resume path - convert database path to local filesystem path
        $resumePathFromDB = $application['resume_path'];
        $fileName = basename($resumePathFromDB);
        
        // Build the actual local file path
        $localFilePath = __DIR__ . '/../uploads/resumes/' . $fileName;
        
        // Check if file exists locally
        if (!file_exists($localFilePath)) {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Resume file not found: ' . $fileName
            ]);
            return;
        }
        
        // Use original filename for download
        $downloadFileName = $application['resume_original_name'] ?: $fileName;
        $mimeType = $application['resume_mime_type'] ?: 'application/pdf';
        
        // Set headers for file download
        header('Content-Type: ' . $mimeType);
        header('Content-Disposition: attachment; filename="' . $downloadFileName . '"');
        header('Content-Length: ' . filesize($localFilePath));
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        
        // Clear output buffer
        if (ob_get_level()) {
            ob_end_clean();
        }
        
        // Read and output file
        readfile($localFilePath);
        exit();
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error downloading resume: ' . $e->getMessage()
        ]);
    }
}

// Update application status
function updateApplicationStatus($conn) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id']) || !isset($data['status'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields'
            ]);
            return;
        }
        
        $id = intval($data['id']);
        $status = $data['status'];
        
        // Validate status
        $validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'contacted'];
        if (!in_array($status, $validStatuses)) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid status value'
            ]);
            return;
        }
        
        $query = "UPDATE job_applications SET status = :status WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Application status updated successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to update application status'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error updating application: ' . $e->getMessage()
        ]);
    }
}

// Delete application
function deleteApplication($conn) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Missing application ID'
            ]);
            return;
        }
        
        $id = intval($data['id']);
        
        // Get resume path before deleting
        $query = "SELECT resume_path FROM job_applications WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $application = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($application) {
            // Delete the application from database
            $deleteQuery = "DELETE FROM job_applications WHERE id = :id";
            $deleteStmt = $conn->prepare($deleteQuery);
            $deleteStmt->bindParam(':id', $id);
            
            if ($deleteStmt->execute()) {
                // Delete resume file if exists
                $resumePath = __DIR__ . '/../' . $application['resume_path'];
                if (file_exists($resumePath)) {
                    unlink($resumePath);
                }
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Application deleted successfully'
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to delete application'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Application not found'
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error deleting application: ' . $e->getMessage()
        ]);
    }
}
?>
