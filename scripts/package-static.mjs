// Packages the pre-rendered output into ./dist-static, ready to upload to
// public_html on cPanel / HostGator.
import { cp, mkdir, rm, writeFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const candidates = [
  resolve(root, ".output/public"),
  resolve(root, "dist/client"),
  resolve(root, ".tanstack/start/build/client-dist"),
];

let source;
for (const dir of candidates) {
  try {
    await access(dir);
    source = dir;
    break;
  } catch {
    /* keep looking */
  }
}

if (!source) {
  console.error("Could not find the build output. Looked in:\n  " + candidates.join("\n  "));
  process.exit(1);
}

const target = resolve(root, "dist-static");
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

const htaccess = `# Apache config for cPanel / HostGator
Options -MultiViews
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Force HTTPS
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !https
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

  # Serve the pre-rendered HTML for a folder route (/planos -> /planos/index.html)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.+?)/?$ /$1/index.html [L]

  # Fallback: anything else goes to the SPA shell
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header unset X-Powered-By
  Header always unset Server
  # Hashed build assets never change
  <FilesMatch "\\.(js|css|woff2|png|jpe?g|svg|webp|avif)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(html|xml|json|txt)$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

# Block access to sensitive files and hide directory listings
Options -Indexes
<FilesMatch "(^\\.(env|git).*|composer\\.(json|lock)|package(-lock)?\\.json|.*\\.(bak|config|ini|log|sh|sql|ts|map)$)">
  Require all denied
</FilesMatch>
<Files ".htaccess">
  Require all denied
</Files>
ServerSignature Off

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>

# Custom 404 (served by the SPA shell)
ErrorDocument 404 /index.html
`;

await writeFile(resolve(target, ".htaccess"), htaccess, "utf8");

// Static sitemap.xml (the server route version does not exist on static hosting).
const SITE_URL = process.env.SITE_URL ?? "https://www.seudominio.com.br";
const ROUTES = [
  ["/", "weekly", "1.0"],
  ["/planos", "weekly", "0.9"],
  ["/servicos", "monthly", "0.8"],
  ["/cobertura", "monthly", "0.8"],
  ["/sobre-nos", "monthly", "0.6"],
  ["/contato", "monthly", "0.7"],
  ["/formulario", "monthly", "0.8"],
  ["/blog", "weekly", "0.6"],
  ["/perguntas-frequentes", "monthly", "0.5"],
  ["/area-do-assinante", "monthly", "0.5"],
  ["/lgpd", "yearly", "0.3"],
  ["/politica-de-privacidade", "yearly", "0.3"],
  ["/termo-de-responsabilidade", "yearly", "0.3"],
];
const base = SITE_URL.replace(/\/$/, "");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(([path, changefreq, priority]) => `  <url>
    <loc>${base}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(target, "sitemap.xml"), sitemap, "utf8");

console.log(`\nStatic site ready in dist-static/ (from ${source.replace(root + "/", "")})`);
console.log("Upload the CONTENTS of dist-static/ (including .htaccess) to public_html/\n");
