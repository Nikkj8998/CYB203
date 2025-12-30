-- Add missing columns to admin_users table for user management system

-- Add role column (super_admin, admin, user)
ALTER TABLE `admin_users` 
ADD COLUMN `role` VARCHAR(50) NOT NULL DEFAULT 'admin' AFTER `email`;

-- Add permissions column (JSON array of module permissions)
ALTER TABLE `admin_users` 
ADD COLUMN `permissions` TEXT NULL AFTER `role`;

-- Add status column (active, disabled)
ALTER TABLE `admin_users` 
ADD COLUMN `status` VARCHAR(20) NOT NULL DEFAULT 'active' AFTER `permissions`;

-- Add last_login column
ALTER TABLE `admin_users` 
ADD COLUMN `last_login` DATETIME NULL AFTER `status`;

-- Add created_by column (tracks which admin created this user)
ALTER TABLE `admin_users` 
ADD COLUMN `created_by` INT NULL AFTER `last_login`;

-- Add updated_at column
ALTER TABLE `admin_users` 
ADD COLUMN `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

-- Update existing admin user to be super_admin
UPDATE `admin_users` 
SET `role` = 'super_admin', 
    `status` = 'active'
WHERE `username` = 'admin';

-- Add index on role for better performance
ALTER TABLE `admin_users` ADD INDEX `idx_role` (`role`);

-- Add index on status for better performance
ALTER TABLE `admin_users` ADD INDEX `idx_status` (`status`);
