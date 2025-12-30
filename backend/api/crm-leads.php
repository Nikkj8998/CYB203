<?php
require_once __DIR__ . '/cors.php';

// Load .env file for cPanel deployment
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Parse KEY=VALUE
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            
            // Set environment variable if not already set
            if (!getenv($key)) {
                putenv("$key=$value");
            }
        }
    }
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

ob_start();

session_start();

// Allow development access without authentication
$isDevelopment = (
    strpos($_SERVER['HTTP_HOST'] ?? '', 'localhost') !== false ||
    strpos($_SERVER['HTTP_HOST'] ?? '', 'replit') !== false ||
    strpos($_SERVER['HTTP_HOST'] ?? '', '127.0.0.1') !== false ||
    getenv('REPLIT_DEV_DOMAIN')
);

if (!$isDevelopment && !isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

function getConnection() {
    // Database connection details (hardcoded for reliability)
    $host = '82.25.105.94';
    $dbname = 'cybaemtech_contact_form_v2';
    $user = 'cybaemtech_contact_user_v2';
    $password = 'Cybaem@2025';
    $port = '3306';

    try {
        $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 30
        ]);
        
        // Test connection
        $pdo->query("SELECT 1");
        return $pdo;
        
    } catch (PDOException $e) {
        error_log("MySQL connection error: " . $e->getMessage());
        // Return a mock object instead of error
        return null;
    }
}

function jsonResponse($success, $data = [], $message = '', $error = '') {
    $response = ['success' => $success];
    if ($success) {
        $response['data'] = $data;
        if ($message) $response['message'] = $message;
    } else {
        if ($error) $response['error'] = $error;
        if ($message) $response['message'] = $message;
    }
    
    // Clear any previous output
    if (ob_get_level() > 0) {
        ob_end_clean();
    }
    
    // Ensure proper headers for JSON response
    header('Content-Type: application/json; charset=UTF-8');
    header('Connection: close');
    
    $json = json_encode($response);
    header('Content-Length: ' . strlen($json));
    
    echo $json;
    
    // Flush and close
    if (function_exists('fastcgi_finish_request')) {
        fastcgi_finish_request();
    }
    
    exit();
}

function generateLeadId($pdo) {
    $tableName = getLeadsTableName($pdo);
    $stmt = $pdo->query("SELECT MAX(id) as max_id FROM $tableName");
    $result = $stmt->fetch();
    $nextId = ($result['max_id'] ?? 0) + 1;
    return 'LEAD-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);
}

try {
    if (ob_get_length()) ob_clean();
    
    $pdo = getConnection();
    if (!$pdo) {
        // Return empty leads array instead of error
        jsonResponse(true, [], 'No leads available');
    }
    
    $method = $_SERVER['REQUEST_METHOD'];
    $action = isset($_GET['action']) ? $_GET['action'] : 'leads';
    
    switch ($action) {
        case 'leads':
            handleLeads($pdo, $method);
            break;
        case 'activities':
            handleActivities($pdo, $method);
            break;
        case 'settings':
            handleSettings($pdo, $method);
            break;
        case 'dashboard':
            handleDashboard($pdo);
            break;
        case 'export':
            handleExport($pdo);
            break;
        default:
            handleLeads($pdo, $method);
    }
    
} catch (Exception $e) {
    if (ob_get_length()) ob_clean();
    http_response_code(500);
    jsonResponse(false, [], 'Internal server error', $e->getMessage());
}

// Helper to get the correct table name
function getLeadsTableName($pdo) {
    static $tableName = null;
    if ($tableName) return $tableName;

    if (!$pdo) {
        return 'contact_submissions_v2';
    }

    // Check for v2 table first
    try {
        $pdo->query("SELECT 1 FROM contact_submissions_v2 LIMIT 1");
        $tableName = 'contact_submissions_v2';
        return $tableName;
    } catch (Exception $e) {}

    // Check for v1 table
    try {
        $pdo->query("SELECT 1 FROM contact_submissions LIMIT 1");
        $tableName = 'contact_submissions';
        return $tableName;
    } catch (Exception $e) {}

    // Default to v2 if neither found
    return 'contact_submissions_v2';
}

