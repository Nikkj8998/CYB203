import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    // Copy public folder to dist
    copyPublicDir: true,
    // Output directory for production build
    outDir: 'dist',
    emptyOutDir: false, // Don't empty outDir to preserve copied public files
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    hmr: {
      overlay: false
    },
    allowedHosts: true,
    // Proxy enabled - forwards /api requests to backend server on port 8000
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        headers: {
          Connection: 'close'
        },
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Proxy response:', req.url, proxyRes.statusCode);
            // Force connection close for Replit proxy compatibility
            proxyRes.headers['connection'] = 'close';
            delete proxyRes.headers['keep-alive'];
          });
        }
      },
      '/backend': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        timeout: 30000,
        headers: {
          Connection: 'close'
        },
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Proxy response:', req.url, proxyRes.statusCode);
            // Force connection close for Replit proxy compatibility
            proxyRes.headers['connection'] = 'close';
            delete proxyRes.headers['keep-alive'];
          });
        }
      },
      '/public/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: false
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: false
      }
    },
    watch: {
      ignored: ['**/.cache/**', '**/node_modules/.cache/**']
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // Serve static HTML files during development by rewriting URL
    mode === 'development' && {
      name: 'serve-static-html-dev',
      configureServer(server: any) {
        server.middlewares.use((req: any, res: any, next: any) => {
          const url = req.url || '';
          const pathname = url.split('?')[0];

          // Skip API/backend routes - let proxy handle them
          if (pathname.startsWith('/api') || pathname.startsWith('/backend') || pathname.startsWith('/uploads')) {
            return next();
          }

          const routeMap: Record<string, string> = {
            '/digital-marketing': '/DigitalMarketing.html',
            '/cloud-solutions': '/CloudSolutions.html',
            '/ai-data-analytics': '/AIDataAnalytics.html',
            '/computer-amc-services': '/ComputerAMCServices.html',
            '/cybersecurity-services': '/CybersecurityServices.html',
            '/enterprise-solutions': '/EnterpriseSolutions.html',
            '/managed-services': '/ManagedServices.html',
            '/it-augmentation': '/ITAugmentation.html',
            '/life-at-cybaemtech': '/LifeAtCybaemTech.html',
            '/resources': '/Resources.html',
            '/about': '/about.html',
            '/contact': '/contact.html',
            '/careers': '/Careers.html',
            '/industries': '/Industries.html',
            '/leadership': '/Leadership.html',
          };

          if (routeMap[pathname]) {
            req.url = routeMap[pathname];
          }

          next();
        });
      },
      transformIndexHtml(html: string) {
        // Remove production asset references (which cause 404s in dev)
        html = html.replace(/<link rel="stylesheet"[^>]*href="\/assets\/index-[^"]+\.css"[^>]*>/g, '');
        html = html.replace(/<script[^>]*src="\/assets\/index-[^"]+\.js"[^>]*><\/script>/g, '');

        // Inject dev script if not present
        if (!html.includes('/src/main.tsx')) {
          html = html.replace('</body>', '  <script type="module" src="/src/main.tsx"></script>\n</body>');
        }
        return html;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
