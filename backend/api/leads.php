<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['status' => 'preflight']));
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
        error_log("MySQL connection failed: " . $e->getMessage());
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
    echo json_encode($response);
    exit();
}

function convertToCsvUrl($url) {
    $url = trim($url);
    
    // If already a CSV export URL, return as-is
    if (strpos($url, '/export?format=csv') !== false) {
        return $url;
    }
    
    $patterns = [
        '/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/',
        '/\/d\/([a-zA-Z0-9-_]+)\//',
        '/key=([a-zA-Z0-9-_]+)/'
    ];
    
    $spreadsheetId = null;
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $url, $matches)) {
            $spreadsheetId = $matches[1];
            break;
        }
    }
    
    if (!$spreadsheetId) {
        return null;
    }
    
    // Use gid=0 for first sheet, without the &id parameter which can cause issues
    return "https://docs.google.com/spreadsheets/d/{$spreadsheetId}/export?format=csv&gid=0";
}

function parseCSV($csvContent) {
    // Use PHP's memory stream with fgetcsv for proper CSV parsing
    $handle = fopen('php://memory', 'r+');
    fwrite($handle, $csvContent);
    rewind($handle);
    
    $headers = [];
    $rows = [];
    $lineNum = 0;
    
    while (($data = fgetcsv($handle)) !== false) {
        $lineNum++;
        
        // Skip completely empty rows (all cells are empty)
        $rowHasData = false;
        foreach ($data as $cell) {
            if (!empty(trim($cell))) {
                $rowHasData = true;
                break;
            }
        }
        if (!$rowHasData) continue;
        
        // First data row = header
        if (empty($headers)) {
            $headers = array_map(function($h) {
                return strtolower(trim(preg_replace('/[^a-zA-Z0-9_]/', '_', $h)));
            }, $data);
            continue;
        }
        
        // Build data row
        $row = [];
        foreach ($headers as $i => $header) {
            $row[$header] = isset($data[$i]) ? trim($data[$i]) : '';
        }
        $rows[] = $row;
    }
    
    fclose($handle);
    return $rows;
}

// Function to clean phone numbers - remove p:, +, and any unwanted prefixes
function cleanPhoneNumber($phone) {
    if (empty($phone)) return '';
    // Remove p:, p:+, and similar prefixes, then trim
    return preg_replace('/^(p\s*:?\s*\+?|\+?)/i', '', trim($phone));
}