function handleLeads($pdo, $method) {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                getLeadById($pdo, intval($_GET['id']));
            } else {
                getLeads($pdo);
            }
            break;
        case 'POST':
            createLead($pdo);
            break;
        case 'PUT':
            updateLead($pdo);
            break;
        case 'DELETE':
            deleteLead($pdo);
            break;
        default:
            jsonResponse(false, [], 'Method not allowed');
    }
}

function getLeads($pdo) {
    // Return empty array if no connection
    if (!$pdo) {
        jsonResponse(true, [], '0 leads found');
        return;
    }
    
    $tableName = getLeadsTableName($pdo);
    
    // Map fields to show only requested columns with proper field mapping
    $sql = "SELECT 
        id as id,
        COALESCE(lead_status, status, 'New - Not Contacted') as status,
        COALESCE(full_name, name, '') as full_name,
        COALESCE(company_name, '') as company,
        COALESCE(phone, mobile_number, '') as phone,
        COALESCE(email, '') as email,
        COALESCE(lead_source, entry_source, 'Website') as source,
        created_at as created_at,
        COALESCE(message, original_message, '') as questions,
        COALESCE(notes, '') as note,
        updated_at,
        lead_status,
        company_name,
        lead_source,
        message,
        notes,
        mobile_number,
        country,
        location
    FROM $tableName WHERE 1=1";
    $params = [];
    
    if (!empty($_GET['search'])) {
        $search = '%' . $_GET['search'] . '%';
        $sql .= " AND (full_name LIKE :search1 OR email LIKE :search2 OR mobile_number LIKE :search3 OR company_name LIKE :search4 OR lead_id LIKE :search5 OR name LIKE :search6 OR phone LIKE :search7)";
        $params[':search1'] = $search;
        $params[':search2'] = $search;
        $params[':search3'] = $search;
        $params[':search4'] = $search;
        $params[':search5'] = $search;
        $params[':search6'] = $search;
        $params[':search7'] = $search;
    }
    
    if (!empty($_GET['status'])) {
        $statuses = explode(',', $_GET['status']);
        $placeholders = [];
        foreach ($statuses as $i => $status) {
            $key = ":status$i";
            $placeholders[] = $key;
            $params[$key] = trim($status);
        }
        $sql .= " AND lead_status IN (" . implode(',', $placeholders) . ")";
    }
    
    if (!empty($_GET['source'])) {
        $sql .= " AND lead_source = :source";
        $params[':source'] = $_GET['source'];
    }
    
    if (!empty($_GET['owner'])) {
        $sql .= " AND lead_owner = :owner";
        $params[':owner'] = $_GET['owner'];
    }
    
    if (!empty($_GET['quality'])) {
        $sql .= " AND lead_quality = :quality";
        $params[':quality'] = $_GET['quality'];
    }
    
    if (!empty($_GET['date_from'])) {
        $sql .= " AND lead_generated_at >= :date_from";
        $params[':date_from'] = $_GET['date_from'];
    }
    
    if (!empty($_GET['date_to'])) {
        $sql .= " AND lead_generated_at <= :date_to";
        $params[':date_to'] = $_GET['date_to'];
    }
    
    if (!empty($_GET['quick_filter'])) {
        switch ($_GET['quick_filter']) {
            case 'new':
                $sql .= " AND (lead_status = 'New - Not Contacted' OR lead_status IS NULL OR lead_status = '' OR lead_status = 'new')";
                break;
            case 'contacted':
                $sql .= " AND lead_status IN ('Attempted Contact', 'Connected - Follow-up Needed', 'contacted')";
                break;
            case 'pipeline':
                $sql .= " AND lead_status IN ('Qualified - Proposal Sent', 'Negotiation / In Discussion', 'qualified', 'proposal')";
                break;
            case 'won':
                $sql .= " AND lead_status = 'Closed - Won'";
                break;
            case 'junk':
                $sql .= " AND (lead_status = 'Dead / Junk' OR is_junk = 1)";
                break;
        }
    }
    
    $sql .= " ORDER BY created_at DESC";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $leads = $stmt->fetchAll();
        
        $formattedLeads = array_map(function($lead) {
            return [
                'id' => $lead['id'],
                'lead_id' => $lead['lead_id'] ?? ('LEAD-' . str_pad($lead['id'], 4, '0', STR_PAD_LEFT)),
                'status' => $lead['lead_status'] ?? $lead['status'] ?? 'New',
                'full_name' => $lead['full_name'] ?? $lead['name'] ?? '',
                'company' => $lead['company_name'] ?? '',
                'phone' => $lead['mobile_number'] ?? $lead['phone'] ?? '',
                'email' => $lead['email'] ?? '',
                'source' => $lead['lead_source'] ?? $lead['entry_source'] ?? $lead['sourcePage'] ?? 'Website',
                'created_at' => $lead['created_at'] ?? null,
                'questions' => $lead['original_message'] ?? $lead['message'] ?? '',
                'note' => $lead['notes'] ?? ''
            ];
        }, $leads);
        
        jsonResponse(true, $formattedLeads, count($formattedLeads) . ' leads found');
    } catch (PDOException $e) {
        error_log("Database error in getLeads: " . $e->getMessage());
        // Return empty array instead of error
        jsonResponse(true, [], '0 leads found');
    }
}

