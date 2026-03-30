import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['framer-motion'],
  },
  server: {
    hmr: {
      timeout: 30000, // Increase timeout to 30 seconds
    },
  },
});