// Function to check if email or phone already exists
function checkDuplicateLead($pdo, $email, $phone) {
    $cleanPhone = cleanPhoneNumber($phone);
    $email = strtolower(trim($email));
    
    // Check for duplicate email
    if (!empty($email)) {
        $stmt = $pdo->prepare("SELECT id FROM contact_submissions_v2 WHERE LOWER(email) = ? LIMIT 1");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            return ['duplicate' => true, 'field' => 'email', 'value' => $email];
        }
    }
    
    // Check for duplicate phone
    if (!empty($cleanPhone)) {
        $stmt = $pdo->prepare("SELECT id FROM contact_submissions_v2 WHERE 
            (phone = ? OR mobile_number = ? OR 
             REPLACE(REPLACE(REPLACE(phone, 'p:', ''), '+', ''), ' ', '') = ? OR 
             REPLACE(REPLACE(REPLACE(mobile_number, 'p:', ''), '+', ''), ' ', '') = ?) LIMIT 1");
        $stmt->execute([$cleanPhone, $cleanPhone, $cleanPhone, $cleanPhone]);
        if ($stmt->fetch()) {
            return ['duplicate' => true, 'field' => 'phone', 'value' => $cleanPhone];
        }
    }
    
    return ['duplicate' => false];
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    
    if ($action === 'spreadsheets') {
        handleSpreadsheets($method);
    } elseif ($action === 'import' || $action === 'spreadsheet_import') {
        handleSpreadsheetImport();
    } else {
        handleLeads($method);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    jsonResponse(false, [], 'Internal server error', $e->getMessage());
}

function handleLeads($method) {
    $pdo = getConnection();
    
    switch ($method) {
        case 'GET':
            handleGetLeads($pdo);
            break;
        case 'POST':
            if (!$pdo) {
                jsonResponse(false, [], 'Service temporarily unavailable');
                return;
            }
            handlePostLead($pdo);
            break;
        case 'PUT':
            if (!$pdo) {
                jsonResponse(false, [], 'Service temporarily unavailable');
                return;
            }
            handlePutLead($pdo);
            break;
        case 'DELETE':
            if (!$pdo) {
                jsonResponse(false, [], 'Service temporarily unavailable');
                return;
            }
            handleDeleteLead($pdo);
            break;
        default:
            jsonResponse(false, [], 'Method not allowed', 'Invalid HTTP method');
    }
}

function handleSpreadsheets($method) {
    $pdo = getConnection();
    if (!$pdo) {
        jsonResponse(false, [], 'Database connection failed', 'Database error');
    }
    
    switch ($method) {
        case 'GET':
            handleGetSpreadsheets($pdo);
            break;
        case 'POST':
            handlePostSpreadsheet($pdo);
            break;
        case 'PUT':
            handlePutSpreadsheet($pdo);
            break;
        case 'DELETE':
            handleDeleteSpreadsheet($pdo);
            break;
        default:
            jsonResponse(false, [], 'Method not allowed', 'Invalid HTTP method');
    }
}

function handleSpreadsheetImport() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['url'])) {
        jsonResponse(false, [], 'Spreadsheet URL is required', 'Validation error');
    }
    
    $url = trim($input['url']);
    $spreadsheetName = trim($input['name'] ?? 'Unknown Spreadsheet');
    
    $csvUrl = convertToCsvUrl($url);
    if (!$csvUrl) {
        jsonResponse(false, [], 'Invalid Google Sheets URL', 'Validation error');
    }
    
    try {
        // Use curl for better redirect handling and reliability
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $csvUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        ]);
        
        $csvContent = curl_exec($ch);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($csvContent === false || !empty($curlError)) {
            throw new Exception("Failed to fetch spreadsheet: " . ($curlError ?: "Unknown error"));
        }
        
        if (trim($csvContent) === '' || strpos($csvContent, '<HTML>') !== false || strpos($csvContent, '<html>') !== false) {
            throw new Exception('Spreadsheet is empty or not accessible. Please ensure it is shared with "Anyone with the link" permission.');
        }
        
        $rows = parseCSV($csvContent);
        
        error_log("DEBUG: parseCSV returned " . count($rows) . " rows");
        if (count($rows) > 0) {
            $firstRow = reset($rows);
            error_log("DEBUG: First row keys: " . implode(", ", array_keys($firstRow)));
            error_log("DEBUG: First row values: " . json_encode($firstRow));
        }
        
        if (count($rows) === 0) {
            error_log("DEBUG: CSV Content length: " . strlen($csvContent));
            error_log("DEBUG: CSV Content preview: " . substr($csvContent, 0, 500));
            throw new Exception('No valid data found in spreadsheet. Ensure your sheet has a header row and at least one data row with name and email.');
        }
        
        $pdo = getConnection();
        if (!$pdo) {
            jsonResponse(false, [], 'Database connection failed', 'Database error');
        }
        
        $successCount = 0;
        $failedCount = 0;
        $duplicateCount = 0;
        $errors = [];
        
        $insertSql = "INSERT INTO contact_submissions_v2 (full_name, name, company_name, phone, mobile_number, email, lead_source, entry_source, message, original_message, notes, lead_status, status) 
                      VALUES (:full_name, :name, :company_name, :phone, :mobile_number, :email, :lead_source, :entry_source, :message, :original_message, :notes, :lead_status, :status)";
        $insertStmt = $pdo->prepare($insertSql);
        
        foreach ($rows as $index => $row) {
            // Support multiple column name variations
            $fullName = $row['full_name'] ?? $row['name'] ?? $row['fullname'] ?? $row['full_name'] ?? '';
            $fullName = trim($fullName);
            // Treat "-" as empty
            if ($fullName === '-' || $fullName === 'N/A' || $fullName === 'NA' || $fullName === 'n/a') {
                $fullName = '';
            }
            
            $email = strtolower(trim($row['email'] ?? ''));
            // Treat "-" as empty
            if ($email === '-' || $email === 'n/a' || $email === 'na' || strpos($email, '@') === false) {
                $email = '';
            }
            
            // Try multiple phone column names
            $phone = $row['phone'] ?? $row['phone_number'] ?? $row['mobile_number'] ?? $row['mobile'] ?? '';
            $phone = cleanPhoneNumber($phone);
            
            // Try multiple company column names
            $company = $row['company'] ?? $row['company_name'] ?? $row['organization'] ?? $row['designation'] ?? '';
            $company = trim($company);
            if ($company === '-' || $company === 'N/A' || $company === 'NA') {
                $company = '';
            }
            
            // Try multiple service interest column names
            $message = $row['questions'] ?? $row['message'] ?? $row['what_service_do_you_need_help_with'] ?? $row['services'] ?? '';
            
            if (!empty($fullName) || !empty($email)) {
                // Check for duplicates
                $duplicateCheck = checkDuplicateLead($pdo, $email, $phone);
                if ($duplicateCheck['duplicate']) {
                    $duplicateCount++;
                    $errors[] = "Row {$index}: Duplicate {$duplicateCheck['field']} - {$duplicateCheck['value']}";
                    continue;
                }
                
                try {
                    $insertStmt->execute([
                        ':full_name' => $fullName,
                        ':name' => $fullName,
                        ':company_name' => $company,
                        ':phone' => $phone,
                        ':mobile_number' => $phone,
                        ':email' => $email,
                        ':lead_source' => $row['source'] ?? $row['lead_source'] ?? 'Spreadsheet Import',
                        ':entry_source' => 'spreadsheet_import',
                        ':message' => $message,
                        ':original_message' => $message,
                        ':notes' => "Imported from: {$spreadsheetName}",
                        ':lead_status' => $row['lead_status'] ?? $row['current_status'] ?? 'New - Not Contacted',
                        ':status' => 'New'
                    ]);
                    $successCount++;
                } catch (PDOException $e) {
                    $failedCount++;
                    $errors[] = "Row {$index}: " . $e->getMessage();
                }
            } else {
                $failedCount++;
                $errors[] = "Row {$index}: Missing name or email";
            }
        }
        
        if ($successCount === 0 && $duplicateCount > 0) {
            // All rows were duplicates
            jsonResponse(true, [
                'success' => $successCount,
                'failed' => $failedCount,
                'duplicates' => $duplicateCount,
                'total' => count($rows),
                'errors' => array_slice($errors, 0, 10)
            ], "Import completed. All {$duplicateCount} rows were already in database. No new records added.");
        } else {
            jsonResponse(true, [
                'success' => $successCount,
                'failed' => $failedCount,
                'duplicates' => $duplicateCount,
                'total' => count($rows),
                'errors' => array_slice($errors, 0, 10)
            ], "Import completed. Success: {$successCount}, Failed: {$failedCount}, Duplicates: {$duplicateCount}");
        }
        
    } catch (Exception $e) {
        jsonResponse(false, [], 'Import failed', $e->getMessage());
    }
}