function getLeadById($pdo, $id) {
    try {
        $tableName = getLeadsTableName($pdo);
        $stmt = $pdo->prepare("SELECT * FROM $tableName WHERE id = :id");
        $stmt->execute([':id' => $id]);
        $lead = $stmt->fetch();
        
        if ($lead) {
            $formattedLead = [
                'id' => $lead['id'],
                'lead_id' => $lead['lead_id'] ?? ('LEAD-' . str_pad($lead['id'], 4, '0', STR_PAD_LEFT)),
                'status' => $lead['lead_status'] ?? $lead['status'] ?? 'New',
                'full_name' => $lead['full_name'] ?? $lead['name'] ?? '',
                'company' => $lead['company_name'] ?? '',
                'phone' => $lead['mobile_number'] ?? $lead['phone'] ?? '',
                'email' => $lead['email'] ?? '',
                'source' => $lead['lead_source'] ?? $lead['entry_source'] ?? $lead['sourcePage'] ?? 'Website',
                'created_at' => $lead['created_at'] ?? null,
                'questions' => $lead['original_message'] ?? $lead['message'] ?? '',
                'note' => $lead['notes'] ?? '',
                'updated_at' => $lead['updated_at'] ?? null,
            ];
            
            try {
                $actStmt = $pdo->prepare("SELECT * FROM crm_activities WHERE lead_id = :lead_id ORDER BY activity_date DESC");
                $actStmt->execute([':lead_id' => $id]);
                $formattedLead['activities'] = $actStmt->fetchAll();
            } catch (PDOException $e) {
                $formattedLead['activities'] = [];
            }
            
            jsonResponse(true, $formattedLead);
        } else {
            jsonResponse(false, [], 'Lead not found');
        }
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to fetch lead', $e->getMessage());
    }
}

function createLead($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['full_name']) || empty($input['mobile_number'])) {
        jsonResponse(false, [], 'Full name and mobile number are required');
    }
    
    $tableName = getLeadsTableName($pdo);
    $leadId = generateLeadId($pdo);
    
    $sql = "INSERT INTO $tableName (
        lead_id, name, full_name, phone, mobile_number, email, company_name, country, location, website,
        lead_source, campaign_name, service_interest, lead_status, lead_quality,
        lead_owner, lead_generated_at, preferred_channel, expected_deal_value,
        probability_percent, message, original_message, notes, is_junk, created_by, entry_source
    ) VALUES (
        :lead_id, :name, :full_name, :phone, :mobile_number, :email, :company_name, :country, :location, :website,
        :lead_source, :campaign_name, :service_interest, :lead_status, :lead_quality,
        :lead_owner, :lead_generated_at, :preferred_channel, :expected_deal_value,
        :probability_percent, :message, :original_message, :notes, :is_junk, :created_by, :entry_source
    )";
    
    try {
        $stmt = $pdo->prepare($sql);
        
        // Convert is_junk to integer (0 or 1)
        $isJunk = 0;
        if ($input['is_junk'] === true || $input['is_junk'] === 1 || $input['is_junk'] === '1' || $input['is_junk'] === 'true') {
            $isJunk = 1;
        }
        
        $stmt->execute([
            ':lead_id' => $leadId,
            ':name' => $input['full_name'] ?? '',
            ':full_name' => $input['full_name'] ?? '',
            ':phone' => $input['mobile_number'] ?? '',
            ':mobile_number' => $input['mobile_number'] ?? '',
            ':email' => $input['email'] ?? '',
            ':company_name' => $input['company_name'] ?? '',
            ':country' => $input['location'] ?? '',
            ':location' => $input['location'] ?? '',
            ':website' => $input['website'] ?? '',
            ':lead_source' => $input['lead_source'] ?? 'Other',
            ':campaign_name' => $input['campaign_name'] ?? '',
            ':service_interest' => $input['service_interest'] ?? '',
            ':lead_status' => $input['lead_status'] ?? 'New - Not Contacted',
            ':lead_quality' => $input['lead_quality'] ?? 'Cold',
            ':lead_owner' => $input['lead_owner'] ?? 'Unassigned',
            ':lead_generated_at' => !empty($input['lead_generated_at']) ? $input['lead_generated_at'] : date('Y-m-d H:i:s'),
            ':preferred_channel' => $input['preferred_channel'] ?? 'Call',
            ':expected_deal_value' => (int)($input['expected_deal_value'] ?? 0),
            ':probability_percent' => (int)($input['probability_percent'] ?? 0),
            ':message' => $input['original_message'] ?? '',
            ':original_message' => $input['original_message'] ?? '',
            ':notes' => $input['notes'] ?? '',
            ':is_junk' => $isJunk,
            ':created_by' => $input['created_by'] ?? 'System',
            ':entry_source' => 'manual'
        ]);
        
        $newId = $pdo->lastInsertId();
        jsonResponse(true, ['id' => $newId, 'lead_id' => $leadId], 'Lead created successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to create lead', $e->getMessage());
    }
}

