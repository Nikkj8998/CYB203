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
        
        return $pdo;
        
    } catch (PDOException $e) {
        error_log("MySQL connection failed: " . $e->getMessage());
        return null;
    }
}

function createContactTable($pdo) {
    try {
        $sql = "CREATE TABLE IF NOT EXISTS `contact_submissions_v2` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `name` varchar(255) NOT NULL,
            `email` varchar(255) NOT NULL,
            `phone` varchar(50) NOT NULL,
            `country` varchar(255) DEFAULT NULL,
            `message` text DEFAULT NULL,
            `sourcePage` varchar(255) DEFAULT NULL,
            `selectedPlan` varchar(100) DEFAULT NULL,
            `created_at` timestamp NULL DEFAULT current_timestamp(),
            `status` varchar(20) DEFAULT 'new',
            `entry_source` varchar(20) DEFAULT 'contact_form',
            `notes` text DEFAULT NULL,
            `lead_id` varchar(50) DEFAULT NULL,
            `full_name` varchar(255) DEFAULT NULL,
            `mobile_number` varchar(50) DEFAULT NULL,
            `company_name` varchar(255) DEFAULT NULL,
            `location` varchar(255) DEFAULT NULL,
            `website` varchar(500) DEFAULT NULL,
            `lead_source` varchar(100) DEFAULT 'Website',
            `campaign_name` varchar(255) DEFAULT NULL,
            `service_interest` varchar(255) DEFAULT NULL,
            `lead_status` varchar(100) DEFAULT 'New - Not Contacted',
            `lead_quality` varchar(50) DEFAULT 'Cold',
            `lead_owner` varchar(100) DEFAULT 'Unassigned',
            `lead_generated_at` datetime DEFAULT NULL,
            `first_contact_at` datetime DEFAULT NULL,
            `last_contact_at` datetime DEFAULT NULL,
            `next_followup_at` datetime DEFAULT NULL,
            `preferred_channel` varchar(50) DEFAULT 'Call',
            `expected_deal_value` decimal(12,2) DEFAULT 0.00,
            `probability_percent` int(11) DEFAULT 0,
            `original_message` text DEFAULT NULL,
            `is_junk` tinyint(1) DEFAULT 0,
            `created_by` varchar(100) DEFAULT 'System',
            `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
            PRIMARY KEY (`id`),
            KEY `idx_email` (`email`),
            KEY `idx_lead_status` (`lead_status`),
            KEY `idx_lead_source` (`lead_source`),
            KEY `idx_created_at` (`created_at`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";
        
        $pdo->exec($sql);
        return ['success' => true, 'message' => 'Table created successfully'];
        
    } catch (PDOException $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

function insertSampleData($pdo) {
    try {
        // First check if any data exists
        $checkQuery = $pdo->query("SELECT COUNT(*) as count FROM contact_submissions_v2");
        $count = $checkQuery->fetch()['count'];
        
        if ($count > 0) {
            return ['success' => true, 'message' => 'Data already exists', 'count' => $count];
        }
        
        // Insert sample leads data
        $sampleLeads = [
            [
                'name' => 'John Smith',
                'full_name' => 'John Smith',
                'email' => 'john.smith@techcorp.com',
                'phone' => '+1-555-0123',
                'mobile_number' => '+1-555-0123',
                'company_name' => 'TechCorp Solutions',
                'country' => 'United States',
                'location' => 'New York, NY',
                'message' => 'Interested in cloud migration services for our enterprise infrastructure.',
                'original_message' => 'Interested in cloud migration services for our enterprise infrastructure.',
                'lead_status' => 'New - Not Contacted',
                'lead_source' => 'Website',
                'entry_source' => 'contact_form',
                'lead_quality' => 'Warm',
                'service_interest' => 'Cloud Solutions',
                'expected_deal_value' => 50000.00,
                'probability_percent' => 25
            ],
            [
                'name' => 'Sarah Johnson',
                'full_name' => 'Sarah Johnson',
                'email' => 'sarah.j@innovatetech.com',
                'phone' => '+1-555-0456',
                'mobile_number' => '+1-555-0456',
                'company_name' => 'InnovateTech Inc',
                'country' => 'Canada',
                'location' => 'Toronto, ON',
                'message' => 'Looking for cybersecurity assessment and implementation for our startup.',
                'original_message' => 'Looking for cybersecurity assessment and implementation for our startup.',
                'lead_status' => 'Contacted',
                'lead_source' => 'LinkedIn',
                'entry_source' => 'social_media',
                'lead_quality' => 'Hot',
                'service_interest' => 'Cybersecurity Services',
                'expected_deal_value' => 25000.00,
                'probability_percent' => 60,
                'first_contact_at' => date('Y-m-d H:i:s', strtotime('-2 days'))
            ],
            [
                'name' => 'Michael Chen',
                'full_name' => 'Michael Chen',
                'email' => 'm.chen@dataworks.com',
                'phone' => '+1-555-0789',
                'mobile_number' => '+1-555-0789',
                'company_name' => 'DataWorks Analytics',
                'country' => 'United States',
                'location' => 'San Francisco, CA',
                'message' => 'Need help with digital transformation and data analytics solutions.',
                'original_message' => 'Need help with digital transformation and data analytics solutions.',
                'lead_status' => 'Proposal Sent',
                'lead_source' => 'Referral',
                'entry_source' => 'referral',
                'lead_quality' => 'Hot',
                'service_interest' => 'Digital Marketing',
                'expected_deal_value' => 75000.00,
                'probability_percent' => 80,
                'first_contact_at' => date('Y-m-d H:i:s', strtotime('-1 week')),
                'last_contact_at' => date('Y-m-d H:i:s', strtotime('-2 days'))
            ],
            [
                'name' => 'Emily Rodriguez',
                'full_name' => 'Emily Rodriguez',
                'email' => 'emily.r@healthtech.com',
                'phone' => '+1-555-0321',
                'mobile_number' => '+1-555-0321',
                'company_name' => 'HealthTech Solutions',
                'country' => 'United States',
                'location' => 'Austin, TX',
                'message' => 'Interested in IT augmentation services for our development team.',
                'original_message' => 'Interested in IT augmentation services for our development team.',
                'lead_status' => 'Follow-up Scheduled',
                'lead_source' => 'Website',
                'entry_source' => 'contact_form',
                'lead_quality' => 'Warm',
                'service_interest' => 'IT Augmentation',
                'expected_deal_value' => 40000.00,
                'probability_percent' => 45,
                'next_followup_at' => date('Y-m-d H:i:s', strtotime('+3 days'))
            ],
            [
                'name' => 'David Kumar',
                'full_name' => 'David Kumar',
                'email' => 'd.kumar@manufacturing.com',
                'phone' => '+91-98765-43210',
                'mobile_number' => '+91-98765-43210',
                'company_name' => 'Kumar Manufacturing Ltd',
                'country' => 'India',
                'location' => 'Pune, Maharashtra',
                'message' => 'Looking for enterprise solutions and managed services for our manufacturing unit.',
                'original_message' => 'Looking for enterprise solutions and managed services for our manufacturing unit.',
                'lead_status' => 'Qualified',
                'lead_source' => 'Google Ads',
                'entry_source' => 'paid_ads',
                'lead_quality' => 'Hot',
                'service_interest' => 'Enterprise Solutions',
                'expected_deal_value' => 60000.00,
                'probability_percent' => 70,
                'first_contact_at' => date('Y-m-d H:i:s', strtotime('-5 days')),
                'last_contact_at' => date('Y-m-d H:i:s', strtotime('-1 day'))
            ]
        ];
        
        $sql = "INSERT INTO contact_submissions_v2 (
            name, full_name, email, phone, mobile_number, company_name, country, location,
            message, original_message, lead_status, lead_source, entry_source, lead_quality,
            service_interest, expected_deal_value, probability_percent, first_contact_at,
            last_contact_at, next_followup_at, created_at, lead_generated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $pdo->prepare($sql);
        $insertedCount = 0;
        
        foreach ($sampleLeads as $lead) {
            $stmt->execute([
                $lead['name'],
                $lead['full_name'],
                $lead['email'],
                $lead['phone'],
                $lead['mobile_number'],
                $lead['company_name'],
                $lead['country'],
                $lead['location'],
                $lead['message'],
                $lead['original_message'],
                $lead['lead_status'],
                $lead['lead_source'],
                $lead['entry_source'],
                $lead['lead_quality'],
                $lead['service_interest'],
                $lead['expected_deal_value'],
                $lead['probability_percent'],
                $lead['first_contact_at'] ?? null,
                $lead['last_contact_at'] ?? null,
                $lead['next_followup_at'] ?? null
            ]);
            $insertedCount++;
        }
        
        return ['success' => true, 'message' => 'Sample data inserted', 'count' => $insertedCount];
        
    } catch (PDOException $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

try {
    $pdo = getConnection();
    
    if (!$pdo) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed'], JSON_PRETTY_PRINT);
        exit;
    }
    
    $action = $_GET['action'] ?? 'setup';
    
    switch ($action) {
        case 'setup':
            // Create table and insert sample data
            $tableResult = createContactTable($pdo);
            if ($tableResult['success']) {
                $dataResult = insertSampleData($pdo);
                echo json_encode([
                    'success' => true,
                    'table_creation' => $tableResult,
                    'data_insertion' => $dataResult
                ], JSON_PRETTY_PRINT);
            } else {
                echo json_encode($tableResult, JSON_PRETTY_PRINT);
            }
            break;
            
        case 'create_table':
            echo json_encode(createContactTable($pdo), JSON_PRETTY_PRINT);
            break;
            
        case 'insert_data':
            echo json_encode(insertSampleData($pdo), JSON_PRETTY_PRINT);
            break;
            
        case 'check':
            // Check if table exists and show data
            $result = ['success' => true, 'checks' => []];
            
            try {
                $pdo->query("SELECT 1 FROM contact_submissions_v2 LIMIT 1");
                $result['checks']['table_exists'] = true;
                
                $countQuery = $pdo->query("SELECT COUNT(*) as count FROM contact_submissions_v2");
                $count = $countQuery->fetch()['count'];
                $result['checks']['record_count'] = $count;
                
                if ($count > 0) {
                    $sampleQuery = $pdo->query("SELECT * FROM contact_submissions_v2 LIMIT 3");
                    $samples = $sampleQuery->fetchAll();
                    $result['checks']['sample_data'] = $samples;
                }
                
            } catch (Exception $e) {
                $result['checks']['table_exists'] = false;
                $result['checks']['error'] = $e->getMessage();
            }
            
            echo json_encode($result, JSON_PRETTY_PRINT);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action'], JSON_PRETTY_PRINT);
    }
    
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_PRETTY_PRINT);
}
?>