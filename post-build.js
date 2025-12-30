import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Post-build script to copy and update standalone HTML files
 * with correct asset references from Vite build output
 */

const DIST_DIR = path.join(__dirname, 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');
const PUBLIC_DIR = path.join(__dirname, 'public');
const DIST_PUBLIC_DIR = path.join(DIST_DIR, 'public');

// Function to recursively copy directory
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        
        if (fs.statSync(srcFile).isDirectory()) {
            copyDir(srcFile, destFile);
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });
}

// List of standalone HTML files to process (excluding index.html and copies)
const HTML_FILES = [
    'AIDataAnalytics.html',
    'CloudSolutions.html',
    'ComputerAMCServices.html',
    'CybersecurityServices.html',
    'DigitalMarketing.html',
    'EnterpriseSolutions.html',
    'ITAugmentation.html',
    'LifeAtCybaemTech.html',
    'ManagedServices.html',
    'about.html',
    'contact.html',
    'Careers.html',
    'Industries.html',
    'Leadership.html',
    'Resources.html'
];

async function findAssetFiles() {
    console.log('🔍 Finding built asset files...');

    // Find the main JS and CSS files
    const jsFiles = await glob('index-*.js', { cwd: ASSETS_DIR });
    const cssFiles = await glob('index-*.css', { cwd: ASSETS_DIR });

    if (jsFiles.length === 0 || cssFiles.length === 0) {
        throw new Error('Could not find built asset files in dist/assets/');
    }

    const jsFile = jsFiles[0];
    const cssFile = cssFiles[0];

    console.log(`✅ Found JS: ${jsFile}`);
    console.log(`✅ Found CSS: ${cssFile}`);

    return { jsFile, cssFile };
}

function updateHTMLContent(htmlContent, jsFile, cssFile) {
    // Replace CSS reference
    htmlContent = htmlContent.replace(
        /<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/g,
        `<link rel="stylesheet" crossorigin href="/assets/${cssFile}">`
    );

    // Replace JS reference
    htmlContent = htmlContent.replace(
        /<script[^>]*src="\/assets\/index-[^"]+\.js"[^>]*><\/script>/g,
        `<script type="module" crossorigin src="/assets/${jsFile}"></script>`
    );

    return htmlContent;
}

async function processHTMLFiles() {
    console.log('\n📦 Processing standalone HTML files...\n');

    const { jsFile, cssFile } = await findAssetFiles();

    let processedCount = 0;
    let skippedCount = 0;

    for (const htmlFile of HTML_FILES) {
        const sourcePath = path.join(__dirname, htmlFile);
        const destPath = path.join(DIST_DIR, htmlFile);

        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
            console.log(`⚠️  Skipped: ${htmlFile} (not found)`);
            skippedCount++;
            continue;
        }

        try {
            // Read the HTML file
            let htmlContent = fs.readFileSync(sourcePath, 'utf-8');

            // Update asset references
            htmlContent = updateHTMLContent(htmlContent, jsFile, cssFile);

            // Write to dist folder
            fs.writeFileSync(destPath, htmlContent, 'utf-8');

            console.log(`✅ Processed: ${htmlFile}`);
            processedCount++;
        } catch (error) {
            console.error(`❌ Error processing ${htmlFile}:`, error.message);
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Processed: ${processedCount} files`);
    console.log(`   ⚠️  Skipped: ${skippedCount} files`);
    console.log(`\n✨ Done! Your HTML files are ready for cPanel deployment.\n`);
}

// Copy entire public folder to dist
function copyPublicFolder() {
    console.log('📋 Copying public folder to dist...');
    
    if (fs.existsSync(PUBLIC_DIR)) {
        try {
            copyDir(PUBLIC_DIR, DIST_PUBLIC_DIR);
            console.log('✅ Public folder copied to dist/public/\n');
        } catch (error) {
            console.error('❌ Error copying public folder:', error.message);
        }
    } else {
        console.log(`⚠️  Public folder not found at ${PUBLIC_DIR}\n`);
    }
}

// Run the scripts
async function runAll() {
    await processHTMLFiles();
    copyPublicFolder();
}

runAll().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
