<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['status' => 'preflight']));
}

function testConnection() {
    $host = '82.25.105.94';
    $user = 'cybaemtech_CYB_db';
    $password = 'Cybaem@2025';
    $port = '3306';
    
    // Try different database names
    $possibleDatabases = [
        'cybaemtech_CYB_db',
        'cybaemtech_contact_form_v2', 
        'cybaemtech_CYB',
        'cybaemtech'
    ];
    
    $results = [];
    
    foreach ($possibleDatabases as $dbname) {
        try {
            $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
            $pdo = new PDO($dsn, $user, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 30
            ]);
            
            // Test basic connection
            $testQuery = $pdo->query("SELECT 1 as test");
            $testResult = $testQuery->fetch();
            
            // Get all tables in this database
            $tablesQuery = $pdo->query("SHOW TABLES");
            $tables = $tablesQuery->fetchAll(PDO::FETCH_COLUMN);
            
            $result = [
                'database' => $dbname,
                'success' => true,
                'connection' => 'successful',
                'test_query' => $testResult,
                'available_tables' => $tables
            ];
            
            // Check for contact/leads related tables
            $leadsTables = [];
            foreach ($tables as $table) {
                if (stripos($table, 'contact') !== false || 
                    stripos($table, 'lead') !== false || 
                    stripos($table, 'submission') !== false) {
                    $leadsTables[] = $table;
                    
                    // Get table structure
                    try {
                        $structure = $pdo->query("DESCRIBE `$table`");
                        $columns = $structure->fetchAll();
                        $result['table_structures'][$table] = $columns;
                        
                        // Get row count
                        $countQuery = $pdo->query("SELECT COUNT(*) as total FROM `$table`");
                        $count = $countQuery->fetch();
                        $result['table_counts'][$table] = $count['total'];
                        
                        // Get sample record if available
                        if ($count['total'] > 0) {
                            $sampleQuery = $pdo->query("SELECT * FROM `$table` LIMIT 1");
                            $sample = $sampleQuery->fetch();
                            $result['sample_records'][$table] = $sample;
                        }
                    } catch (Exception $e) {
                        $result['table_errors'][$table] = $e->getMessage();
                    }
                }
            }
            
            $result['leads_tables'] = $leadsTables;
            $results[] = $result;
            
        } catch (PDOException $e) {
            $results[] = [
                'database' => $dbname,
                'success' => false,
                'error' => $e->getMessage(),
                'error_code' => $e->getCode()
            ];
        }
    }
    
    return $results;
}

echo json_encode(testConnection(), JSON_PRETTY_PRINT);
?>