# TalentTrack Database Schema

This document outlines the database schema design for the TalentTrack platform, including tables, relationships, and indexes.

## Core Tables

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('candidate', 'employer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false
);
```

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  user_id UUID UNIQUE REFERENCES users(id),
  full_name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  avatar_url VARCHAR(255),
  resume_url VARCHAR(255),
  experience_years INTEGER DEFAULT 0,
  phone VARCHAR(50),
  website VARCHAR(255),
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX profiles_full_name_idx ON profiles(full_name);
CREATE INDEX profiles_title_idx ON profiles(title);
CREATE INDEX profiles_location_idx ON profiles(location);
```

### companies
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  industry VARCHAR(100) CHECK (industry IN (
    'Technology', 'Healthcare', 'Finance', 'Education',
    'Manufacturing', 'Retail', 'Services', 'Other'
  )),
  size_range VARCHAR(50) CHECK (size_range IN (
    '1-10', '11-50', '51-200', '201-500',
    '501-1000', '1001-5000', '5000+'
  )),
  website VARCHAR(255),
  logo_url VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX companies_industry_idx ON companies(industry);
CREATE INDEX companies_size_range_idx ON companies(size_range);
CREATE INDEX companies_location_idx ON companies(location);
```

[Previous content for Job-Related Tables through Analytics & Tracking remains unchanged...]

## Views

### active_job_stats
```sql
CREATE VIEW active_job_stats AS
SELECT 
  j.id as job_id,
  j.title,
  c.name as company_name,
  COUNT(DISTINCT a.id) as total_applications,
  COUNT(DISTINCT i.id) as total_interviews,
  j.created_at as posted_date,
  j.expires_at
FROM jobs j
LEFT JOIN companies c ON j.company_id = c.id
LEFT JOIN applications a ON j.id = a.job_id
LEFT JOIN interviews i ON a.id = i.application_id
WHERE j.status = 'active'
GROUP BY j.id, j.title, c.name;
```

### candidate_application_status
```sql
CREATE VIEW candidate_application_status AS
SELECT 
  u.id as user_id,
  u.email,
  p.first_name,
  p.last_name,
  COUNT(a.id) as total_applications,
  SUM(CASE WHEN a.status = 'accepted' THEN 1 ELSE 0 END) as accepted,
  SUM(CASE WHEN a.status = 'rejected' THEN 1 ELSE 0 END) as rejected,
  SUM(CASE WHEN a.status = 'pending' THEN 1 ELSE 0 END) as pending
FROM users u
JOIN profiles p ON u.id = p.id
LEFT JOIN applications a ON u.id = a.candidate_id
WHERE u.role = 'candidate'
GROUP BY u.id, u.email, p.first_name, p.last_name;
```

### application_conversion_rates
```sql
CREATE VIEW application_conversion_rates AS
SELECT 
  job_id,
  COUNT(*) as total_applications,
  SUM(CASE WHEN status = 'interview_scheduled' THEN 1 ELSE 0 END)::FLOAT / COUNT(*) as interview_rate,
  SUM(CASE WHEN status = 'offer_extended' THEN 1 ELSE 0 END)::FLOAT / COUNT(*) as offer_rate,
  SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END)::FLOAT / COUNT(*) as hire_rate
FROM applications
GROUP BY job_id;
```

### skill_match_scores
```sql
CREATE VIEW skill_match_scores AS
SELECT 
  j.id as job_id,
  u.id as user_id,
  COUNT(DISTINCT sr.skill_id) as required_skills,
  COUNT(DISTINCT us.skill_id) as matching_skills,
  AVG(
    CASE 
      WHEN us.level = sr.level THEN 1.0
      WHEN us.level > sr.level THEN 0.8
      ELSE 0.5
    END
  ) as skill_level_match,
  SUM(sr.weight * 
    CASE 
      WHEN us.level = sr.level THEN 1.0
      WHEN us.level > sr.level THEN 0.8
      ELSE 0.5
    END
  ) / SUM(sr.weight) as weighted_match_score
FROM jobs j
JOIN skill_requirements sr ON j.id = sr.job_id
CROSS JOIN users u
LEFT JOIN user_skills us ON u.id = us.user_id AND sr.skill_id = us.skill_id
WHERE j.status = 'published'
GROUP BY j.id, u.id;
```

## Indexes

Additional indexes for application-related queries:
```sql
CREATE INDEX applications_metadata_gin_idx ON applications USING gin(metadata);
CREATE INDEX applications_timeline_gin_idx ON applications USING gin(timeline);
CREATE INDEX applications_answers_gin_idx ON applications USING gin(answers);
```

## Notes

1. The applications table uses JSONB for flexible storage of:
   - Screening results
   - Interview details
   - Timeline events
   - Offer information
   - Custom metadata

2. Constraints ensure data integrity for JSON fields

3. Application events are tracked separately for audit purposes

4. Interview feedback is stored in a structured format

5. Statistics views provide key hiring metrics

6. All tables include created_at/updated_at timestamps for auditing

7. UUIDs are used as primary keys for better distribution and security

8. Foreign key constraints ensure referential integrity

9. Appropriate indexes are created for common query patterns

10. JSONB is used for flexible metadata storage

11. Enums are implemented as CHECK constraints for maintainability