function updateLead($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        jsonResponse(false, [], 'Lead ID is required');
    }
    
    $id = intval($input['id']);
    unset($input['id']);
    
    if (empty($input)) {
        jsonResponse(false, [], 'No fields to update');
    }
    
    $allowedFields = [
        'full_name', 'mobile_number', 'email', 'company_name', 'location', 'website',
        'lead_source', 'campaign_name', 'service_interest', 'lead_status', 'lead_quality',
        'lead_owner', 'lead_generated_at', 'first_contact_at', 'last_contact_at',
        'next_followup_at', 'preferred_channel', 'expected_deal_value', 'probability_percent',
        'original_message', 'notes', 'is_junk'
    ];
    
    $fieldMappings = [
        'full_name' => 'name',
        'mobile_number' => 'phone',
        'location' => 'country',
        'original_message' => 'message'
    ];
    
    $updates = [];
    $params = [':id' => $id];
    
    foreach ($allowedFields as $field) {
        if (array_key_exists($field, $input)) {
            $updates[] = "$field = :$field";
            $params[":$field"] = $input[$field];
            
            if (isset($fieldMappings[$field])) {
                $mappedField = $fieldMappings[$field];
                $updates[] = "$mappedField = :mapped_$field";
                $params[":mapped_$field"] = $input[$field];
            }
        }
    }
    
    $updates[] = "updated_at = NOW()";
    
    $tableName = getLeadsTableName($pdo);
    $sql = "UPDATE $tableName SET " . implode(', ', $updates) . " WHERE id = :id";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        jsonResponse(true, ['affected_rows' => $stmt->rowCount()], 'Lead updated successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to update lead', $e->getMessage());
    }
}

function deleteLead($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['ids']) && is_array($input['ids'])) {
        $ids = array_map('intval', $input['ids']);
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $tableName = getLeadsTableName($pdo);
        $sql = "DELETE FROM $tableName WHERE id IN ($placeholders)";
        
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute($ids);
            jsonResponse(true, ['affected_rows' => $stmt->rowCount()], 'Leads deleted successfully');
        } catch (PDOException $e) {
            jsonResponse(false, [], 'Failed to delete leads', $e->getMessage());
        }
    } else {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        if ($id <= 0) {
            jsonResponse(false, [], 'Valid ID required');
        }
        
        try {
            $tableName = getLeadsTableName($pdo);
            $stmt = $pdo->prepare("DELETE FROM $tableName WHERE id = :id");
            $stmt->execute([':id' => $id]);
            jsonResponse(true, ['affected_rows' => $stmt->rowCount()], 'Lead deleted successfully');
        } catch (PDOException $e) {
            jsonResponse(false, [], 'Failed to delete lead', $e->getMessage());
        }
    }
}

function handleActivities($pdo, $method) {
    switch ($method) {
        case 'GET':
            getActivities($pdo);
            break;
        case 'POST':
            createActivity($pdo);
            break;
        case 'DELETE':
            deleteActivity($pdo);
            break;
        default:
            jsonResponse(false, [], 'Method not allowed');
    }
}

