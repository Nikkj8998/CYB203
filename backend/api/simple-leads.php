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
    $host = '82.25.105.94';
    $dbname = 'cybaemtech_CYB_db';
    $user = 'cybaemtech_CYB_db';
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
        
        return $pdo;
        
    } catch (PDOException $e) {
        error_log("MySQL connection failed: " . $e->getMessage());
        return null;
    }
}

function jsonResponse($success, $data = [], $message = '') {
    $response = ['success' => $success, 'data' => $data];
    if ($message) $response['message'] = $message;
    echo json_encode($response);
    exit();
}

try {
    $pdo = getConnection();
    
    if (!$pdo) {
        jsonResponse(true, [], '0 leads found');
    }
    
    // Get only the required fields with proper mapping
    $sql = "SELECT 
        id,
        COALESCE(lead_status, status, 'New - Not Contacted') as status,
        COALESCE(full_name, name, '') as full_name,
        COALESCE(company_name, '') as company,
        COALESCE(phone, mobile_number, '') as phone,
        COALESCE(email, '') as email,
        COALESCE(lead_source, entry_source, 'Website') as source,
        DATE(created_at) as created_at,
        COALESCE(message, original_message, '') as questions,
        COALESCE(notes, '') as note
    FROM contact_submissions_v2 
    WHERE is_junk = 0 OR is_junk IS NULL
    ORDER BY created_at DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $leads = $stmt->fetchAll();
    
    // Format the data for frontend
    $formattedLeads = [];
    foreach ($leads as $lead) {
        $formattedLeads[] = [
            'id' => $lead['id'],
            'status' => $lead['status'],
            'full_name' => $lead['full_name'],
            'company' => $lead['company'],
            'phone' => $lead['phone'],
            'email' => $lead['email'],
            'source' => $lead['source'],
            'created_at' => $lead['created_at'],
            'questions' => $lead['questions'],
            'note' => $lead['note']
        ];
    }
    
    jsonResponse(true, $formattedLeads, count($formattedLeads) . ' leads found');
    
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    jsonResponse(true, [], '0 leads found');
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
    jsonResponse(true, [], '0 leads found');
}
?>