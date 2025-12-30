import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig, SEOConfig } from './seoConfig';

interface SEOProps {
    page?: string;
}

interface SEOComponentProps extends SEOConfig { }

const SEOComponent: React.FC<SEOComponentProps> = ({
    title,
    description,
    keywords,
    canonical,
    ogImage,
    hrefLangs = [],
    additionalTags = [],
    schema = []
}) => {
    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Title and Description */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />

            {/* Hreflang Links */}
            {hrefLangs.map((hrefLang, index) => (
                <link
                    key={index}
                    rel="alternate"
                    href={hrefLang.href}
                    hrefLang={hrefLang.hrefLang}
                />
            ))}

            {/* OpenGraph Image */}
            <meta property="og:image" content={ogImage} />
            <meta name="twitter:image" content={ogImage} />

            {/* Additional Tags */}
            {additionalTags.map((tag, index) => {
                if (tag.name) {
                    return <meta key={index} name={tag.name} content={tag.content} />;
                } else if (tag.property) {
                    return <meta key={index} property={tag.property} content={tag.content} />;
                }
                return null;
            })}

            {/* JSON-LD Structured Data */}
            {schema.map((schemaItem, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schemaItem)
                    }}
                />
            ))}
        </Helmet>
    );
};

// Page route mappings
const pageRouteMappings: Record<string, string> = {
    'home': '/',
    'about': '/about',
    'services': '/services',
    'contact': '/contact',
    'contact-success': '/contact-success',
    'solutions': '/solutions',
    'resources': '/resources'
};

export const SEO: React.FC<SEOProps> = ({ page = 'home' }) => {
    const route = pageRouteMappings[page] || '/';
    const config = seoConfig[route];

    // Debug logging
    console.log('SEO Component - Page:', page, 'Route:', route, 'Config found:', !!config);

    if (!config) {
        console.warn(`SEO configuration not found for page: ${page} (route: ${route})`);
        return null;
    }

    return <SEOComponent {...config} />;
};

export default SEO;