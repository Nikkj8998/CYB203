<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['status' => 'preflight']));
}

function exploreDatabase() {
    $host = '82.25.105.94';
    $dbname = 'cybaemtech_CYB_db'; // The database we have access to
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
        
        // Get all tables
        $tablesQuery = $pdo->query("SHOW TABLES");
        $tables = $tablesQuery->fetchAll(PDO::FETCH_COLUMN);
        
        $result = [
            'success' => true,
            'database' => $dbname,
            'all_tables' => $tables,
            'table_details' => []
        ];
        
        // Check each table for potential contact/lead data
        foreach ($tables as $table) {
            try {
                // Get table structure
                $structure = $pdo->query("DESCRIBE `$table`");
                $columns = $structure->fetchAll();
                
                // Get row count
                $countQuery = $pdo->query("SELECT COUNT(*) as total FROM `$table`");
                $count = $countQuery->fetch();
                
                $tableInfo = [
                    'name' => $table,
                    'columns' => array_column($columns, 'Field'),
                    'row_count' => $count['total'],
                    'column_details' => $columns
                ];
                
                // Check if this table might contain contact data
                $contactFields = ['email', 'name', 'phone', 'contact', 'message', 'submission'];
                $hasContactFields = false;
                foreach ($contactFields as $field) {
                    foreach ($columns as $column) {
                        if (stripos($column['Field'], $field) !== false) {
                            $hasContactFields = true;
                            break 2;
                        }
                    }
                }
                
                $tableInfo['might_be_contacts'] = $hasContactFields;
                
                // If it looks like contacts and has data, get sample
                if ($hasContactFields && $count['total'] > 0) {
                    $sampleQuery = $pdo->query("SELECT * FROM `$table` LIMIT 3");
                    $samples = $sampleQuery->fetchAll();
                    $tableInfo['sample_data'] = $samples;
                }
                
                $result['table_details'][] = $tableInfo;
                
            } catch (Exception $e) {
                $result['table_details'][] = [
                    'name' => $table,
                    'error' => $e->getMessage()
                ];
            }
        }
        
        return $result;
        
    } catch (PDOException $e) {
        return [
            'success' => false,
            'error' => $e->getMessage(),
            'error_code' => $e->getCode()
        ];
    }
}

echo json_encode(exploreDatabase(), JSON_PRETTY_PRINT);
?>