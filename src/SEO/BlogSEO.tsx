import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BlogPostData {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  type?: string;
  author: string;
  author_title?: string;
  featured_image?: string;
  created_at: string;
  updated_at?: string;
  tags?: string;

  // Basic SEO
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  meta_author?: string;
  robots?: string;

  // Geo Location
  geo_region?: string;
  geo_placename?: string;
  geo_position?: string;
  geo_icbm?: string;

  // Open Graph
  og_type?: string;
  og_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_site_name?: string;

  // Twitter Card
  twitter_card_type?: string;
  twitter_url?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;

  // Canonical & Alternate
  canonical_url?: string;
  alternate_hreflang_en?: string;
  alternate_hreflang_default?: string;

  // Schema Markups
  schema_organization?: string;
  schema_website?: string;
  schema_breadcrumb?: string;
  schema_article?: string;
  schema_faq?: string;

  // Analytics
  google_analytics_id1?: string;
  google_analytics_id2?: string;
}

interface BlogSEOProps {
  post: BlogPostData;
  baseUrl?: string;
}

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return 'https://www.cybaemtech.com';
};

const BlogSEO: React.FC<BlogSEOProps> = ({ post, baseUrl }) => {
  // Guard against undefined/null post
  if (!post || !post.title) {
    return null;
  }

  const resolvedBaseUrl = baseUrl || getBaseUrl();
  const postType = post.type || 'Blog Post';
  const typeSlug = postType.toLowerCase().replace(/\s+/g, '-');
  const postSlug = post.slug || String(post.id);
  const postUrl = post.canonical_url || `${resolvedBaseUrl}/${typeSlug}/${postSlug}`;

  // Safe fallbacks for all SEO fields
  const seoTitle = post.meta_title || `${post.title || 'Blog Post'} | Cybaem Tech`;
  const seoDescription = post.meta_description || post.excerpt || post.title || '';
  const seoKeywords = post.meta_keywords || post.tags || '';
  const seoRobots = post.robots || 'index, follow';
  const seoAuthor = post.meta_author || post.author || 'Cybaem Tech';

  // Helper function to normalize image URLs to absolute paths
  const normalizeImageUrl = (url?: string): string => {
    if (!url) return `${resolvedBaseUrl}/public/uploads/default-image.jpg`;
    
    console.log('BlogSEO - Normalizing image URL:', url);
    
    // If already a complete URL, return as-is
    if (url.startsWith('http')) return url;
    
    // Normalize the URL - ensure it uses the correct upload path
    let trimmedUrl = url.startsWith('/') ? url : '/' + url;
    
    // Convert /uploads/ to /public/uploads/ if needed
    if (trimmedUrl.startsWith('/uploads/') && !trimmedUrl.startsWith('/public/uploads/')) {
      trimmedUrl = trimmedUrl.replace('/uploads/', '/public/uploads/');
    }
    
    // For filename only (no directory), prepend /public/uploads/
    if (!trimmedUrl.includes('/uploads/') && trimmedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      trimmedUrl = '/public/uploads/' + trimmedUrl.replace(/^\//, '');
    }
    
    const finalUrl = resolvedBaseUrl + trimmedUrl;
    console.log('BlogSEO - Final normalized URL:', finalUrl);
    return finalUrl;
  };

  // Open Graph
  const ogTitle = post.og_title || post.meta_title || post.title || 'Cybaem Tech Blog';
  const ogDescription = post.og_description || post.meta_description || post.excerpt || '';
  const ogImage = normalizeImageUrl(post.og_image || post.featured_image);
  const ogType = post.og_type || 'article';
  const ogSiteName = post.og_site_name || 'Cybaem Tech';

  // Twitter
  const twitterCardType = post.twitter_card_type || 'summary_large_image';
  const twitterTitle = post.twitter_title || ogTitle;
  const twitterDescription = post.twitter_description || ogDescription;
  const twitterImage = normalizeImageUrl(post.twitter_image || post.og_image || post.featured_image);

  // Geo Location
  const geoRegion = post.geo_region || 'IN-MH';
  const geoPlacename = post.geo_placename || 'Pune';
  const geoPosition = post.geo_position || '18.5204;73.8567';
  const geoIcbm = post.geo_icbm || '18.5204, 73.8567';

  const stripHtmlTags = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  };

  // Schema Generation
  // If custom schema is provided in DB, use it. Otherwise generate default article schema.
  let schemas: any[] = [];

  // 1. Article Schema
  if (post.schema_article) {
    try {
      schemas.push(JSON.parse(post.schema_article));
    } catch (e) {
      console.error('Invalid Article Schema JSON', e);
    }
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": stripHtmlTags(seoDescription),
      "image": ogImage,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.author_title || undefined
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cybaem Tech",
        "logo": {
          "@type": "ImageObject",
          "url": ogImage
        }
      },
      "datePublished": post.created_at,
      "dateModified": post.updated_at || post.created_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      },
      "keywords": seoKeywords
    });
  }

  // 2. Breadcrumb Schema
  if (post.schema_breadcrumb) {
    try {
      schemas.push(JSON.parse(post.schema_breadcrumb));
    } catch (e) { console.error('Invalid Breadcrumb Schema JSON', e); }
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": resolvedBaseUrl },
        { "@type": "ListItem", "position": 2, "name": "Resources", "item": `${resolvedBaseUrl}/resources` },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl }
      ]
    });
  }

  // 3. Other Custom Schemas
  if (post.schema_organization) {
    try { schemas.push(JSON.parse(post.schema_organization)); } catch (e) { }
  }
  if (post.schema_website) {
    try { schemas.push(JSON.parse(post.schema_website)); } catch (e) { }
  }
  if (post.schema_faq) {
    try { schemas.push(JSON.parse(post.schema_faq)); } catch (e) { }
  }

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={stripHtmlTags(seoDescription)} />
      {seoKeywords && <meta name="keywords" content={seoKeywords} />}
      <meta name="robots" content={seoRobots} />
      <meta name="author" content={seoAuthor} />

      <link rel="canonical" href={postUrl} />
      <link rel="alternate" hrefLang="en" href={postUrl} />
      <link rel="alternate" hrefLang="x-default" href={postUrl} />
      {post.alternate_hreflang_en && <link rel="alternate" hrefLang="en" href={post.alternate_hreflang_en} />}
      {post.alternate_hreflang_default && <link rel="alternate" hrefLang="x-default" href={post.alternate_hreflang_default} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={stripHtmlTags(ogDescription)} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="article:published_time" content={post.created_at} />
      {post.updated_at && <meta property="article:modified_time" content={post.updated_at} />}
      <meta property="article:author" content={post.author || 'Cybaem Tech'} />
      {post.tags && typeof post.tags === 'string' && post.tags.trim() && post.tags.split(',').map((tag, index) => {
        const trimmedTag = tag.trim();
        return trimmedTag ? <meta key={index} property="article:tag" content={trimmedTag} /> : null;
      })}

      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:url" content={post.twitter_url || postUrl} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={stripHtmlTags(twitterDescription)} />
      <meta name="twitter:image" content={twitterImage} />

      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      <meta name="geo.position" content={geoPosition} />
      <meta name="ICBM" content={geoIcbm} />

      {/* Google Analytics if provided */}
      {post.google_analytics_id1 && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${post.google_analytics_id1}`}></script>
      )}
      {post.google_analytics_id1 && (
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${post.google_analytics_id1}');
          `
        }} />
      )}

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }} />
      ))}
    </Helmet>
  );
};

export default BlogSEO;