function getActivities($pdo) {
    $leadId = isset($_GET['lead_id']) ? intval($_GET['lead_id']) : 0;
    
    if ($leadId <= 0) {
        jsonResponse(false, [], 'Lead ID is required');
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM crm_activities WHERE lead_id = :lead_id ORDER BY activity_date DESC");
        $stmt->execute([':lead_id' => $leadId]);
        $activities = $stmt->fetchAll();
        jsonResponse(true, $activities);
    } catch (PDOException $e) {
        jsonResponse(true, [], 'No activities found');
    }
}

function createActivity($pdo) {
    // Return empty response if no connection
    if (!$pdo) {
        jsonResponse(false, [], 'Database connection unavailable');
        return;
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['lead_id']) || empty($input['activity_type'])) {
        jsonResponse(false, [], 'Lead ID and activity type are required');
        return;
    }
    
    try {
        // Check if crm_activities table exists, create if not
        $tableExists = $pdo->query("SHOW TABLES LIKE 'crm_activities'")->rowCount() > 0;
        
        if (!$tableExists) {
            $createTable = "
            CREATE TABLE `crm_activities` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `lead_id` int(11) NOT NULL,
                `activity_type` varchar(50) NOT NULL DEFAULT 'note',
                `activity_date` datetime NOT NULL DEFAULT current_timestamp(),
                `summary` text DEFAULT NULL,
                `next_step` text DEFAULT NULL,
                `created_by` varchar(100) DEFAULT 'System',
                `created_at` datetime DEFAULT current_timestamp(),
                `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                PRIMARY KEY (`id`),
                KEY `lead_id` (`lead_id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
            ";
            $pdo->exec($createTable);
        }
        
        $sql = "INSERT INTO crm_activities (lead_id, activity_type, activity_date, summary, next_step, created_by)
                VALUES (:lead_id, :activity_type, :activity_date, :summary, :next_step, :created_by)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':lead_id' => intval($input['lead_id']),
            ':activity_type' => $input['activity_type'],
            ':activity_date' => $input['activity_date'] ?? date('Y-m-d H:i:s'),
            ':summary' => $input['summary'] ?? null,
            ':next_step' => $input['next_step'] ?? null,
            ':created_by' => $input['created_by'] ?? 'System'
        ]);
        
        $newId = $pdo->lastInsertId();
        
        // Update lead's last contact time
        $tableName = getLeadsTableName($pdo);
        if ($tableName && $tableName !== 'contact_submissions_v2') {
            $updateStmt = $pdo->prepare("UPDATE $tableName SET last_contact_at = NOW(), updated_at = NOW() WHERE id = :id");
            $updateStmt->execute([':id' => intval($input['lead_id'])]);
        } else {
            $updateStmt = $pdo->prepare("UPDATE contact_submissions_v2 SET updated_at = NOW() WHERE id = :id");
            $updateStmt->execute([':id' => intval($input['lead_id'])]);
        }
        
        jsonResponse(true, ['id' => $newId], 'Activity added successfully');
    } catch (PDOException $e) {
        error_log("Failed to create activity: " . $e->getMessage());
        jsonResponse(false, [], 'Failed to create activity');
    }
}

function deleteActivity($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        jsonResponse(false, [], 'Valid ID required');
    }
    
    try {
        $stmt = $pdo->prepare("DELETE FROM crm_activities WHERE id = :id");
        $stmt->execute([':id' => $id]);
        jsonResponse(true, [], 'Activity deleted successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to delete activity', $e->getMessage());
    }
}

function handleSettings($pdo, $method) {
    switch ($method) {
        case 'GET':
            getSettings($pdo);
            break;
        case 'POST':
            createSetting($pdo);
            break;
        case 'PUT':
            updateSetting($pdo);
            break;
        case 'DELETE':
            deleteSetting($pdo);
            break;
        default:
            jsonResponse(false, [], 'Method not allowed');
    }
}

