const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, 'dist', 'avirbhav-web', 'browser');
const indexHtmlPath = path.join(browserDir, 'index.html');
const htaccessSource = path.join(__dirname, 'public', '.htaccess');
const htaccessDest = path.join(browserDir, '.htaccess');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[post-build] Error: index.html not found in', browserDir);
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Copy 404.html (for static hosting fallbacks like GitHub Pages, Cloudflare Pages, etc.)
fs.writeFileSync(path.join(browserDir, '404.html'), indexContent, 'utf8');
console.log('[post-build] Created 404.html for static fallback');

// 2. Create admin/index.html (so direct /admin access succeeds on static servers even without rewrites)
const adminDir = path.join(browserDir, 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}
fs.writeFileSync(path.join(adminDir, 'index.html'), indexContent, 'utf8');
console.log('[post-build] Created admin/index.html');

// 3. Create login/index.html
const loginDir = path.join(browserDir, 'login');
if (!fs.existsSync(loginDir)) {
  fs.mkdirSync(loginDir, { recursive: true });
}
fs.writeFileSync(path.join(loginDir, 'index.html'), indexContent, 'utf8');
console.log('[post-build] Created login/index.html');

// 4. Create static SPA route fallbacks: about, career, jobs
const routes = ['about', 'career', 'jobs', 'team'];
routes.forEach(route => {
  const dir = path.join(browserDir, route);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'index.html'), indexContent, 'utf8');
  console.log(`[post-build] Created ${route}/index.html`);
});

// 5. Copy .htaccess to browser dist folder for Hostinger / Apache / LiteSpeed
if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('[post-build] Copied .htaccess to browser output');
}

console.log('[post-build] All production SPA routing assets prepared successfully!');
