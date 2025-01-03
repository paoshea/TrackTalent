import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-ui': ['lucide-react', 'tailwindcss'],
                    'vendor-utils': ['date-fns', '@supabase/supabase-js'],
                }
            }
        },
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            'components': resolve(__dirname, 'src/components'),
            'utils': resolve(__dirname, 'src/utils'),
            'hooks': resolve(__dirname, 'src/hooks'),
            'types': resolve(__dirname, 'src/types'),
            'services': resolve(__dirname, 'src/services'),
            'contexts': resolve(__dirname, 'src/contexts'),
            'config': resolve(__dirname, 'src/config')
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
