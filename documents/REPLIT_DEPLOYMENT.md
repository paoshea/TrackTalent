# Deploying TalentTrack on Replit

[Previous content remains unchanged up to vite.config.ts section...]

### 4. vite.config.ts Configuration
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      clientPort: 443
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  }
});
```

### 5. Required Dependencies
Add these to your package.json:
```

### 2. replit.nix
```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
  ];
}
```

### 3. .env.example
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. vite.config.ts Modifications
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      clientPort: 443
    }
  },  }
});
```

## Deployment Steps

### 1. Initial Setup
1. Create new Repl
   - Choose "Import from GitHub"
   - Enter repository URL
   - Select "Node.js" as language

2. Add Configuration Files
   - Create `.replit` file
   - Create `replit.nix` file
   - Update `vite.config.ts`

3. Environment Setup
   - Create new `.env` file
   - Copy values from `.env.example`
   - Add Supabase credentials

### 2. Dependencies Installation
```bash
# Install dependencies
npm install

# Install development dependencies
npm install -D @types/react @types/react-dom typescript
```

### 3. Build Configuration
1. Update package.json scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

2. Configure TypeScript:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 4. Database Configuration
1. Update Supabase Configuration:
   - Set environment variables in Replit
   - Configure CORS in Supabase dashboard
   - Set up row-level security policies

2. Database Migrations:
   - Run migrations through Supabase CLI
   - Verify database schema
   - Test database connections

### 5. Deployment
1. Run Development Server:
```bash
npm run dev
```

2. Build for Production:
```bash
npm run build
```

3. Preview Production Build:
```bash
npm run preview
```

## Environment Variables

### Required Variables
```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
VITE_APP_URL=your_replit_url
```

### Setting Variables in Replit
1. Navigate to "Secrets" tab
2. Add each environment variable
3. Format: KEY=value
4. Click "Add new secret"

## Troubleshooting Guide

### Common Issues

1. Build Failures
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

2. TypeScript Errors
```bash
# Regenerate TypeScript types
npm run generate-types
```

3. Vite Configuration
```bash
# Check Vite config
npm run dev -- --debug
```

### Performance Optimization

1. Code Splitting
```typescript
// Use dynamic imports for routes
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

2. Asset Optimization
```typescript
// Configure Vite for asset optimization
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  }
});
```

### 5. Additional Dependencies
Add these to your package.json:
```json
{
  "dependencies": {
    "@headlessui/react": "latest",
    "@heroicons/react": "latest",
    "react-router-dom": "latest"
  }
}
```

### Security Considerations

1. Environment Variables
- Never commit `.env` file
- Use Replit Secrets for sensitive data
- Rotate keys regularly

2. API Security
- Enable CORS restrictions
- Implement rate limiting
- Use secure WebSocket connections

## Maintenance

### Regular Tasks
1. Update Dependencies
```bash
npm update
npm audit fix
```

2. Monitor Performance
- Check Replit metrics
- Monitor API response times
- Review error logs

3. Backup Data
- Regular database backups
- Code repository backups
- Environment configuration backups

### Support Resources
- Replit Documentation: https://docs.replit.com
- Vite Documentation: https://vitejs.dev
- Supabase Documentation: https://supabase.io/docs
