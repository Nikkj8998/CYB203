import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copy .htaccess files to the dist directory for deployment
 */

const DIST_DIR = path.join(__dirname, 'dist');

function copyHtaccessFiles() {
    console.log('📋 Copying .htaccess files to dist...');

    // Copy the main .htaccess file
    const mainHtaccessSource = path.join(__dirname, '.htaccess');
    const mainHtaccessDest = path.join(DIST_DIR, '.htaccess');

    // Copy the public_html.htaccess as a backup/reference
    const publicHtmlHtaccessSource = path.join(__dirname, 'public_html.htaccess');
    const publicHtmlHtaccessDest = path.join(DIST_DIR, 'public_html.htaccess');

    try {
        // Ensure dist directory exists
        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR, { recursive: true });
        }

        // Copy main .htaccess file
        if (fs.existsSync(mainHtaccessSource)) {
            fs.copyFileSync(mainHtaccessSource, mainHtaccessDest);
            console.log('✅ Copied .htaccess to dist/');
        } else {
            console.log('⚠️  Main .htaccess file not found');
        }

        // Copy public_html.htaccess as reference
        if (fs.existsSync(publicHtmlHtaccessSource)) {
            fs.copyFileSync(publicHtmlHtaccessSource, publicHtmlHtaccessDest);
            console.log('✅ Copied public_html.htaccess to dist/ (for deployment reference)');
        } else {
            console.log('⚠️  public_html.htaccess file not found');
        }

        console.log('\n✨ .htaccess files copied successfully!\n');
    } catch (error) {
        console.error('❌ Error copying .htaccess files:', error.message);
        process.exit(1);
    }
}

// Run the copy process
copyHtaccessFiles();