import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { startServer } from './scripts/server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildApp() {
  try {
    // Build the application
    await build({
      root: __dirname,
      configFile: resolve(__dirname, 'vite.config.ts'),
    });

    // Start the server if in production
    if (process.env.NODE_ENV === 'production') {
      await startServer();
    }

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();
