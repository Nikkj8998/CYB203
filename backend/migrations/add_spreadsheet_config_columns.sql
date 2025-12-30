-- Migration to ensure spreadsheet_configs table has all necessary columns
-- This script adds missing columns to support Google Sheets import management

-- Add columns if they don't exist
ALTER TABLE `spreadsheet_configs` 
ADD COLUMN IF NOT EXISTS `is_active` TINYINT(1) DEFAULT 1 COMMENT 'Whether spreadsheet sync is enabled',
ADD COLUMN IF NOT EXISTS `auto_sync` TINYINT(1) DEFAULT 0 COMMENT 'Whether to automatically sync at intervals',
ADD COLUMN IF NOT EXISTS `sync_interval` INT DEFAULT 15 COMMENT 'Sync interval in minutes',
ADD COLUMN IF NOT EXISTS `last_synced` DATETIME NULL DEFAULT NULL COMMENT 'Last time spreadsheet was synced',
ADD COLUMN IF NOT EXISTS `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'When spreadsheet was added',
ADD COLUMN IF NOT EXISTS `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update time';

-- For existing records, set is_active to 1 if it was just added
UPDATE `spreadsheet_configs` SET `is_active` = 1 WHERE `is_active` IS NULL;
