# Cybaem Tech Website

## Overview

This is a corporate website for Cybaem Tech, an IT services and digital marketing company based in Pune, India. The site showcases their services including IT infrastructure, cybersecurity, cloud solutions, digital marketing, managed IT services, and computer AMC (Annual Maintenance Contract) services. The application includes a public-facing marketing website with a blog/resources section, plus an admin dashboard for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router DOM for client-side navigation
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **State Management**: React Query (TanStack Query) for server state, React hooks for local state
- **Forms**: React Hook Form with Zod validation

### Page Structure
- Static marketing pages (About, Services, Industries, Careers, Contact)
- Dynamic blog/resources section with CMS capabilities
- Admin dashboard at `/admin/*` routes with role-based access control
- SEO-optimized with dedicated SEO configuration per page (`src/SEO/seoConfig.ts`)

### Admin Dashboard
- Client-side authentication (development/demo only - needs backend auth for production)
- Content management for blog posts, media library, jobs, and CRM leads
- Protected routes with permission-based access control
- Located in `src/admin/` directory

### Backend Integration
- API proxy configured in Vite to forward `/api` requests to backend server on port 8000
- Backend expected at `http://localhost:8000` during development
- API base URL configured in `src/config/api.ts`

### Build Process
- Vite builds to `dist/` directory
- Post-build scripts (`post-build.js`, `copy-htaccess.js`) handle static HTML file processing
- Multiple standalone HTML files in root directory for SEO purposes (legacy/pre-rendered pages)

### Analytics Integration
- PostHog for product analytics (configured via environment variables)
- Google Analytics integration (`src/utils/gtag.ts`)

## External Dependencies

### Third-Party Services
- **PostHog**: Product analytics and user tracking (optional, requires `VITE_POSTHOG_API_KEY`)
- **Google Analytics**: Website traffic analytics
- **Google reCAPTCHA**: Form spam protection (types included)

### Cloud/Infrastructure
- Designed for deployment on web hosting with Apache (.htaccess support)
- Backend API expected on separate port (8000) - likely Node.js/Express based on proxy config

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `@radix-ui/*`: Accessible UI primitives
- `embla-carousel-react`: Carousel/slider functionality
- `react-helmet-async`: Dynamic SEO meta tag management
- `zod`: Schema validation
- `lucide-react` and `@tabler/icons-react`: Icon libraries
- `react-icons`: Additional icon sets (social media icons)

### Database
- Backend uses SQL migrations (see `backend/migrations/`)
- Jobs table with salary and department fields
- Phone number migration indicates CRM/contact storage
- Likely PostgreSQL or MySQL based on migration syntax

## CRM Leads Module

### Lead Status Values
- New
- Qualified - Proposal Sent
- Negotiation / In Discussion
- Win
- Lost
- Junk/Dead

### Lead Source Values
- Meta Ads
- Google Ads
- Website Form
- Referral
- Other

### Development Notes
- **Known Issue**: API calls through the Replit development proxy don't complete reliably due to Replit's external reverse proxy buffering responses from the chained Vite->PHP proxy. The backend API works correctly when tested directly (curl to port 8000 or 5000 works), but browser fetch requests hang.
- **Current Workaround**: Using hardcoded sample data in development mode. The actual API integration will work correctly when deployed to production or a dedicated server.
- **PHP Backend**: Located in `backend/` directory, runs on port 8000
- **API Endpoints**: `/backend/api/crm-leads.php` handles all CRM operations