<?php
// Migration: Add unique constraint to phone column in contact_submissions_v2
// This ensures no duplicate phone numbers can be added

// Database credentials from environment variables
define('LEADS_DB_HOST', getenv('LEADS_DB_HOST') ?: 'localhost');
define('LEADS_DB_NAME', getenv('LEADS_DB_NAME') ?: '');
define('LEADS_DB_USER', getenv('LEADS_DB_USER') ?: '');
define('LEADS_DB_PASSWORD', getenv('LEADS_DB_PASSWORD') ?: '');
define('LEADS_DB_PORT', getenv('LEADS_DB_PORT') ?: '3306');

header('Content-Type: application/json');

try {
    $dsn = "mysql:host=" . LEADS_DB_HOST . 
           ";port=" . LEADS_DB_PORT . 
           ";dbname=" . LEADS_DB_NAME . 
           ";charset=utf8mb4";
    
    $pdo = new PDO($dsn, LEADS_DB_USER, LEADS_DB_PASSWORD, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    echo "Connected to database...\n";
    
    // Step 1: Find and remove duplicate phone numbers (keep the oldest record)
    echo "Checking for duplicate phone numbers...\n";
    
    $findDuplicates = "
        SELECT phone, MIN(id) as keep_id, COUNT(*) as count
        FROM contact_submissions_v2
        WHERE phone IS NOT NULL AND phone != ''
        GROUP BY phone
        HAVING count > 1
    ";
    
    $stmt = $pdo->query($findDuplicates);
    $duplicates = $stmt->fetchAll();
    
    $deletedCount = 0;
    
    foreach ($duplicates as $dup) {
        echo "Found {$dup['count']} records with phone: {$dup['phone']}\n";
        
        // Delete all duplicates except the one we want to keep
        $deleteDups = "
            DELETE FROM contact_submissions_v2
            WHERE phone = :phone AND id != :keep_id
        ";
        
        $deleteStmt = $pdo->prepare($deleteDups);
        $deleteStmt->execute([
            ':phone' => $dup['phone'],
            ':keep_id' => $dup['keep_id']
        ]);
        
        $deletedCount += $deleteStmt->rowCount();
    }
    
    echo "Removed $deletedCount duplicate records\n";
    
    // Step 2: Create unique index on phone column
    echo "Adding unique constraint to phone column...\n";
    
    // First, check if index already exists
    $checkIndex = "
        SELECT COUNT(*) as count
        FROM information_schema.statistics
        WHERE table_schema = :dbname
        AND table_name = 'contact_submissions_v2'
        AND index_name = 'unique_phone'
    ";
    
    $checkStmt = $pdo->prepare($checkIndex);
    $checkStmt->execute([':dbname' => LEADS_DB_NAME]);
    $indexExists = $checkStmt->fetch()['count'] > 0;
    
    if ($indexExists) {
        echo "Unique constraint already exists on phone column\n";
    } else {
        // Add unique index, allowing NULL values
        $addUnique = "
            ALTER TABLE contact_submissions_v2
            ADD UNIQUE INDEX unique_phone (phone)
        ";
        
        $pdo->exec($addUnique);
        echo "Successfully added unique constraint to phone column\n";
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Migration completed successfully',
        'duplicates_removed' => $deletedCount
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
