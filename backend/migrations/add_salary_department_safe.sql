-- Safe production migration to add salary and department columns to jobs table
-- This version is idempotent and can be run multiple times safely

-- Check and add salary column if it doesn't exist
SET @sql_salary = IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'jobs' 
   AND COLUMN_NAME = 'salary') = 0,
  'ALTER TABLE jobs ADD COLUMN salary VARCHAR(100) DEFAULT NULL',
  'SELECT "Column salary already exists" AS message'
);
PREPARE stmt_salary FROM @sql_salary;
EXECUTE stmt_salary;
DEALLOCATE PREPARE stmt_salary;

-- Check and add department column if it doesn't exist
SET @sql_department = IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_SCHEMA = DATABASE() 
   AND TABLE_NAME = 'jobs' 
   AND COLUMN_NAME = 'department') = 0,
  'ALTER TABLE jobs ADD COLUMN department VARCHAR(100) DEFAULT NULL',
  'SELECT "Column department already exists" AS message'
);
PREPARE stmt_department FROM @sql_department;
EXECUTE stmt_department;
DEALLOCATE PREPARE stmt_department;

-- Update only NULL values to maintain existing data integrity
UPDATE jobs SET salary = 'Competitive' WHERE salary IS NULL;
UPDATE jobs SET department = 'General' WHERE department IS NULL;