function handleGetLeads($pdo) {
    // Check connection
    if (!$pdo) {
        error_log("Database connection failed in handleGetLeads");
        jsonResponse(false, [], 'Database connection failed', 'Unable to connect to database');
        return;
    }
    
    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $status = isset($_GET['status']) ? trim($_GET['status']) : '';
    $source = isset($_GET['source']) ? trim($_GET['source']) : '';
    
    // Use contact_submissions_v2 table with correct field mapping
    $sql = "SELECT 
        id, 
        COALESCE(lead_status, status, 'New - Not Contacted') as lead_status, 
        COALESCE(full_name, name, '') as full_name, 
        COALESCE(company_name, '') as company_name, 
        COALESCE(phone, mobile_number, '') as phone, 
        COALESCE(email, '') as email, 
        COALESCE(lead_source, entry_source, 'Website') as lead_source, 
        created_at, 
        COALESCE(message, original_message, '') as message, 
        COALESCE(notes, '') as notes, 
        updated_at,
        mobile_number,
        country,
        location
    FROM contact_submissions_v2 WHERE 1=1";
    $params = [];
    
    if (!empty($search)) {
        $sql .= " AND (full_name LIKE :search OR name LIKE :search1 OR email LIKE :search2 OR phone LIKE :search3 OR mobile_number LIKE :search4 OR company_name LIKE :search5)";
        $searchTerm = "%$search%";
        $params[':search'] = $searchTerm;
        $params[':search1'] = $searchTerm;
        $params[':search2'] = $searchTerm;
        $params[':search3'] = $searchTerm;
        $params[':search4'] = $searchTerm;
        $params[':search5'] = $searchTerm;
    }
    
    if (!empty($status) && $status !== 'all') {
        $sql .= " AND (lead_status = :status OR status = :status2)";
        $params[':status'] = $status;
        $params[':status2'] = $status;
    }
    
    if (!empty($source) && $source !== 'all') {
        $sql .= " AND (lead_source = :source OR entry_source = :source2)";
        $params[':source'] = $source;
        $params[':source2'] = $source;
    }
    
    $sql .= " ORDER BY created_at DESC LIMIT 1000";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $leads = $stmt->fetchAll();
        
        error_log("Successfully fetched " . count($leads) . " leads from database");
        jsonResponse(true, $leads, count($leads) . ' leads found');
        
    } catch (PDOException $e) {
        error_log("Database error in handleGetLeads: " . $e->getMessage());
        jsonResponse(false, [], 'Database query failed: ' . $e->getMessage());
    }
}

