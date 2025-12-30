
UPLOADS DIRECTORY STRUCTURE FOR CPANEL:

Current structure (local):
public/uploads/filename.jpg

Should be on cPanel:
public_html/uploads/filename.jpg

URLs in database should be:
/uploads/filename.jpg (NOT /public/uploads/filename.jpg)

The updated media.php will automatically detect cPanel environment and use the correct paths.
