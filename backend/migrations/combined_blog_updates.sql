-- Combined migration: Add author_photo and include_in_sitemap columns to blog_posts table
-- Run this SQL on your database to add missing columns

-- Add author_photo column (stores URL/path to author's profile photo)
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS author_photo VARCHAR(500) AFTER author_title;

-- Add include_in_sitemap column (controls whether blog appears in sitemap.xml)
-- Default is 1 (true) - all published posts will be included by default
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS include_in_sitemap TINYINT(1) DEFAULT 1 AFTER status;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_author_photo ON blog_posts(author_photo);
CREATE INDEX IF NOT EXISTS idx_blog_sitemap ON blog_posts(include_in_sitemap, status);

-- Update existing posts to be included in sitemap
UPDATE blog_posts 
SET include_in_sitemap = 1 
WHERE include_in_sitemap IS NULL;
