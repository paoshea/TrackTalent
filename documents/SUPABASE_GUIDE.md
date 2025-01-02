# Supabase Integration Guide

This guide explains how to set up and use Supabase in both development and production environments.

## Quick Start

1. Initialize the development environment:
```bash
./scripts/setup-supabase.sh
```

2. Start the development server:
```bash
npm run dev
```

## Development Environment

### Port Configuration

The development environment uses dynamic port allocation to avoid conflicts:

- API: Default 54321 (falls back to next available)
- Database: Default 54322 (falls back to next available)
- Studio: Default 54323 (falls back to next available)
- Inbucket: Default 54324 (falls back to next available)
- SMTP: Default 54325 (falls back to next available)
- POP3: Default 54326 (falls back to next available)
- Analytics: Default 54327 (falls back to next available)
- Vector: Default 54328 (falls back to next available)

The development server (Vite) runs on port 3000 by default and will automatically find the next available port if 3000 is in use.

### Setup Process

The setup script (`scripts/setup-supabase.sh`) handles:

1. Dynamic port allocation
2. Container cleanup
3. Database initialization
4. Schema migration
5. Seed data population

### Available Endpoints

After setup, the following endpoints are available:

- API: http://localhost:[API_PORT]
- GraphQL: http://localhost:[API_PORT]/graphql/v1
- Studio: http://localhost:[STUDIO_PORT]
- Inbucket: http://localhost:[INBUCKET_PORT]
- Database: postgresql://postgres:postgres@localhost:[DB_PORT]/postgres

### Demo Accounts

Pre-configured demo accounts for testing:

- Candidate: candidate@demo.com
- Employer: employer@demo.com
- Partner: partner@demo.com

## Database Structure

### Core Tables

1. profiles
   - Created automatically via trigger on auth.users
   - Stores user profile information
   - Links to auth.users via foreign key

2. companies
   - Stores company information
   - Used by employers and partners

3. jobs
   - Stores job listings
   - Links to companies

4. applications
   - Tracks job applications
   - Links candidates to jobs
   - Includes timeline events

### Migrations

Located in `supabase/migrations/`:
- 20240101000000_create_profiles.sql
- 20240101000001_create_companies.sql
- 20240101000002_create_jobs.sql
- 20240101000003_create_applications.sql

### Seed Data

Located in `supabase/seed.sql`:
- Creates demo users in auth.users
- Updates profiles via trigger
- Adds sample companies and jobs
- Creates demo applications

## Troubleshooting

### Common Issues

1. Port Conflicts
   - The setup script automatically finds available ports
   - Check running Docker containers if ports are blocked
   - Use `docker ps` to identify conflicting services

2. Database Connection Issues
   - Ensure Docker is running
   - Check container status with `docker ps`
   - Verify port availability

3. Migration Failures
   - Check migration order in supabase/migrations/
   - Verify foreign key relationships
   - Check for duplicate records in seed data

### Reset Process

If you need to reset the development environment:

1. Stop all services:
```bash
supabase stop
```

2. Clean up Docker resources:
```bash
docker rm -f $(docker ps -a -q --filter name=supabase)
docker volume rm $(docker volume ls -q --filter name=supabase)
```

3. Run setup script:
```bash
./scripts/setup-supabase.sh
```

## Production Setup

### Environment Variables

Production requires different environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### Key Differences from Development

1. Authentication
   - Production uses real email delivery
   - OAuth providers need proper configuration
   - JWT secrets are properly secured

2. Database
   - Connection pooling is enabled
   - Proper SSL configuration
   - Regular backups enabled

3. Storage
   - S3 or equivalent configured
   - Proper bucket policies
   - CDN integration if needed

4. Security
   - Proper RLS policies
   - SSL/TLS enabled
   - Rate limiting configured

### Migration Process

1. Test migrations locally:
```bash
supabase db reset
```

2. Apply to production:
```bash
supabase db push
```

## Best Practices

1. Development Workflow
   - Always use setup script for consistent environment
   - Test migrations locally before production
   - Use seed data for testing
   - Keep development and production configs separate

2. Database Management
   - Follow migration naming convention
   - Test triggers and functions locally
   - Backup data before migrations
   - Use transactions for complex changes

3. Security
   - Never commit sensitive keys
   - Use RLS policies
   - Test auth flows thoroughly
   - Monitor access patterns

4. Performance
   - Index frequently queried columns
   - Monitor query performance
   - Use connection pooling
   - Cache when appropriate

## Monitoring and Maintenance

1. Local Development
   - Studio provides monitoring interface
   - Check Docker container health
   - Monitor database connections
   - Watch for migration issues

2. Production
   - Set up alerts
   - Monitor performance
   - Track usage metrics
   - Regular backups
   - Update dependencies

Remember to always test changes in development before applying to production.
