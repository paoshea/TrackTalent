-- Create companies table
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

-- Create indexes
CREATE INDEX companies_industry_idx ON companies(industry);
CREATE INDEX companies_size_range_idx ON companies(size_range);
CREATE INDEX companies_location_idx ON companies(location);

-- Set up Row Level Security (RLS)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Companies are viewable by everyone"
    ON public.companies FOR SELECT
    USING (true);

CREATE POLICY "Employers can insert companies"
    ON public.companies FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'employer'
    ));

CREATE POLICY "Employers can update their companies"
    ON public.companies FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'employer'
    ));

-- Set up realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.companies;
