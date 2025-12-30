
📋 CPANEL DEPLOYMENT INSTRUCTIONS

1. BUILD THE PROJECT:
   npm run build

2. UPLOAD FILES TO CPANEL:
   
   a) Upload ALL files from the 'dist' folder to your public_html/ directory
   
   b) Upload the 'backend' folder to public_html/backend/
   
   c) Create an 'uploads' directory in public_html/ and upload all files from 'public/uploads/' to it
   
   d) Copy 'public_html.htaccess' to public_html/.htaccess (rename it!)

3. SET UP DATABASE:
   - Import your database or run setup scripts through cPanel phpMyAdmin
   - Update backend/config/database.php with your cPanel database credentials

4. SET PERMISSIONS:
   - Set 755 permissions on the uploads/ directory
   - Set 644 permissions on uploaded image files

5. VERIFY IMAGE PATHS:
   Your blog images should now be accessible at:
   https://yourdomain.com/uploads/filename.jpg

6. TEST:
   - Check if your blog images are displaying
   - Verify that new uploads work correctly

⚠️  IMPORTANT NOTES:
- Make sure the uploads/ directory exists in your public_html/ folder
- Ensure the .htaccess file is properly renamed (no 'public_html' prefix)
- Check that your database connection settings are correct for cPanel

If images still don't show:
1. Check browser network tab for 404 errors
2. Verify file permissions on server
3. Check if uploads directory path is correct
4. Confirm database contains correct image URLs
