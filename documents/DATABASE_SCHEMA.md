# TrackTalent Database Schema

This document outlines the database schema design for the TrackTalent platform, including tables, relationships, indexes, and functions.

## Core Tables

### profiles
```sql
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('candidate', 'employer', 'partner')),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- Indexes
CREATE INDEX profiles_username_idx ON profiles(username);
CREATE INDEX profiles_role_idx ON profiles(role);
```

### companies
```sql
CREATE TABLE public.companies (
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

-- Indexes
CREATE INDEX companies_industry_idx ON companies(industry);
CREATE INDEX companies_size_range_idx ON companies(size_range);
CREATE INDEX companies_location_idx ON companies(location);
```

### jobs
```sql
CREATE TABLE public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    type VARCHAR(50) CHECK (type IN (
        'full-time', 'part-time', 'contract', 'internship', 'remote'
    )),
    experience_level VARCHAR(50) CHECK (experience_level IN (
        'entry', 'mid', 'senior', 'lead', 'executive'
    )),
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency VARCHAR(3) DEFAULT 'USD',
    requirements TEXT[],
    responsibilities TEXT[],
    benefits TEXT[],
    status VARCHAR(50) CHECK (status IN (
        'draft', 'published', 'closed', 'archived'
    )) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX jobs_company_id_idx ON jobs(company_id);
CREATE INDEX jobs_location_idx ON jobs(location);
CREATE INDEX jobs_type_idx ON jobs(type);
CREATE INDEX jobs_experience_level_idx ON jobs(experience_level);
CREATE INDEX jobs_status_idx ON jobs(status);
CREATE INDEX jobs_salary_range_idx ON jobs(salary_min, salary_max);
CREATE INDEX jobs_metadata_gin_idx ON jobs USING gin(metadata);
```

### applications
```sql
CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN (
        'draft',
        'submitted',
        'screening',
        'interview_scheduled',
        'interview_completed',
        'offer_extended',
        'offer_accepted',
        'offer_declined',
        'rejected',
        'withdrawn'
    )) DEFAULT 'draft',
    cover_letter TEXT,
    resume_url TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    timeline JSONB[] DEFAULT ARRAY[]::jsonb[],
    feedback JSONB DEFAULT '{}'::jsonb,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX applications_job_id_idx ON applications(job_id);
CREATE INDEX applications_candidate_id_idx ON applications(candidate_id);
CREATE INDEX applications_status_idx ON applications(status);
CREATE INDEX applications_metadata_gin_idx ON applications USING gin(metadata);
CREATE INDEX applications_timeline_gin_idx ON applications USING gin(timeline);
CREATE INDEX applications_answers_gin_idx ON applications USING gin(answers);
```

## Functions

### handle_new_user()
Automatically creates a profile when a new user signs up:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username, avatar_url, role)
    VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'username',
        new.raw_user_meta_data->>'avatar_url',
        COALESCE(new.raw_user_meta_data->>'role', 'candidate')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### add_application_timeline_event()
Adds events to an application's timeline:
```sql
CREATE OR REPLACE FUNCTION add_application_timeline_event(
    application_id UUID,
    event_type TEXT,
    event_data JSONB DEFAULT '{}'::jsonb
)
RETURNS VOID AS $$
DECLARE
    timeline_event JSONB;
BEGIN
    timeline_event = jsonb_build_object(
        'type', event_type,
        'timestamp', CURRENT_TIMESTAMP,
        'data', event_data
    );
    
    UPDATE public.applications
    SET timeline = array_append(timeline, timeline_event)
    WHERE id = application_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### update_updated_at_column()
Automatically updates the updated_at timestamp:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## Triggers

### on_auth_user_created
Creates a profile when a new user is created:
```sql
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### update_jobs_updated_at
Updates the updated_at timestamp when a job is modified:
```sql
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
```

### log_application_status_changes
Logs status changes in the application timeline:
```sql
CREATE TRIGGER log_application_status_changes
    AFTER UPDATE OF status ON public.applications
    FOR EACH ROW
    EXECUTE PROCEDURE log_application_status_change();
```

## Row Level Security (RLS)

### profiles
- Public profiles are viewable by everyone
- Users can insert their own profile
- Users can update their own profile

### companies
- Companies are viewable by everyone
- Only employers can insert companies
- Employers can update their companies

### jobs
- Published jobs are viewable by everyone
- Only employers can insert jobs
- Employers can update their jobs

### applications
- Candidates can view their own applications
- Employers can view applications for their jobs
- Candidates can insert applications
- Candidates can update their own applications

## Notes

1. All tables include created_at/updated_at timestamps for auditing
2. UUIDs are used as primary keys for better distribution and security
3. Foreign key constraints ensure referential integrity
4. JSONB is used for flexible metadata storage
5. Appropriate indexes are created for common query patterns
6. Row Level Security (RLS) is enabled on all tables
7. Triggers maintain data consistency and audit trails
8. Timeline events track application status changes
9. Enums are implemented as CHECK constraints for maintainability
10. Real-time updates are enabled through Supabase realtime

## Demo Data

Sample data is provided in `supabase/seed.sql` for testing and demonstration purposes:
- Demo users for each role (candidate, employer, partner)
- Sample companies with various industries and sizes
- Job listings with different requirements and statuses
- Applications in various stages with timeline events