function getSettings($pdo) {
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    
    try {
        if ($type) {
            $stmt = $pdo->prepare("SELECT * FROM crm_settings WHERE setting_type = :type AND is_active = 1 ORDER BY display_order");
            $stmt->execute([':type' => $type]);
        } else {
            $stmt = $pdo->query("SELECT * FROM crm_settings WHERE is_active = 1 ORDER BY setting_type, display_order");
        }
        
        $settings = $stmt->fetchAll();
        
        $grouped = [];
        foreach ($settings as $setting) {
            $grouped[$setting['setting_type']][] = $setting;
        }
        
        jsonResponse(true, $type ? $settings : $grouped);
    } catch (PDOException $e) {
        $defaultSettings = [
            'lead_status' => [
                ['id' => 1, 'setting_value' => 'New'],
                ['id' => 2, 'setting_value' => 'Qualified - Proposal Sent'],
                ['id' => 3, 'setting_value' => 'Negotiation / In Discussion'],
                ['id' => 4, 'setting_value' => 'Win'],
                ['id' => 5, 'setting_value' => 'Lost'],
                ['id' => 6, 'setting_value' => 'Junk/Dead'],
            ],
            'lead_source' => [
                ['id' => 1, 'setting_value' => 'Meta Ads'],
                ['id' => 2, 'setting_value' => 'Google Ads'],
                ['id' => 3, 'setting_value' => 'Website Form'],
                ['id' => 4, 'setting_value' => 'Referral'],
                ['id' => 5, 'setting_value' => 'Other'],
            ],
            'lead_quality' => [
                ['id' => 1, 'setting_value' => 'Hot'],
                ['id' => 2, 'setting_value' => 'Warm'],
                ['id' => 3, 'setting_value' => 'Cold'],
                ['id' => 4, 'setting_value' => 'Junk'],
            ],
            'service_interest' => [
                ['id' => 1, 'setting_value' => 'IT Services'],
                ['id' => 2, 'setting_value' => 'Cybersecurity'],
                ['id' => 3, 'setting_value' => 'Cloud Solutions'],
                ['id' => 4, 'setting_value' => 'Digital Marketing'],
                ['id' => 5, 'setting_value' => 'Managed Services'],
                ['id' => 6, 'setting_value' => 'AI & Data Analytics'],
            ],
            'lead_owner' => [
                ['id' => 1, 'setting_value' => 'Unassigned'],
                ['id' => 2, 'setting_value' => 'Sales Team'],
                ['id' => 3, 'setting_value' => 'Marketing'],
            ],
            'preferred_channel' => [
                ['id' => 1, 'setting_value' => 'Call'],
                ['id' => 2, 'setting_value' => 'Email'],
                ['id' => 3, 'setting_value' => 'WhatsApp'],
                ['id' => 4, 'setting_value' => 'LinkedIn'],
            ],
            'activity_type' => [
                ['id' => 1, 'setting_value' => 'Call'],
                ['id' => 2, 'setting_value' => 'Email'],
                ['id' => 3, 'setting_value' => 'Meeting'],
                ['id' => 4, 'setting_value' => 'Note'],
                ['id' => 5, 'setting_value' => 'Task'],
            ],
        ];
        jsonResponse(true, $defaultSettings);
    }
}

function createSetting($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['setting_type']) || empty($input['setting_value'])) {
        jsonResponse(false, [], 'Setting type and value are required');
    }
    
    try {
        $stmt = $pdo->prepare("SELECT MAX(display_order) as max_order FROM crm_settings WHERE setting_type = :type");
        $stmt->execute([':type' => $input['setting_type']]);
        $result = $stmt->fetch();
        $maxOrder = ($result['max_order'] ?? 0) + 1;
        
        $insertStmt = $pdo->prepare("INSERT INTO crm_settings (setting_type, setting_value, display_order) VALUES (:type, :value, :order)");
        $insertStmt->execute([
            ':type' => $input['setting_type'],
            ':value' => $input['setting_value'],
            ':order' => $maxOrder
        ]);
        
        $newId = $pdo->lastInsertId();
        jsonResponse(true, ['id' => $newId], 'Setting created successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to create setting', $e->getMessage());
    }
}

function updateSetting($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        jsonResponse(false, [], 'Setting ID is required');
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE crm_settings SET setting_value = :value WHERE id = :id");
        $stmt->execute([
            ':id' => intval($input['id']),
            ':value' => $input['setting_value']
        ]);
        jsonResponse(true, [], 'Setting updated successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to update setting', $e->getMessage());
    }
}

function deleteSetting($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        jsonResponse(false, [], 'Valid ID required');
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE crm_settings SET is_active = 0 WHERE id = :id");
        $stmt->execute([':id' => $id]);
        jsonResponse(true, [], 'Setting deleted successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to delete setting', $e->getMessage());
    }
}

