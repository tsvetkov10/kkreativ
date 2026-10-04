import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {
      let cssContent = '';
      const cssFileNames = [];
      for (const [fileName, file] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && file.type === 'asset') {
          cssContent += file.source + '\n';
          cssFileNames.push(fileName);
        }
      }

      const htmlFile = bundle['index.html'];
      if (htmlFile && htmlFile.type === 'asset' && cssContent) {
        let html = htmlFile.source.toString();
        for (const cssName of cssFileNames) {
          const escaped = cssName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`<link[^>]+href="[/]?[^"]*${escaped}"[^>]*>`, 'g');
          html = html.replace(regex, '');
        }
        html = html.replace(/<link[^>]+rel="stylesheet"[^>]+href="\/assets\/[^"]+\.css"[^>]*>/g, '');
        html = html.replace('</head>', `<style>${cssContent}</style></head>`);
        htmlFile.source = html;
        for (const cssName of cssFileNames) {
          delete bundle[cssName];
        }
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@supabase')) {
            return 'vendor-supabase';
          }
          if (id.includes('react-router')) {
            return 'vendor-router';
          }
        }
      }
    }
  }
});
