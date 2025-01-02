-- Create applications table
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

-- Create indexes
CREATE INDEX applications_job_id_idx ON applications(job_id);
CREATE INDEX applications_candidate_id_idx ON applications(candidate_id);
CREATE INDEX applications_status_idx ON applications(status);
CREATE INDEX applications_metadata_gin_idx ON applications USING gin(metadata);
CREATE INDEX applications_timeline_gin_idx ON applications USING gin(timeline);
CREATE INDEX applications_answers_gin_idx ON applications USING gin(answers);

-- Set up Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Candidates can view their own applications"
    ON public.applications FOR SELECT
    USING (
        auth.uid() = candidate_id OR
        auth.uid() IN (
            SELECT p.id FROM public.profiles p
            JOIN public.jobs j ON j.company_id = (
                SELECT company_id FROM public.jobs WHERE id = applications.job_id
            )
            WHERE p.role = 'employer'
        )
    );

CREATE POLICY "Candidates can insert applications"
    ON public.applications FOR INSERT
    WITH CHECK (auth.uid() = candidate_id);

CREATE POLICY "Candidates can update their own applications"
    ON public.applications FOR UPDATE
    USING (auth.uid() = candidate_id);

-- Set up realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;

-- Function to add timeline event
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

-- Trigger for updating timestamps
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Trigger for adding status change to timeline
CREATE OR REPLACE FUNCTION log_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS NULL OR NEW.status != OLD.status THEN
        PERFORM add_application_timeline_event(
            NEW.id,
            'status_change',
            jsonb_build_object(
                'old_status', OLD.status,
                'new_status', NEW.status
            )
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_application_status_changes
    AFTER UPDATE OF status ON public.applications
    FOR EACH ROW
    EXECUTE PROCEDURE log_application_status_change();
