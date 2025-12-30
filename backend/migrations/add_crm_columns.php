<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = getenv('LEADS_DB_HOST') ?: 'localhost';
$dbname = getenv('LEADS_DB_NAME') ?: '';
$username = getenv('LEADS_DB_USER') ?: '';
$password = getenv('LEADS_DB_PASSWORD') ?: '';
$port = getenv('LEADS_DB_PORT') ?: '3306';

$results = [];

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    $results['connection'] = 'Connected successfully to database';
    
    $columnsToAdd = [
        'lead_id' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS lead_id VARCHAR(50) DEFAULT NULL",
        'full_name' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS full_name VARCHAR(255) DEFAULT NULL",
        'mobile_number' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(50) DEFAULT NULL",
        'company_name' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT NULL",
        'location' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS location VARCHAR(255) DEFAULT NULL",
        'website' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS website VARCHAR(500) DEFAULT NULL",
        'lead_source' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS lead_source VARCHAR(100) DEFAULT 'Website'",
        'campaign_name' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS campaign_name VARCHAR(255) DEFAULT NULL",
        'service_interest' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS service_interest VARCHAR(255) DEFAULT NULL",
        'lead_status' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS lead_status VARCHAR(100) DEFAULT 'New - Not Contacted'",
        'lead_quality' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS lead_quality VARCHAR(50) DEFAULT 'Cold'",
        'lead_owner' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS lead_owner VARCHAR(100) DEFAULT 'Unassigned'",
        'lead_generated_at' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS lead_generated_at DATETIME DEFAULT NULL",
        'first_contact_at' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS first_contact_at DATETIME DEFAULT NULL",
        'last_contact_at' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS last_contact_at DATETIME DEFAULT NULL",
        'next_followup_at' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS next_followup_at DATETIME DEFAULT NULL",
        'preferred_channel' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS preferred_channel VARCHAR(50) DEFAULT 'Call'",
        'expected_deal_value' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS expected_deal_value DECIMAL(12,2) DEFAULT 0",
        'probability_percent' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS probability_percent INT DEFAULT 0",
        'original_message' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS original_message TEXT DEFAULT NULL",
        'is_junk' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS is_junk TINYINT(1) DEFAULT 0",
        'created_by' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS created_by VARCHAR(100) DEFAULT 'System'",
        'updated_at' => "ALTER TABLE contact_submissions_v2 ADD COLUMN IF NOT EXISTS updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ];
    
    $stmt = $pdo->query("SHOW COLUMNS FROM contact_submissions_v2");
    $existingColumns = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
    $results['existing_columns'] = $existingColumns;
    
    $addedColumns = [];
    $skippedColumns = [];
    $errorColumns = [];
    
    foreach ($columnsToAdd as $columnName => $alterSql) {
        if (in_array($columnName, $existingColumns)) {
            $skippedColumns[] = $columnName;
            continue;
        }
        
        try {
            $simpleSql = str_replace(' IF NOT EXISTS', '', $alterSql);
            $pdo->exec($simpleSql);
            $addedColumns[] = $columnName;
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'Duplicate column') !== false) {
                $skippedColumns[] = $columnName;
            } else {
                $errorColumns[$columnName] = $e->getMessage();
            }
        }
    }
    
    $results['added_columns'] = $addedColumns;
    $results['skipped_columns'] = $skippedColumns;
    $results['error_columns'] = $errorColumns;
    
    $updateLeadIdSql = "UPDATE contact_submissions_v2 SET lead_id = CONCAT('LEAD-', LPAD(id, 4, '0')) WHERE lead_id IS NULL";
    $pdo->exec($updateLeadIdSql);
    $results['lead_id_updated'] = 'Updated lead_id for existing records';
    
    $updateFullNameSql = "UPDATE contact_submissions_v2 SET full_name = name WHERE full_name IS NULL AND name IS NOT NULL";
    $pdo->exec($updateFullNameSql);
    $results['full_name_updated'] = 'Updated full_name from name column';
    
    $updateMobileNumberSql = "UPDATE contact_submissions_v2 SET mobile_number = phone WHERE mobile_number IS NULL AND phone IS NOT NULL";
    $pdo->exec($updateMobileNumberSql);
    $results['mobile_number_updated'] = 'Updated mobile_number from phone column';
    
    $updateLocationSql = "UPDATE contact_submissions_v2 SET location = country WHERE location IS NULL AND country IS NOT NULL";
    $pdo->exec($updateLocationSql);
    $results['location_updated'] = 'Updated location from country column';
    
    $updateOriginalMessageSql = "UPDATE contact_submissions_v2 SET original_message = message WHERE original_message IS NULL AND message IS NOT NULL";
    $pdo->exec($updateOriginalMessageSql);
    $results['original_message_updated'] = 'Updated original_message from message column';
    
    $updateLeadGeneratedSql = "UPDATE contact_submissions_v2 SET lead_generated_at = created_at WHERE lead_generated_at IS NULL AND created_at IS NOT NULL";
    $pdo->exec($updateLeadGeneratedSql);
    $results['lead_generated_at_updated'] = 'Updated lead_generated_at from created_at column';
    
    $updateLeadSourceSql = "UPDATE contact_submissions_v2 SET lead_source = COALESCE(entry_source, sourcePage, 'Website') WHERE lead_source IS NULL OR lead_source = ''";
    $pdo->exec($updateLeadSourceSql);
    $results['lead_source_updated'] = 'Updated lead_source from existing columns';
    
    $crmActivitiesTable = "
    CREATE TABLE IF NOT EXISTS crm_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        activity_type VARCHAR(50) NOT NULL,
        activity_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        summary TEXT,
        next_step TEXT,
        created_by VARCHAR(100) DEFAULT 'System',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_lead_id (lead_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ";
    
    try {
        $pdo->exec($crmActivitiesTable);
        $results['crm_activities_table'] = 'Created crm_activities table';
    } catch (PDOException $e) {
        $results['crm_activities_table'] = 'Table already exists or error: ' . $e->getMessage();
    }
    
    $crmSettingsTable = "
    CREATE TABLE IF NOT EXISTS crm_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_type VARCHAR(50) NOT NULL,
        setting_value VARCHAR(255) NOT NULL,
        display_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_setting_type (setting_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ";
    
    try {
        $pdo->exec($crmSettingsTable);
        $results['crm_settings_table'] = 'Created crm_settings table';
    } catch (PDOException $e) {
        $results['crm_settings_table'] = 'Table already exists or error: ' . $e->getMessage();
    }
    
    $checkSettings = $pdo->query("SELECT COUNT(*) as cnt FROM crm_settings");
    $settingsCount = $checkSettings->fetch()['cnt'];
    
    if ($settingsCount == 0) {
        $defaultSettings = [
            ['lead_status', 'New - Not Contacted', 1],
            ['lead_status', 'Attempted Contact', 2],
            ['lead_status', 'Connected - Follow-up Needed', 3],
            ['lead_status', 'Qualified - Proposal Sent', 4],
            ['lead_status', 'Negotiation / In Discussion', 5],
            ['lead_status', 'Closed - Won', 6],
            ['lead_status', 'Closed - Lost', 7],
            ['lead_status', 'Dead / Junk', 8],
            ['lead_source', 'Website', 1],
            ['lead_source', 'Referral', 2],
            ['lead_source', 'Social Media', 3],
            ['lead_source', 'Google Ads', 4],
            ['lead_source', 'LinkedIn', 5],
            ['lead_source', 'Cold Call', 6],
            ['lead_source', 'Email Campaign', 7],
            ['lead_source', 'Other', 8],
            ['lead_quality', 'Hot', 1],
            ['lead_quality', 'Warm', 2],
            ['lead_quality', 'Cold', 3],
            ['lead_quality', 'Junk', 4],
            ['service_interest', 'IT Services', 1],
            ['service_interest', 'Cybersecurity', 2],
            ['service_interest', 'Cloud Solutions', 3],
            ['service_interest', 'Digital Marketing', 4],
            ['service_interest', 'Managed Services', 5],
            ['service_interest', 'AI & Data Analytics', 6],
            ['lead_owner', 'Unassigned', 1],
            ['lead_owner', 'Sales Team', 2],
            ['lead_owner', 'Marketing', 3],
            ['preferred_channel', 'Call', 1],
            ['preferred_channel', 'Email', 2],
            ['preferred_channel', 'WhatsApp', 3],
            ['preferred_channel', 'LinkedIn', 4],
            ['activity_type', 'Call', 1],
            ['activity_type', 'Email', 2],
            ['activity_type', 'Meeting', 3],
            ['activity_type', 'Note', 4],
            ['activity_type', 'Task', 5],
        ];
        
        $insertSetting = $pdo->prepare("INSERT INTO crm_settings (setting_type, setting_value, display_order) VALUES (?, ?, ?)");
        
        foreach ($defaultSettings as $setting) {
            $insertSetting->execute($setting);
        }
        
        $results['default_settings'] = 'Inserted ' . count($defaultSettings) . ' default settings';
    } else {
        $results['default_settings'] = 'Settings already exist, skipped insertion';
    }
    
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM contact_submissions_v2");
    $totalLeads = $stmt->fetch()['cnt'];
    $results['total_leads'] = $totalLeads;
    
    $results['success'] = true;
    $results['message'] = 'Migration completed successfully';
    
} catch (PDOException $e) {
    $results['success'] = false;
    $results['error'] = $e->getMessage();
}

echo json_encode($results, JSON_PRETTY_PRINT);
?>
