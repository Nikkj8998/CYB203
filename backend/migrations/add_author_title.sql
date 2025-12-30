-- Add author_title column to blog_posts table
-- This allows storing the author's position/title (e.g., "CEO @ CybaemTech")

-- Add author_title column if it doesn't exist
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_title VARCHAR(255) AFTER author_linkedin;
