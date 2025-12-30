-- Migration Script: Transfer existing SEO data from blog_posts to seo_metatags
-- Run this AFTER creating the seo_metatags table

-- Insert existing SEO data from blog_posts into seo_metatags
INSERT INTO `seo_metatags` (
  `blog_post_id`,
  `meta_title`,
  `meta_description`,
  `meta_keywords`,
  `og_title`,
  `og_description`,
  `og_image`,
  `twitter_card_type`,
  `canonical_url`,
  `created_at`,
  `updated_at`
)
SELECT 
  `id` AS blog_post_id,
  `meta_title`,
  `meta_description`,
  `meta_keywords`,
  `og_title`,
  `og_description`,
  `og_image`,
  `twitter_card_type`,
  `canonical_url`,
  `created_at`,
  `updated_at`
FROM `blog_posts`
WHERE `id` IS NOT NULL
ON DUPLICATE KEY UPDATE
  `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `meta_keywords` = VALUES(`meta_keywords`),
  `og_title` = VALUES(`og_title`),
  `og_description` = VALUES(`og_description`),
  `og_image` = VALUES(`og_image`),
  `twitter_card_type` = VALUES(`twitter_card_type`),
  `canonical_url` = VALUES(`canonical_url`);

-- Verify migration
SELECT 
  COUNT(*) AS total_blog_posts,
  (SELECT COUNT(*) FROM seo_metatags) AS total_seo_records
FROM blog_posts;

-- Show any blog posts without SEO records
SELECT bp.id, bp.title, bp.slug
FROM blog_posts bp
LEFT JOIN seo_metatags sm ON bp.id = sm.blog_post_id
WHERE sm.id IS NULL;
