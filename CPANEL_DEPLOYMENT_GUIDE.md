# cPanel Deployment Guide - Brochure URL Configuration

## Problem Fixed
The brochure links were previously hardcoded to use port 8080, which doesn't work on cPanel. This has been updated to use environment variables for flexible configuration.

## How Brochure Links Work Now

The application now supports dynamic brochure URLs through environment variables:

- **Development**: Uses `VITE_BROCHURE_URL` environment variable (set to `http://localhost:8080`)
- **Production (cPanel)**: Uses custom `VITE_BROCHURE_URL` that you'll configure

The code automatically falls back to port 8080 if the environment variable is not set, but for cPanel deployments, you MUST set the correct URL.

## Deployment Steps for cPanel

### Option 1: Brochure on Same Domain (Recommended)

If the brochure is served from the same domain as your main site:

#### Step 1: Build the Brochure
```bash
cd broucher
npm run build
```
This creates a `dist` folder with the compiled brochure.

#### Step 2: Deploy to cPanel
1. In cPanel File Manager, navigate to your public_html folder
2. Create a new folder: `broucher`
3. Upload the contents of `broucher/dist` to `public_html/broucher`

#### Step 3: Set Environment Variable
In cPanel or your hosting environment, set:
```
VITE_BROCHURE_URL=https://yourdomain.com/broucher
```

#### Step 4: Rebuild Frontend
Rebuild your main application:
```bash
npm run build
```

The brochure links will now work as:
- Main brochure: `https://yourdomain.com/broucher`
- Cybersecurity brochure: `https://yourdomain.com/broucher?type=cybersecurity`

### Option 2: Brochure on Subdomain

If the brochure is on a separate subdomain (e.g., `broucher.yourdomain.com`):

#### Step 1: Deploy Brochure to Subdomain
1. Create subdomain in cPanel: `broucher.yourdomain.com`
2. Build and upload `broucher/dist` files to the subdomain's public folder

#### Step 2: Set Environment Variable
```
VITE_BROCHURE_URL=https://broucher.yourdomain.com
```

#### Step 3: Rebuild Frontend
```bash
npm run build
```

The brochure links will now work as:
- Main brochure: `https://broucher.yourdomain.com`
- Cybersecurity brochure: `https://broucher.yourdomain.com?type=cybersecurity`

## Environment Variable Configuration in cPanel

### Method 1: Using .env file (Recommended)
1. Create a `.env` file in your main application root
2. Add: `VITE_BROCHURE_URL=https://yourdomain.com/broucher`
3. Rebuild the application

### Method 2: Using cPanel Environment Variables
1. Log in to cPanel
2. Go to "Environment Variables" or "Setup Node.js App"
3. Add variable: `VITE_BROCHURE_URL` with value `https://yourdomain.com/broucher`
4. Restart your application

### Method 3: During Build Process
When building your application, you can set the variable:
```bash
VITE_BROCHURE_URL=https://yourdomain.com/broucher npm run build
```

## Testing the Fix

1. After deployment, navigate to:
   - Digital Marketing Services page → Click "Get Our Brochure"
   - Cybersecurity Services page → Click "Download Security Guide"

2. The brochure should open in a new tab without any port issues

3. PDF downloads should work normally

## Troubleshooting

### Brochure Links Still Show Port 8080
- Check that the environment variable is properly set
- Rebuild the application after setting the variable
- Clear browser cache (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)

### Cross-Origin Issues
- Ensure the brochure URL is from the same domain or has proper CORS headers
- If using a subdomain, check CORS configuration

### 404 on Brochure Page
- Verify the brochure files are in the correct directory
- Check file permissions (should be readable by web server)
- Confirm the path in environment variable matches actual file location

## Modified Files

The following files were updated to support dynamic brochure URLs:
- `src/pages/DigitalMarketing.tsx` - Updated "Get Our Brochure" button
- `src/pages/CybersecurityServices.tsx` - Updated "Download Security Guide" button

Both now use: `import.meta.env.VITE_BROCHURE_URL` for the brochure URL

## Development vs Production

### Development (localhost)
- Environment Variable: `VITE_BROCHURE_URL=http://localhost:8080`
- Access: `http://localhost:5000` (main site)
- Brochure: `http://localhost:8080` (separate Vite server)

### Production (cPanel)
- Set appropriate environment variable for your hosting
- Both main site and brochure served from same domain/subdomain
- No port number in URLs (uses standard 80/443)

---

For questions or issues, refer to the deployment configuration in your cPanel control panel.
