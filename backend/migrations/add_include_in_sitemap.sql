-- Add include_in_sitemap column to blog_posts table
-- This boolean flag controls whether a blog post should be included in sitemap.xml
-- Default is 1 (true) - all published posts will be included by default

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS include_in_sitemap TINYINT(1) DEFAULT 1 AFTER status;

-- Add index for better performance when querying sitemap blogs
CREATE INDEX IF NOT EXISTS idx_blog_sitemap ON blog_posts(include_in_sitemap, status);

-- Update existing posts to be included in sitemap
UPDATE blog_posts 
SET include_in_sitemap = 1 
WHERE include_in_sitemap IS NULL;