function handlePostLead($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['full_name']) && empty($input['email'])) {
        jsonResponse(false, [], 'Name or email is required', 'Validation error');
    }
    
    $fullName = trim($input['full_name'] ?? $input['name'] ?? '');
    $phone = cleanPhoneNumber(trim($input['phone'] ?? $input['mobile_number'] ?? ''));
    $email = strtolower(trim($input['email'] ?? ''));
    
    // Check for duplicates
    $duplicateCheck = checkDuplicateLead($pdo, $email, $phone);
    if ($duplicateCheck['duplicate']) {
        jsonResponse(false, [], "Lead with this {$duplicateCheck['field']} already exists: {$duplicateCheck['value']}", 'Duplicate error');
    }
    
    $sql = "INSERT INTO contact_submissions_v2 (name, full_name, phone, mobile_number, email, company_name, lead_source, message, original_message, notes, lead_status, status, entry_source, country, location) 
            VALUES (:name, :full_name, :phone, :mobile_number, :email, :company_name, :lead_source, :message, :original_message, :notes, :lead_status, :status, :entry_source, :country, :location)";
    
    try {
        $stmt = $pdo->prepare($sql);
        $message = trim($input['message'] ?? $input['questions'] ?? '');
        $status = trim($input['lead_status'] ?? $input['status'] ?? 'New - Not Contacted');
        
        $stmt->execute([
            ':name' => $fullName,
            ':full_name' => $fullName,
            ':phone' => $phone,
            ':mobile_number' => $phone,
            ':email' => $email,
            ':company_name' => trim($input['company_name'] ?? $input['company'] ?? ''),
            ':lead_source' => trim($input['lead_source'] ?? $input['source'] ?? 'Website'),
            ':message' => $message,
            ':original_message' => $message,
            ':notes' => trim($input['notes'] ?? $input['note'] ?? ''),
            ':lead_status' => $status,
            ':status' => $status,
            ':entry_source' => 'manual',
            ':country' => trim($input['country'] ?? $input['location'] ?? ''),
            ':location' => trim($input['location'] ?? $input['country'] ?? '')
        ]);
        
        $newId = $pdo->lastInsertId();
        jsonResponse(true, ['id' => $newId], 'Lead created successfully');
        
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to create lead', $e->getMessage());
    }
}