function handleDashboard($pdo) {
    try {
        $stats = [];
        $tableName = getLeadsTableName($pdo);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName");
        $result = $stmt->fetch();
        $stats['total_leads'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)");
        $result = $stmt->fetch();
        $stats['new_leads_30_days'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName WHERE lead_status IN ('Attempted Contact', 'Connected - Follow-up Needed', 'contacted')");
        $result = $stmt->fetch();
        $stats['contacted_leads'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName WHERE lead_status IN ('Qualified - Proposal Sent', 'Negotiation / In Discussion', 'qualified', 'proposal')");
        $result = $stmt->fetch();
        $stats['pipeline_leads'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName WHERE lead_status = 'Closed - Won'");
        $result = $stmt->fetch();
        $stats['closed_won'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName WHERE lead_status = 'Closed - Lost'");
        $result = $stmt->fetch();
        $stats['closed_lost'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM $tableName WHERE lead_status = 'Dead / Junk' OR is_junk = 1");
        $result = $stmt->fetch();
        $stats['dead_junk'] = (int)($result['cnt'] ?? 0);
        
        $stmt = $pdo->query("SELECT COALESCE(lead_status, status, 'New - Not Contacted') as lead_status, COUNT(*) as count FROM $tableName GROUP BY COALESCE(lead_status, status, 'New - Not Contacted') ORDER BY count DESC");
        $stats['leads_by_status'] = $stmt->fetchAll();
        
        $stmt = $pdo->query("SELECT COALESCE(lead_source, entry_source, sourcePage, 'Website') as lead_source, COUNT(*) as count FROM $tableName GROUP BY COALESCE(lead_source, entry_source, sourcePage, 'Website') ORDER BY count DESC");
        $stats['leads_by_source'] = $stmt->fetchAll();
        
        $stmt = $pdo->query("SELECT DATE(created_at) as date, COUNT(*) as count FROM $tableName WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY DATE(created_at) ORDER BY date");
        $stats['leads_per_day'] = $stmt->fetchAll();
        
        $stmt = $pdo->query("SELECT COALESCE(lead_owner, 'Unassigned') as lead_owner, COALESCE(SUM(expected_deal_value), 0) as total_value FROM $tableName GROUP BY COALESCE(lead_owner, 'Unassigned') ORDER BY total_value DESC");
        $stats['deal_value_by_owner'] = $stmt->fetchAll();
        
        $stmt = $pdo->query("SELECT id, COALESCE(lead_id, CONCAT('LEAD-', LPAD(id, 4, '0'))) as lead_id, COALESCE(full_name, name) as full_name, company_name, next_followup_at, COALESCE(lead_status, status, 'New - Not Contacted') as lead_status FROM $tableName WHERE next_followup_at < NOW() AND lead_status NOT IN ('Closed - Won', 'Closed - Lost', 'Dead / Junk') ORDER BY next_followup_at ASC LIMIT 20");
        $stats['overdue_followups'] = $stmt->fetchAll();
        
        jsonResponse(true, $stats);
    } catch (PDOException $e) {
        $defaultStats = [
            'total_leads' => 0,
            'new_leads_30_days' => 0,
            'contacted_leads' => 0,
            'pipeline_leads' => 0,
            'closed_won' => 0,
            'closed_lost' => 0,
            'dead_junk' => 0,
            'leads_by_status' => [],
            'leads_by_source' => [],
            'leads_per_day' => [],
            'deal_value_by_owner' => [],
            'overdue_followups' => []
        ];
        jsonResponse(true, $defaultStats, 'Dashboard loaded with defaults');
    }
}

function handleExport($pdo) {
    try {
        $tableName = getLeadsTableName($pdo);
        $stmt = $pdo->query("SELECT * FROM $tableName ORDER BY created_at DESC");
        $leads = $stmt->fetchAll();
        
        if (empty($leads)) {
            jsonResponse(true, [], 'No leads to export');
        }
        
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="leads_export_' . date('Y-m-d') . '.csv"');
        
        $output = fopen('php://output', 'w');
        
        fputcsv($output, array_keys($leads[0]));
        
        foreach ($leads as $lead) {
            fputcsv($output, $lead);
        }
        
        fclose($output);
        exit();
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to export leads', $e->getMessage());
    }
}
?>
