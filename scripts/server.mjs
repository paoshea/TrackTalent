import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function startServer() {
  try {
    const server = await createServer({
      root: resolve(__dirname, '..'),
      server: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
      },
      configFile: resolve(__dirname, '../vite.config.ts'),
    });

    await server.listen();

    console.log(`Server started at http://localhost:${server.config.server.port}`);
    
    // Handle shutdown gracefully
    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, () => {
        server.close().then(() => {
          console.log('Server stopped');
          process.exit(0);
        });
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}
