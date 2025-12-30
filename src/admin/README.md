# Admin Dashboard Documentation

## Overview
This is a client-side admin dashboard for managing blog content and media for the Cybaem Tech website. It's designed for development and demo purposes.

## ⚠️ Security Notice
**IMPORTANT**: This dashboard uses client-side authentication and is suitable for development/demo environments only. For production use, you must implement:

1. **Backend Authentication**: Replace client-side auth with proper server-side authentication
2. **Password Hashing**: Implement bcrypt or similar for password security
3. **Secure Sessions**: Use HTTP-only cookies or JWT tokens instead of sessionStorage
4. **Database Integration**: Replace localStorage with a proper database
5. **API Layer**: Add a secure API layer for all CRUD operations

## Current Setup

### Authentication
- **Login URL**: `/admin/login`
- **Default Credentials**: 
  - Username: `admin`
  - Password: `admin123`

### Changing Admin Credentials
To change the admin login credentials, set these environment variables in your Replit Secrets:
```
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_password
```

### Features
1. **Dashboard Overview** (`/admin/dashboard`)
   - View stats (total articles, published posts, views, authors)
   - Quick access to recent content
   - Search and filter functionality

2. **Content Management** (`/admin/content`)
   - Create new blog posts
   - Edit existing posts
   - Delete posts
   - Filter by status (published/draft)
   - Support for different content types (Blog Post, Case Study, White Paper, eBook)

3. **Media Library** (`/admin/media`)
   - Upload image files directly (stored as base64 in localStorage)
   - Add images via URL
   - View all media
   - Copy image URLs for use in posts
   - Delete images
   - Supported formats: JPG, PNG, GIF, WebP (max 5MB)

4. **Settings** (`/admin/settings`)
   - View admin profile
   - Security settings documentation

## Data Storage
Currently, all data is stored in browser localStorage:
- **Blog Posts**: `adminBlogPosts`
- **Media Items**: `adminMedia`
- **Auth Session**: sessionStorage `adminAuth`

⚠️ This means:
- Data is browser-specific and will be lost if you clear browser data
- No synchronization across devices or browsers
- Not suitable for production use

## File Structure
```
src/admin/
├── components/
│   └── ProtectedRoute.tsx       # Route protection component
├── contexts/
│   └── AdminAuthContext.tsx     # Authentication context
├── layouts/
│   └── DashboardLayout.tsx      # Main dashboard layout with sidebar
├── pages/
│   ├── AdminLogin.tsx           # Login page
│   ├── Dashboard.tsx            # Dashboard overview
│   ├── ContentList.tsx          # Content listing
│   ├── ContentEditor.tsx        # Create/edit posts
│   ├── MediaLibrary.tsx         # Media management
│   └── Settings.tsx             # Settings page
└── README.md                    # This file
```

## Usage

### Creating a Blog Post
1. Go to `/admin/content`
2. Click "Create New Post"
3. Fill in the title, excerpt, and content
4. Set status (draft/published), type, author, and date
5. Optionally add a featured image URL
6. Click "Create Post"

### Managing Media
1. Go to `/admin/media`
2. Click "Add Image"
3. Choose upload method:
   - **Upload File**: Select an image file from your computer (max 5MB)
   - **Use URL**: Enter an external image URL
4. Enter a descriptive name for the image
5. Click "Upload Image" or "Add Image"
6. The image will be added to the library
7. Use "Copy URL" to get the image URL for blog posts

**Note**: Uploaded files are stored as base64 in localStorage. For production, implement proper file storage (cloud storage like AWS S3, Cloudinary, etc.)

### Accessing the Dashboard
1. Navigate to `/admin/login`
2. Enter credentials (default: admin/admin123)
3. You'll be redirected to the dashboard

## Integration with Main Website
To display admin-created blog posts on the main website, you'll need to:
1. Create a backend API to serve blog posts
2. Update the Blog page to fetch from the API instead of static data
3. Implement proper data persistence (database)

## Future Improvements for Production
- [ ] Implement backend API with Express/Node.js
- [ ] Add PostgreSQL database for data persistence
- [ ] Implement proper authentication with JWT
- [ ] Add password hashing with bcrypt
- [ ] Implement file upload for media (not just URLs)
- [ ] Add rich text editor for blog content
- [ ] Implement image optimization and storage
- [ ] Add user roles and permissions
- [ ] Implement audit logs
- [ ] Add rate limiting and security headers
