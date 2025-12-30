-- Add salary and department columns to jobs table
ALTER TABLE jobs 
  ADD COLUMN salary VARCHAR(100) DEFAULT 'Competitive',
  ADD COLUMN department VARCHAR(100) DEFAULT 'General';

-- Update existing records with default values
UPDATE jobs SET salary = 'Competitive' WHERE salary IS NULL OR salary = '';
UPDATE jobs SET department = 'General' WHERE department IS NULL OR department = '';
