-- Add slug column to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug VARCHAR(255) NULL UNIQUE AFTER title;

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
