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
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  headline VARCHAR(255),
  bio TEXT,
  location VARCHAR(255),
  avatar_url VARCHAR(255),
  phone VARCHAR(50),
  website VARCHAR(255),
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### companies
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  industry VARCHAR(100),
  size_range VARCHAR(50),
  website VARCHAR(255),
  logo_url VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Job-Related Tables

### jobs
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[],
  location VARCHAR(255),
  type VARCHAR(50) NOT NULL,
  experience_level VARCHAR(50),
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency VARCHAR(3),
  remote_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX jobs_company_id_idx ON jobs(company_id);
CREATE INDEX jobs_status_idx ON jobs(status);
CREATE INDEX jobs_location_idx ON jobs(location);
```

### job_skills
```sql
CREATE TABLE job_skills (
  job_id UUID REFERENCES jobs(id),
  skill_id UUID REFERENCES skills(id),
  required BOOLEAN DEFAULT false,
  PRIMARY KEY (job_id, skill_id)
);
```

### applications
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id),
  candidate_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'submitted',
  cover_letter TEXT,
  resume_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX applications_job_id_idx ON applications(job_id);
CREATE INDEX applications_candidate_id_idx ON applications(candidate_id);
CREATE INDEX applications_status_idx ON applications(status);
```

## Profile Enhancement Tables

### skills
```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### user_skills
```sql
CREATE TABLE user_skills (
  user_id UUID REFERENCES users(id),
  skill_id UUID REFERENCES skills(id),
  years_experience INTEGER,
  proficiency_level VARCHAR(50),
  PRIMARY KEY (user_id, skill_id)
);
```

### experience
```sql
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  company_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX experience_user_id_idx ON experience(user_id);
```

### education
```sql
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  field_of_study VARCHAR(255),
  start_date DATE,
  end_date DATE,
  grade VARCHAR(50),
  activities TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX education_user_id_idx ON education(user_id);
```

## Communication Tables

### messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  subject VARCHAR(255),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX messages_sender_id_idx ON messages(sender_id);
CREATE INDEX messages_recipient_id_idx ON messages(recipient_id);
```

### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  read BOOLEAN DEFAULT false,
  action_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX notifications_user_id_idx ON notifications(user_id);
CREATE INDEX notifications_read_idx ON notifications(read);
```

## Interview Management

### interviews
```sql
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES applications(id),
  interviewer_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  location VARCHAR(255),
  meeting_link VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX interviews_application_id_idx ON interviews(application_id);
CREATE INDEX interviews_interviewer_id_idx ON interviews(interviewer_id);
```

## Analytics & Tracking

### activity_log
```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX activity_log_user_id_idx ON activity_log(user_id);
CREATE INDEX activity_log_entity_idx ON activity_log(entity_type, entity_id);
```

### analytics_events
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR(100) NOT NULL,
  properties JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX analytics_events_user_id_idx ON analytics_events(user_id);
CREATE INDEX analytics_events_type_idx ON analytics_events(event_type);
```

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

## Indexes

Additional indexes should be created based on query patterns:

1. Full-text search indexes for job search
```sql
CREATE INDEX jobs_search_idx ON jobs USING gin(
  to_tsvector('english', title || ' ' || description)
);
```

2. Composite indexes for common queries
```sql
CREATE INDEX jobs_location_type_idx ON jobs(location, type);
CREATE INDEX applications_status_date_idx ON applications(status, created_at);
```

3. Partial indexes for active records
```sql
CREATE INDEX active_jobs_idx ON jobs(created_at) 
WHERE status = 'active';

CREATE INDEX unread_notifications_idx ON notifications(user_id, created_at) 
WHERE read = false;
```

## Notes

1. All tables include created_at/updated_at timestamps for auditing
2. UUIDs are used as primary keys for better distribution and security
3. Foreign key constraints ensure referential integrity
4. Appropriate indexes are created for common query patterns
5. JSONB is used for flexible metadata storage
6. Enums are implemented as CHECK constraints for maintainability
