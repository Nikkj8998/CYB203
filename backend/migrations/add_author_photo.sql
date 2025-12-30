-- Add author_photo column to blog_posts table
-- This will store the URL/path to the author's profile photo

ALTER TABLE blog_posts 
ADD COLUMN author_photo VARCHAR(500) AFTER author_title;

-- Add index for better performance
CREATE INDEX idx_blog_author_photo ON blog_posts(author_photo);
