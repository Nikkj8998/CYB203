-- Add missing columns to blog_posts table
-- Run this migration on your cPanel MySQL database

-- Add slug column if it doesn't exist
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug VARCHAR(255) AFTER title;

-- Add tags column if it doesn't exist
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT AFTER slug;

-- Add author_linkedin column if it doesn't exist
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_linkedin VARCHAR(500) AFTER author;

-- Add index for slug for better performance
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