function handlePutLead($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        jsonResponse(false, [], 'ID is required', 'Validation error');
    }
    
    $id = intval($input['id']);
    
    $updateFields = [];
    $params = [':id' => $id];
    
    // Map frontend field names to database field names and handle dual fields
    $updateData = [];
    
    if (isset($input['full_name'])) {
        $updateFields[] = "full_name = :full_name";
        $updateFields[] = "name = :name";
        $params[':full_name'] = trim($input['full_name']);
        $params[':name'] = trim($input['full_name']);
    }
    
    if (isset($input['company']) || isset($input['company_name'])) {
        $company = trim($input['company_name'] ?? $input['company'] ?? '');
        $updateFields[] = "company_name = :company_name";
        $params[':company_name'] = $company;
    }
    
    if (isset($input['phone'])) {
        $updateFields[] = "phone = :phone";
        $updateFields[] = "mobile_number = :mobile_number";
        $params[':phone'] = trim($input['phone']);
        $params[':mobile_number'] = trim($input['phone']);
    }
    
    if (isset($input['email'])) {
        $updateFields[] = "email = :email";
        $params[':email'] = trim($input['email']);
    }
    
    if (isset($input['source']) || isset($input['lead_source'])) {
        $source = trim($input['lead_source'] ?? $input['source'] ?? 'Website');
        $updateFields[] = "lead_source = :lead_source";
        $updateFields[] = "entry_source = :entry_source";
        $params[':lead_source'] = $source;
        $params[':entry_source'] = $source;
    }
    
    if (isset($input['questions']) || isset($input['message'])) {
        $message = trim($input['message'] ?? $input['questions'] ?? '');
        $updateFields[] = "message = :message";
        $updateFields[] = "original_message = :original_message";
        $params[':message'] = $message;
        $params[':original_message'] = $message;
    }
    
    if (isset($input['note']) || isset($input['notes'])) {
        $notes = trim($input['notes'] ?? $input['note'] ?? '');
        $updateFields[] = "notes = :notes";
        $params[':notes'] = $notes;
    }
    
    if (isset($input['status']) || isset($input['lead_status'])) {
        $status = trim($input['lead_status'] ?? $input['status'] ?? 'New - Not Contacted');
        $updateFields[] = "lead_status = :lead_status";
        $updateFields[] = "status = :status";
        $params[':lead_status'] = $status;
        $params[':status'] = $status;
    }
    
    if (isset($input['location']) || isset($input['country'])) {
        $location = trim($input['location'] ?? $input['country'] ?? '');
        $updateFields[] = "location = :location";
        $updateFields[] = "country = :country";
        $params[':location'] = $location;
        $params[':country'] = $location;
    }
    
    if (empty($updateFields)) {
        jsonResponse(false, [], 'No fields to update', 'Validation error');
    }
    
    $updateFields[] = "updated_at = CURRENT_TIMESTAMP";
    $setClause = implode(', ', $updateFields);
    $sql = "UPDATE contact_submissions_v2 SET $setClause WHERE id = :id";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        jsonResponse(true, ['affected_rows' => $stmt->rowCount()], 'Lead updated successfully');
        
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to update lead', $e->getMessage());
    }
}

function handleDeleteLead($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['ids']) && is_array($input['ids'])) {
        $ids = array_map('intval', $input['ids']);
        $ids = array_filter($ids, function($id) { return $id > 0; });
        
        if (empty($ids)) {
            jsonResponse(false, [], 'Valid IDs required', 'Validation error');
        }
        
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $sql = "DELETE FROM contact_submissions_v2 WHERE id IN ($placeholders)";
        
        try {
            $stmt = $pdo->prepare($sql);
            $stmt->execute($ids);
            jsonResponse(true, ['deleted' => $stmt->rowCount()], 'Leads deleted successfully');
        } catch (PDOException $e) {
            jsonResponse(false, [], 'Failed to delete leads', $e->getMessage());
        }
    } else {
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        
        if ($id <= 0) {
            jsonResponse(false, [], 'Valid ID required', 'Validation error');
        }
        
        try {
            $stmt = $pdo->prepare("DELETE FROM contact_submissions_v2 WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(true, ['deleted' => $stmt->rowCount()], 'Lead deleted successfully');
        } catch (PDOException $e) {
            jsonResponse(false, [], 'Failed to delete lead', $e->getMessage());
        }
    }
}

