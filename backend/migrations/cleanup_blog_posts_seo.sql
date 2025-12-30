-- OPTIONAL: Clean up SEO columns from blog_posts table
-- WARNING: Only run this AFTER verifying the migration was successful
-- Keep this file for reference but DO NOT execute automatically

-- Create backup of blog_posts before cleanup
CREATE TABLE IF NOT EXISTS `blog_posts_backup_before_seo_cleanup` AS SELECT * FROM `blog_posts`;

-- Remove SEO columns from blog_posts (if you want to fully separate concerns)
-- UNCOMMENT ONLY AFTER VERIFYING MIGRATION

-- ALTER TABLE `blog_posts` 
--   DROP COLUMN `meta_title`,
--   DROP COLUMN `meta_description`,
--   DROP COLUMN `meta_keywords`,
--   DROP COLUMN `og_title`,
--   DROP COLUMN `og_description`,
--   DROP COLUMN `og_image`,
--   DROP COLUMN `twitter_card_type`,
--   DROP COLUMN `canonical_url`;

-- For now, we'll keep these columns in blog_posts for backward compatibility
-- They will simply be ignored by the new SEO system
SELECT 'SEO cleanup script ready. Execute manually after verification.' AS status;
