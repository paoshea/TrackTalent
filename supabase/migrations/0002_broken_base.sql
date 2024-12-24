/*
  # Analytics and Activity Tracking Schema

  1. New Tables
    - `analytics_metrics` - Stores dashboard metrics
    - `activity_feed` - Tracks user activities
    - `status_updates` - Stores user status updates

  2. Security
    - Enable RLS on all new tables
    - Add policies for data access

  3. Functions
    - Add aggregation functions for metrics
*/

-- Analytics Metrics Table
CREATE TABLE analytics_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  metric_type text NOT NULL,
  metric_value jsonb NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Activity Feed Table
CREATE TABLE activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL,
  action text NOT NULL,
  target text NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Status Updates Table
CREATE TABLE status_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  visibility text DEFAULT 'public',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own metrics"
  ON analytics_metrics
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view relevant activities"
  ON activity_feed
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    (type = 'job' AND visibility = 'public') OR
    user_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create activities"
  ON activity_feed
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their status updates"
  ON status_updates
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Metrics Function
CREATE OR REPLACE FUNCTION get_dashboard_metrics(user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN jsonb_build_object(
    'activeJobs', (
      SELECT count(*) 
      FROM jobs 
      WHERE status = 'active' AND company_id = user_id
    ),
    'totalApplications', (
      SELECT count(*) 
      FROM applications 
      WHERE user_id = user_id
    ),
    'interviewsScheduled', (
      SELECT count(*) 
      FROM interviews 
      WHERE application_id IN (
        SELECT id FROM applications WHERE user_id = user_id
      )
    ),
    'averageTimeToHire', (
      SELECT EXTRACT(DAY FROM avg(updated_at - created_at))
      FROM applications
      WHERE status = 'accepted' AND user_id = user_id
    )
  );
END;
$$;