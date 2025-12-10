import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        estructura: resolve(__dirname, 'estructura.html'),
        meet_pau: resolve(__dirname, 'meet_pau.html'),
        ops_panel: resolve(__dirname, 'ops_panel.html'),
        pau_emotion: resolve(__dirname, 'pau_emotion.html'),
        tryon_dashboard: resolve(__dirname, 'tryon_dashboard.html'),
        tryonme_landing: resolve(__dirname, 'tryonme_landing.html'),
        commits: resolve(__dirname, 'commits.html')
      }
    }
  },
  publicDir: 'public'
});
