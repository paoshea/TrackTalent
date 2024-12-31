import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    strictPort: false, // Allow Vite to try other ports if 3000 is taken
  },
  preview: {
    port: 3000,
    strictPort: false, // Also apply to preview server
  }
});
