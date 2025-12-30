-- Migration Script: Remove SEO columns from blog_posts table
-- Run this ONLY AFTER verifying that data has been migrated to seo_metatags table

-- Drop SEO columns from blog_posts
ALTER TABLE `blog_posts`
  DROP COLUMN `meta_title`,
  DROP COLUMN `meta_description`,
  DROP COLUMN `meta_keywords`,
  DROP COLUMN `og_title`,
  DROP COLUMN `og_description`,
  DROP COLUMN `og_image`,
  DROP COLUMN `twitter_card_type`,
  DROP COLUMN `canonical_url`;