function handleGetSpreadsheets($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM spreadsheet_configs ORDER BY created_at DESC");
        $spreadsheets = $stmt->fetchAll();
        jsonResponse(true, $spreadsheets);
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to get spreadsheets', $e->getMessage());
    }
}

function handlePostSpreadsheet($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['name']) || empty($input['url'])) {
        jsonResponse(false, [], 'Name and URL are required', 'Validation error');
    }
    
    $sql = "INSERT INTO spreadsheet_configs (name, url, is_active, sync_interval, auto_sync) 
            VALUES (:name, :url, :is_active, :sync_interval, :auto_sync)";
    
    try {
        $stmt = $pdo->prepare($sql);
        
        // Convert booleans to integers (0 or 1)
        $isActive = isset($input['is_active']) ? (int)(bool)$input['is_active'] : 1;
        $autoSync = isset($input['auto_sync']) && ($input['auto_sync'] === true || $input['auto_sync'] === 1 || $input['auto_sync'] === '1') ? 1 : 0;
        
        $stmt->execute([
            ':name' => trim($input['name']),
            ':url' => trim($input['url']),
            ':is_active' => $isActive,
            ':sync_interval' => intval($input['sync_interval'] ?? 3600),
            ':auto_sync' => $autoSync
        ]);
        
        $newId = $pdo->lastInsertId();
        
        $stmt = $pdo->prepare("SELECT * FROM spreadsheet_configs WHERE id = ?");
        $stmt->execute([$newId]);
        $spreadsheet = $stmt->fetch();
        
        jsonResponse(true, $spreadsheet, 'Spreadsheet added successfully');
        
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to add spreadsheet', $e->getMessage());
    }
}

function handlePutSpreadsheet($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        jsonResponse(false, [], 'ID is required', 'Validation error');
    }
    
    $id = intval($input['id']);
    $updateFields = [];
    $params = [':id' => $id];
    
    $allowedFields = ['name', 'url', 'is_active', 'sync_interval', 'auto_sync', 'last_synced'];
    
    foreach ($allowedFields as $field) {
        if (isset($input[$field])) {
            $updateFields[] = "$field = :$field";
            if ($field === 'is_active') {
                $params[":$field"] = (int)(bool)$input[$field];
            } elseif ($field === 'auto_sync') {
                $params[":$field"] = ($input[$field] === true || $input[$field] === 1 || $input[$field] === '1') ? 1 : 0;
            } elseif ($field === 'sync_interval') {
                $params[":$field"] = intval($input[$field]);
            } else {
                $params[":$field"] = trim($input[$field]);
            }
        }
    }
    
    if (empty($updateFields)) {
        jsonResponse(false, [], 'No fields to update', 'Validation error');
    }
    
    $updateFields[] = "updated_at = CURRENT_TIMESTAMP";
    $setClause = implode(', ', $updateFields);
    $sql = "UPDATE spreadsheet_configs SET $setClause WHERE id = :id";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        $stmt = $pdo->prepare("SELECT * FROM spreadsheet_configs WHERE id = ?");
        $stmt->execute([$id]);
        $spreadsheet = $stmt->fetch();
        
        jsonResponse(true, $spreadsheet, 'Spreadsheet updated successfully');
        
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to update spreadsheet', $e->getMessage());
    }
}

function handleDeleteSpreadsheet($pdo) {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    
    if ($id <= 0) {
        jsonResponse(false, [], 'Valid ID required', 'Validation error');
    }
    
    try {
        $stmt = $pdo->prepare("DELETE FROM spreadsheet_configs WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(true, ['deleted' => $stmt->rowCount()], 'Spreadsheet deleted successfully');
    } catch (PDOException $e) {
        jsonResponse(false, [], 'Failed to delete spreadsheet', $e->getMessage());
    }
}
?>
