-- Create SEO Meta Tags Table
-- This table stores all SEO metadata separately from blog_posts

CREATE TABLE IF NOT EXISTS `seo_metatags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_post_id` int(11) NOT NULL,
  
  -- Basic SEO Meta Tags
  `meta_title` varchar(100) DEFAULT NULL COMMENT 'SEO title tag (60 chars recommended)',
  `meta_description` varchar(200) DEFAULT NULL COMMENT 'SEO description (160 chars recommended)',
  `meta_keywords` text DEFAULT NULL COMMENT 'Comma-separated keywords',
  `meta_author` varchar(100) DEFAULT NULL COMMENT 'Content author name',
  `robots` varchar(50) DEFAULT 'index, follow' COMMENT 'Robots meta tag directive',
  
  -- Geo Location Tags (for local SEO)
  `geo_region` varchar(10) DEFAULT 'IN-MH' COMMENT 'Geographic region code',
  `geo_placename` varchar(100) DEFAULT 'Pune' COMMENT 'City/place name',
  `geo_position` varchar(50) DEFAULT '18.5204;73.8567' COMMENT 'Latitude;Longitude',
  `geo_icbm` varchar(50) DEFAULT '18.5204, 73.8567' COMMENT 'ICBM coordinates',
  
  -- Open Graph Tags (Facebook, LinkedIn, WhatsApp)
  `og_type` varchar(50) DEFAULT 'article' COMMENT 'OpenGraph content type',
  `og_url` varchar(500) DEFAULT NULL COMMENT 'Canonical URL for OG',
  `og_title` varchar(100) DEFAULT NULL COMMENT 'Title for social sharing',
  `og_description` varchar(200) DEFAULT NULL COMMENT 'Description for social sharing',
  `og_image` varchar(500) DEFAULT NULL COMMENT 'Image URL for social sharing',
  `og_site_name` varchar(100) DEFAULT 'Cybaem Tech' COMMENT 'Website name',
  
  -- Twitter Card Tags
  `twitter_card_type` varchar(50) DEFAULT 'summary_large_image' COMMENT 'Twitter card type',
  `twitter_url` varchar(500) DEFAULT NULL COMMENT 'URL for Twitter card',
  `twitter_title` varchar(100) DEFAULT NULL COMMENT 'Title for Twitter card',
  `twitter_description` varchar(200) DEFAULT NULL COMMENT 'Description for Twitter card',
  `twitter_image` varchar(500) DEFAULT NULL COMMENT 'Image URL for Twitter card',
  
  -- Canonical & Alternate Links
  `canonical_url` varchar(500) DEFAULT NULL COMMENT 'Canonical URL to prevent duplicates',
  `alternate_hreflang_en` varchar(500) DEFAULT NULL COMMENT 'English language alternate',
  `alternate_hreflang_default` varchar(500) DEFAULT NULL COMMENT 'Default language alternate',
  
  -- Schema Markup (JSON-LD stored as TEXT)
  `schema_organization` text DEFAULT NULL COMMENT 'Organization schema JSON',
  `schema_website` text DEFAULT NULL COMMENT 'Website schema JSON',
  `schema_breadcrumb` text DEFAULT NULL COMMENT 'Breadcrumb schema JSON',
  `schema_article` text DEFAULT NULL COMMENT 'Article schema JSON (auto-generated)',
  `schema_faq` text DEFAULT NULL COMMENT 'FAQ schema JSON',
  
  -- Google Analytics
  `google_analytics_id1` varchar(50) DEFAULT NULL COMMENT 'Primary GA tracking ID',
  `google_analytics_id2` varchar(50) DEFAULT NULL COMMENT 'Secondary GA tracking ID',
  
  -- Timestamps
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_blog_post` (`blog_post_id`),
  CONSTRAINT `fk_seo_blog_post` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='SEO metadata for blog posts';

-- Create indexes for better performance
CREATE INDEX `idx_blog_post_id` ON `seo_metatags` (`blog_post_id`);
