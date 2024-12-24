# Supabase Guide for TalentTrack

## Overview
This guide provides comprehensive information about managing the TalentTrack platform's Supabase implementation, including schema updates, maintenance procedures, and best practices.

## Pending Tidy Up to thsi document
I notice several issues in the SUPABASE_GUIDE.md that need to be fixed:
- Duplicate sections (Environment Setup, Database Schema Management)
- Inconsistent heading levels (some ### 3. sections that should be #### 3.)
- Some sections are out of order
- Some content is repeated

## Environment Setup

### Required Environment Variables
```bash
# .env file
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Client Configuration
```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Environment Management
1. Development
   ```bash
   # Local development
   cp .env.example .env.local
   # Edit .env.local with development credentials
   ```

2. Staging
   ```bash
   # Staging environment
   cp .env.example .env.staging
   # Edit .env.staging with staging credentials
   ```

3. Production
   ```bash
   # Production environment
   cp .env.example .env.production
   # Edit .env.production with production credentials
   ```

### Security Considerations
1. Environment Variables
   - Never commit .env files
   - Use different keys per environment
   - Rotate keys periodically
   - Monitor key usage

2. Access Control
   - Use appropriate service roles
   - Implement RLS policies
   - Monitor access patterns
   - Regular security audits

## Database Schema Management

### Current Schema Structure
The database schema is organized into several key areas:
1. Core Tables (users, profiles, companies)
2. Job-Related Tables (jobs, applications, interviews)
3. Profile Enhancement Tables (skills, experience, education)
4. Communication Tables (messages, notifications)
5. Analytics Tables (activity_log, analytics_events)

### Schema Update Process

#### 1. Development Environment
```bash
# Create new migration
supabase migration new add_new_feature

# Apply migrations
supabase db reset

# Generate types
supabase gen types typescript --local > src/types/supabase.ts
```

#### 2. Testing Environment
```bash
# Push changes to testing
supabase db push --db-url=[TEST_DATABASE_URL]

# Verify changes
supabase db diff --db-url=[TEST_DATABASE_URL]
```

#### 3. Production Environment
```bash
# Review production migration
supabase db diff --db-url=[PROD_DATABASE_URL]

# Apply to production
supabase db push --db-url=[PROD_DATABASE_URL]
```

### Adding New Tables

1. Create Migration File
```sql
-- supabase/migrations/[timestamp]_add_new_table.sql
CREATE TABLE new_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  -- Add other columns
);

-- Add indexes
CREATE INDEX new_table_field_idx ON new_table(field_name);

-- Add RLS policies
ALTER TABLE new_table ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own data"
  ON new_table
  FOR SELECT
  USING (auth.uid() = user_id);
```

2. Update TypeScript Types
```typescript
// src/types/supabase.ts
export interface NewTable {
  id: string;
  created_at: string;
  updated_at: string;
  // Add other fields
}
```

3. Create Database Functions
```sql
-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON new_table
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Daily Maintenance Tasks

### 1. Monitoring
```sql
-- Check table sizes
SELECT 
  schemaname AS schema,
  relname AS table,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  pg_size_pretty(pg_relation_size(relid)) AS data_size,
  pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS external_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- Monitor active connections
SELECT * FROM pg_stat_activity WHERE state = 'active';

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes;
```

### 2. Performance Optimization
```sql
-- Analyze tables
ANALYZE table_name;

-- Update statistics
VACUUM ANALYZE table_name;

-- Identify slow queries
SELECT 
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

### 3. Backup Verification
```bash
# Verify backup status
supabase db dump -f backup.sql

# Test restore in development
supabase db reset --db-url=[DEV_DATABASE_URL]
psql [DEV_DATABASE_URL] < backup.sql
```

## Weekly Maintenance

### 1. Schema Review
- Check for unused indexes
- Analyze query patterns
- Review RLS policies
- Update documentation

### 2. Performance Tuning
- Analyze slow queries
- Optimize indexes
- Update statistics
- Review connection pools

### 3. Security Audit
- Review access patterns
- Check policy effectiveness
- Monitor auth logs
- Update permissions

## Monthly Tasks

### 1. Capacity Planning
- Review storage usage
- Analyze growth patterns
- Plan scaling needs
- Update resource limits

### 2. Compliance Check
- Audit data retention
- Verify encryption
- Check access logs
- Update documentation

## Best Practices

### 1. Schema Design
- Use UUIDs for primary keys
- Include created_at/updated_at
- Implement proper indexing
- Follow naming conventions

### 2. Security
- Always use RLS policies
- Implement least privilege
- Use parameterized queries
- Regular security audits

### 3. Performance
- Optimize queries
- Use appropriate indexes
- Regular VACUUM
- Monitor query plans

### 4. Development Workflow
- Use migrations for changes
- Test in development first
- Document all changes
- Regular backups

## Troubleshooting

### Common Issues

1. Slow Queries
```sql
-- Identify slow queries
SELECT * FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC;

-- Analyze query plan
EXPLAIN ANALYZE problematic_query;
```

2. Connection Issues
```sql
-- Check current connections
SELECT count(*) FROM pg_stat_activity;

-- Kill hanging connections
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle' AND state_change < now() - interval '1 hour';
```

3. Replication Lag
```sql
-- Check replication status
SELECT * FROM pg_stat_replication;

-- Monitor lag time
SELECT now() - pg_last_xact_replay_timestamp() AS replication_lag;
```

## Emergency Procedures

### 1. Database Recovery
```bash
# Quick backup
supabase db dump -f emergency_backup.sql

# Restore from backup
supabase db reset
psql [DATABASE_URL] < emergency_backup.sql
```

### 2. Performance Issues
```sql
-- Kill problematic queries
SELECT pg_cancel_backend(pid)
FROM pg_stat_activity
WHERE state = 'active'
AND now() - query_start > interval '5 minutes';

-- Reset statistics
SELECT pg_stat_statements_reset();
```
### Required Environment Variables
```bash
# .env file
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Client Configuration
```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Environment Management
1. Development
   ```bash
   # Local development
   cp .env.example .env.local
   # Edit .env.local with development credentials
   ```

2. Staging
   ```bash
   # Staging environment
   cp .env.example .env.staging
   # Edit .env.staging with staging credentials
   ```

3. Production
   ```bash
   # Production environment
   cp .env.example .env.production
   # Edit .env.production with production credentials
   ```

### Security Considerations
1. Environment Variables
   - Never commit .env files
   - Use different keys per environment
   - Rotate keys periodically
   - Monitor key usage

2. Access Control
   - Use appropriate service roles
   - Implement RLS policies
   - Monitor access patterns
   - Regular security audits


## Database Schema Management

### Current Schema Structure
The database schema is organized into several key areas:
1. Core Tables (users, profiles, companies)
2. Job-Related Tables (jobs, applications, interviews)
3. Profile Enhancement Tables (skills, experience, education)
4. Communication Tables (messages, notifications)
5. Analytics Tables (activity_log, analytics_events)

### Schema Update Process

#### 1. Development Environment
```bash
# Create new migration
supabase migration new add_new_feature

# Apply migrations
supabase db reset

# Generate types
supabase gen types typescript --local > src/types/supabase.ts
```

#### 2. Testing Environment
```bash
# Push changes to testing
supabase db push --db-url=[TEST_DATABASE_URL]

# Verify changes
supabase db diff --db-url=[TEST_DATABASE_URL]
```

### 3. Security Incidents
```sql
-- Revoke all access
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM public;

-- Reset user permissions
REASSIGN OWNED BY problem_user TO postgres;
DROP OWNED BY problem_user;
DROP USER problem_user;

## Schema Testing & Validation

### Automated Testing
```bash
# Run schema tests
npm run test:schema

# Test specific migration
npm run test:migration [migration_name]

# Validate types
npm run validate:types
```

### Test Cases
1. Data Integrity
```typescript
describe('Schema Integrity', () => {
  it('should maintain referential integrity', async () => {
    // Test foreign key constraints
  });
  
  it('should enforce unique constraints', async () => {
    // Test unique constraints
  });
});
```

2. Migration Reversibility
```typescript
describe('Migration Reversibility', () => {
  it('should successfully rollback changes', async () => {
    // Test migration down function
  });
});
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Database Schema CI

on:
  push:
    paths:
      - 'supabase/migrations/**'
      - 'src/types/supabase.ts'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Supabase CLI
        run: npm install -g supabase
      - name: Run Migrations
        run: supabase db reset
      - name: Run Tests
        run: npm run test:schema
```

### Deployment Pipeline
1. Development
   - Automatic migration application
   - Type generation
   - Schema tests

2. Staging
   - Migration dry run
   - Performance impact analysis
   - Data validation

3. Production
   - Manual approval required
   - Backup verification
   - Staged rollout

## Version Control Guidelines

### Branch Strategy
```
main
├── feature/add-new-table
├── feature/modify-schema
└── hotfix/fix-index
```

### Migration Naming
```
YYYYMMDDHHMMSS_descriptive_name.sql
Example: 20240315143022_add_user_preferences.sql
```

### Commit Messages
```
feat(schema): Add user preferences table
fix(schema): Correct index on applications table
docs(schema): Update table documentation
```

## Team Collaboration

### Code Review Process
1. Schema Changes
   - Impact assessment
   - Performance review
   - Security evaluation
   - Type safety check

2. Review Checklist
   - [ ] Migration is reversible
   - [ ] Types are updated
   - [ ] Tests are included
   - [ ] Documentation updated
   - [ ] Performance impact assessed

### Communication Channels
- Schema changes: #db-schema Slack channel
- Urgent issues: @database-team mention
- Documentation: Wiki updates
- Review requests: GitHub PR comments

### Change Management
1. Proposal Phase
   - RFC document
   - Team discussion
   - Impact analysis
   - Timeline planning

2. Implementation Phase
   - Development work
   - Peer review
   - Testing
   - Documentation

3. Deployment Phase
   - Staging verification
   - Production deployment
   - Monitoring
   - Feedback collection

## Documentation Standards

### Schema Documentation
```sql
-- Table: users
/*
 * Stores user account information
 * @updated 2024-03-15
 * @author DevTeam
 */
CREATE TABLE users (
  -- Unique identifier for the user
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Email address used for authentication
  email VARCHAR(255) UNIQUE NOT NULL,
  
  -- User role determines permissions
  role VARCHAR(50) NOT NULL CHECK (role IN ('candidate', 'employer', 'admin'))
);
```

### Type Documentation
```typescript
/**
 * Represents a user in the system
 * @property id - Unique identifier
 * @property email - User's email address
 * @property role - User's role in the system
 */
export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
}
```

### Migration Documentation
```sql
-- Migration: add_user_preferences
/*
 * Adds user preferences table for storing user settings
 * Dependencies: users table
 * Impact: Medium - New table creation
 */
```

## Monitoring & Alerts

### Performance Monitoring
```sql
-- Set up performance alerts
CREATE OR REPLACE FUNCTION alert_on_slow_queries()
RETURNS trigger AS $$
BEGIN
  IF NEW.mean_time > 1000 THEN
    PERFORM pg_notify(
      'slow_query_alert',
      json_build_object(
        'query', NEW.query,
        'mean_time', NEW.mean_time
      )::text
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Health Checks
```sql
-- Database health check
CREATE OR REPLACE FUNCTION check_database_health()
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'connection_count', (SELECT count(*) FROM pg_stat_activity),
    'database_size', pg_database_size(current_database()),
    'active_queries', (SELECT count(*) FROM pg_stat_activity WHERE state = 'active')
  ) INTO result;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
```

## Contact Information

### Support Channels
- Supabase Support: support@supabase.io
- Internal DevOps: devops@talenttrack.com
- Emergency Contact: emergency@talenttrack.com

### Documentation
- Supabase Docs: https://supabase.io/docs
- Internal Wiki: https://wiki.talenttrack.com/supabase
- Architecture Docs: https://wiki.talenttrack.com/architecture
