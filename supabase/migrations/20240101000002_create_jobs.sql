-- Create jobs table
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

-- Create indexes
CREATE INDEX jobs_company_id_idx ON jobs(company_id);
CREATE INDEX jobs_location_idx ON jobs(location);
CREATE INDEX jobs_type_idx ON jobs(type);
CREATE INDEX jobs_experience_level_idx ON jobs(experience_level);
CREATE INDEX jobs_status_idx ON jobs(status);
CREATE INDEX jobs_salary_range_idx ON jobs(salary_min, salary_max);
CREATE INDEX jobs_metadata_gin_idx ON jobs USING gin(metadata);

-- Set up Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Published jobs are viewable by everyone"
    ON public.jobs FOR SELECT
    USING (status = 'published' OR (
        auth.uid() IN (
            SELECT id FROM public.profiles
            WHERE role IN ('employer', 'partner')
        )
    ));

CREATE POLICY "Employers can insert jobs"
    ON public.jobs FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'employer'
    ));

CREATE POLICY "Employers can update their jobs"
    ON public.jobs FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'employer'
    ));

-- Set up realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
