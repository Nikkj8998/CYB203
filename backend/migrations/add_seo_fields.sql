-- Migration: Add SEO fields to blog_posts table
-- Date: 2024-12-04
-- Description: Adds SEO-specific columns for better search engine optimization

-- Add meta_title column (custom SEO title, defaults to post title if empty)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(100) DEFAULT NULL AFTER tags;

-- Add meta_description column (SEO meta description)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description VARCHAR(200) DEFAULT NULL AFTER meta_title;

-- Add meta_keywords column (SEO keywords)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_keywords TEXT DEFAULT NULL AFTER meta_description;

-- Add og_title column (Open Graph title)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_title VARCHAR(100) DEFAULT NULL AFTER meta_keywords;

-- Add og_description column (Open Graph description)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_description VARCHAR(200) DEFAULT NULL AFTER og_title;

-- Add og_image column (Open Graph image URL)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image VARCHAR(500) DEFAULT NULL AFTER og_description;

-- Add twitter_card_type column (Twitter card type)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS twitter_card_type VARCHAR(50) DEFAULT 'summary_large_image' AFTER og_image;

-- Add canonical_url column (Custom canonical URL)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(500) DEFAULT NULL AFTER twitter_card_type;

-- Note: Run this migration using the run_migration.php script or directly in MySQL
