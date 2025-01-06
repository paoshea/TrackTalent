# Netlify Deployment Guide

## Overview

This guide covers the setup and deployment process for the TrackTalent application on Netlify, including Supabase integration, environment configuration, and build settings.

## Prerequisites

- Netlify account
- Supabase project
- Git repository connected to Netlify

## Configuration Files

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  VITE_SUPABASE_URL = "your-supabase-project-url"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/auth/*"
  to = "/.netlify/functions/auth-callback"
  status = 200

[template.environment]
  VITE_SUPABASE_URL = "URL of your Supabase project"
  VITE_SUPABASE_ANON_KEY = "Your Supabase project's anon key"
```

### Environment Variables

Required environment variables in Netlify:

1. `VITE_SUPABASE_URL`: Your Supabase project URL
2. `VITE_SUPABASE_ANON_KEY`: Your Supabase project's anon/public key
3. `VITE_STORAGE_BUCKET`: Storage bucket name for file uploads
4. `VITE_MAX_UPLOAD_SIZE`: Maximum file upload size (default: 5242880)

Set these in Netlify's dashboard under:
Settings > Build & Deploy > Environment > Environment variables

## Deployment Setup

### 1. Connect Repository

1. Log in to Netlify Dashboard
2. Click "New site from Git"
3. Select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

### 2. Configure Domain

1. Go to Settings > Domain Management
2. Add custom domain or use Netlify subdomain
3. Enable HTTPS

### 3. Configure Build Settings

1. Go to Settings > Build & Deploy
2. Verify build settings:
   ```
   Base directory: /
   Build command: npm run build
   Publish directory: dist
   ```

## Supabase Setup

### 1. Database Setup

Before deploying, ensure your Supabase database is properly configured:

```bash
# From your local development environment
cd supabase
supabase db push
```

This will apply all migrations to your production database.

### 2. Database Migrations

The following script ensures your database schema is up to date:

```bash
#!/bin/bash
# scripts/setup-supabase.sh

# Apply migrations
echo "Applying database migrations..."
supabase db reset --db-url $DATABASE_URL

# Verify migrations
echo "Verifying database schema..."
supabase db verify
```

### 3. Authentication Configuration

1. In Supabase Dashboard:
   - Go to Authentication > Settings
   - Add your Netlify domain to "Site URL"
   - Add redirect URLs:
     ```
     https://your-netlify-domain.netlify.app/auth/callback
     https://your-netlify-domain.netlify.app/auth/signin
     ```

2. Update auth callback function:
   ```typescript
   // netlify/functions/auth-callback.ts
   export const handler: Handler = async (event) => {
     // ... existing code ...
   };
   ```

## Build Process

The build process follows these steps:

1. Install dependencies
2. Build the application
3. Generate service worker
4. Deploy to Netlify

```bash
# Build commands executed by Netlify
npm install
npm run build
```

## Post-Deployment Verification

After deployment, verify:

1. Application loads successfully
2. Authentication works
3. Database connections are successful
4. File uploads work
5. All redirects function correctly

## Troubleshooting

### Common Issues

1. Build Failures
   - Check Node.js version
   - Verify environment variables
   - Review build logs

2. Authentication Issues
   - Verify Supabase URL and anon key
   - Check redirect URLs in Supabase
   - Verify auth callback function

3. Database Connection Issues
   - Check Supabase project status
   - Verify database URL
   - Review security rules

### Logs and Monitoring

Access logs in Netlify:
1. Go to your site's dashboard
2. Navigate to Deploys
3. Click on a deploy
4. View build log

## Maintenance

### Regular Tasks

1. Update dependencies
2. Monitor error logs
3. Review security settings
4. Backup database
5. Update environment variables as needed

### Database Migrations

When updating the database schema:

1. Create new migration:
   ```bash
   supabase migration new your_migration_name
   ```

2. Apply migration:
   ```bash
   supabase db reset
   ```

3. Commit migration files:
   ```bash
   git add supabase/migrations/*
   git commit -m "Add database migration"
   ```

## Security Considerations

1. Environment Variables
   - Never commit sensitive values
   - Use Netlify's environment variable encryption
   - Rotate keys periodically

2. Authentication
   - Configure proper redirect URLs
   - Set up proper role-based access
   - Enable required security features

3. Database
   - Use row level security
   - Implement proper access policies
   - Regular security audits

## Best Practices

1. Always test builds locally before deploying
2. Use staging environment for testing
3. Keep dependencies updated
4. Monitor build times and optimize
5. Use proper caching strategies
6. Implement proper error handling
7. Regular backups of data and configurations

## Useful Commands

```bash
# Deploy manually
netlify deploy

# Test functions locally
netlify dev

# Check build status
netlify status

# View deploy logs
netlify logs

# List environment variables
netlify env:list
```

## Netlify Functions

### Function Configuration

The project uses Netlify Functions for server-side operations, particularly for auth callback handling:

1. Function Location:
   ```
   netlify/
   ├── functions/
   │   ├── auth-callback.ts
   │   └── tsconfig.json
   ```

2. Function TypeScript Configuration:
   ```json
   // netlify/functions/tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2019",
       "module": "commonjs",
       "lib": ["ES2019"],
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "baseUrl": ".",
       "paths": {
         "*": ["*", "../../node_modules/*"]
       }
     },
     "include": ["./**/*.ts"],
     "exclude": ["node_modules"]
   }
   ```

### Function Dependencies

Required packages for Netlify Functions:
```json
{
  "dependencies": {
    "@netlify/functions": "^2.0.0",
    "@supabase/supabase-js": "^2.0.0"
  }
}
```

## Supabase Integration

### Database Schema Setup

Before deploying to Netlify, ensure your Supabase database schema is properly configured:

1. Run migrations:
   ```bash
   supabase db reset
   ```

2. Verify tables:
   ```sql
   -- Required tables
   auth.users
   public.profiles
   public.applications
   ```

3. Check triggers:
   ```sql
   -- Verify handle_new_user trigger
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```

### Storage Configuration

1. Create required buckets:
   ```bash
   supabase storage create-bucket resumes --public=false
   ```

2. Set up storage policies:
   ```sql
   -- Allow authenticated users to upload resumes
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'resumes');
   ```

### Environment Synchronization

Ensure environment variables match between local development and Netlify:

1. Local development (.env):
   ```
   VITE_SUPABASE_URL=http://localhost:54321
   VITE_SUPABASE_ANON_KEY=your-local-anon-key
   ```

2. Netlify production:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-production-anon-key
   ```

## Deployment Checklist

Before deploying to production:

1. Database
   - [ ] All migrations are applied
   - [ ] RLS policies are configured
   - [ ] Triggers are active
   - [ ] Storage buckets are created

2. Authentication
   - [ ] Redirect URLs are configured
   - [ ] Auth callback function is deployed
   - [ ] Email templates are set up

3. Environment
   - [ ] All required variables are set
   - [ ] Production URLs are configured
   - [ ] SSL/HTTPS is enabled

4. Build
   - [ ] Dependencies are up to date
   - [ ] Build command is correct
   - [ ] Publish directory is set

5. Functions
   - [ ] TypeScript configuration is correct
   - [ ] Dependencies are installed
   - [ ] Function permissions are set

## Additional Resources

- [Netlify CLI Documentation](https://cli.netlify.com/)
- [Supabase Documentation](https://supabase.io/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [TypeScript Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
