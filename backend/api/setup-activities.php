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
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

function checkAndCreateTables() {
    $pdo = getConnection();
    if (!is_object($pdo)) {
        return $pdo; // Return error array
    }
    
    try {
        // Check if crm_activities table exists
        $activitiesExists = $pdo->query("SHOW TABLES LIKE 'crm_activities'")->rowCount() > 0;
        
        if (!$activitiesExists) {
            // Create crm_activities table
            $createActivitiesTable = "
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
            
            $pdo->exec($createActivitiesTable);
        }
        
        return [
            'success' => true,
            'activities_table_exists' => $activitiesExists,
            'activities_table_created' => !$activitiesExists
        ];
        
    } catch (PDOException $e) {
        return [
            'success' => false,
            'error' => $e->getMessage()
        ];
    }
}

echo json_encode(checkAndCreateTables(), JSON_PRETTY_PRINT);
?>