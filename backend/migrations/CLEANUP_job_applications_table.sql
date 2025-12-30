-- Cleanup Migration for job_applications table
-- This removes unnecessary columns and keeps only what we use
-- Run this on your cPanel database to fix the internal server error

-- BACKUP YOUR DATA FIRST!
-- Create a backup: SELECT * INTO job_applications_backup FROM job_applications;

-- Option 1: If you want to keep existing data and just remove extra columns
ALTER TABLE job_applications 
  DROP COLUMN IF EXISTS job_department,
  DROP COLUMN IF EXISTS job_location,
  DROP COLUMN IF EXISTS job_type,
  DROP COLUMN IF EXISTS job_experience,
  DROP COLUMN IF EXISTS cover_letter,
  DROP COLUMN IF EXISTS notes;

-- Alternatively, if you want to recreate the table from scratch (THIS WILL DELETE ALL DATA!)
-- Only use this if you don't have important applications in the table

/*
DROP TABLE IF EXISTS job_applications;

CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    applicant_phone VARCHAR(50) DEFAULT NULL,
    resume_path VARCHAR(500) NOT NULL,
    resume_original_name VARCHAR(255) NOT NULL,
    resume_mime_type VARCHAR(100) NOT NULL,
    resume_size_bytes INT NOT NULL,
    source_url VARCHAR(500) DEFAULT NULL,
    status ENUM('new', 'reviewed', 'shortlisted', 'contacted', 'rejected', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_job_created (job_id, created_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*/
