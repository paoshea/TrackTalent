-- First create auth.users entries
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES
    ('e89d482b-4e5a-4805-a131-e69fd3a7c2c4', 'candidate@demo.com', '{"role":"candidate","full_name":"Demo Candidate"}'::jsonb),
    ('c4c03a6c-d0e1-4b7c-a0b4-5f7c8b45d4e2', 'employer@demo.com', '{"role":"employer","full_name":"Demo Employer"}'::jsonb),
    ('b2b0f7d1-c8e2-4f3b-9c91-5f7c8b45d4e2', 'partner@demo.com', '{"role":"partner","full_name":"Demo Partner"}'::jsonb);

-- Update profiles created by trigger with additional info
UPDATE public.profiles 
SET 
    username = CASE 
        WHEN email = 'candidate@demo.com' THEN 'demo_candidate'
        WHEN email = 'employer@demo.com' THEN 'demo_employer'
        WHEN email = 'partner@demo.com' THEN 'demo_partner'
    END,
    full_name = CASE 
        WHEN email = 'candidate@demo.com' THEN 'Demo Candidate'
        WHEN email = 'employer@demo.com' THEN 'Demo Employer'
        WHEN email = 'partner@demo.com' THEN 'Demo Partner'
    END
WHERE email IN ('candidate@demo.com', 'employer@demo.com', 'partner@demo.com');

-- Insert sample companies
INSERT INTO public.companies (id, name, description, industry, size_range, website, location) VALUES
    ('d0dc4271-348b-4f08-9cb5-5f7515d2f724', 'Tech Corp', 'Leading technology solutions provider', 'Technology', '201-500', 'https://techcorp.example.com', 'San Francisco, CA'),
    ('c731b6c8-a92c-4c63-958a-c4c8467d47b3', 'Innovation Inc', 'Innovative product development', 'Technology', '51-200', 'https://innovation.example.com', 'New York, NY'),
    ('b6d89f3c-74f2-4f3b-9c91-5f7c8b45d4e2', 'Design Studio', 'Creative design agency', 'Services', '11-50', 'https://designstudio.example.com', 'Remote');

-- Insert sample jobs
INSERT INTO public.jobs (id, company_id, title, description, location, type, experience_level, salary_min, salary_max, requirements, responsibilities, status) VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'd0dc4271-348b-4f08-9cb5-5f7515d2f724', 'Senior Software Engineer', 'Looking for an experienced software engineer to join our team.', 'San Francisco, CA', 'full-time', 'senior', 120000, 180000, ARRAY['5+ years experience', 'React', 'Node.js'], ARRAY['Lead development projects', 'Mentor junior developers'], 'published'),
    ('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'c731b6c8-a92c-4c63-958a-c4c8467d47b3', 'Product Manager', 'Lead product development for our flagship product.', 'New York, NY', 'full-time', 'mid', 130000, 170000, ARRAY['3+ years PM experience', 'Tech background', 'MBA preferred'], ARRAY['Define product strategy', 'Work with stakeholders'], 'published'),
    ('6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'b6d89f3c-74f2-4f3b-9c91-5f7c8b45d4e2', 'UX Designer', 'Create beautiful and intuitive user experiences.', 'Remote', 'full-time', 'mid', 90000, 140000, ARRAY['Portfolio required', 'Figma expertise', '3+ years experience'], ARRAY['Design user interfaces', 'Conduct user research'], 'published');

-- Insert sample applications
INSERT INTO public.applications (id, job_id, candidate_id, status, cover_letter, submitted_at) VALUES
    ('d4c03a6c-d0e1-4b7c-a0b4-5f7c8b45d4e2', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'e89d482b-4e5a-4805-a131-e69fd3a7c2c4', 'submitted', 'I am excited to apply for this position...', CURRENT_TIMESTAMP),
    ('e5c03a6c-d0e1-4b7c-a0b4-5f7c8b45d4e2', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'e89d482b-4e5a-4805-a131-e69fd3a7c2c4', 'interview_scheduled', 'I would be a great fit for this role...', CURRENT_TIMESTAMP),
    ('f6c03a6c-d0e1-4b7c-a0b4-5f7c8b45d4e2', '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'e89d482b-4e5a-4805-a131-e69fd3a7c2c4', 'offer_extended', 'I am passionate about design...', CURRENT_TIMESTAMP);

-- Add timeline events
SELECT add_application_timeline_event(
    'e5c03a6c-d0e1-4b7c-a0b4-5f7c8b45d4e2',
    'status_change',
    '{"old_status": "submitted", "new_status": "interview_scheduled"}'::jsonb
);

SELECT add_application_timeline_event(
    'f6c03a6c-d0e1-4b7c-a0b4-5f7c8b45d4e2',
    'status_change',
    '{"old_status": "interview_completed", "new_status": "offer_extended"}'::jsonb
);
