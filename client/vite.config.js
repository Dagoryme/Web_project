import { defineConfig } from 'vite'
// vite.config.js

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    watch: {
      usePolling: true
    }
  },
  optimizeDeps: {
    include: ['react-leaflet'],
  },
});

