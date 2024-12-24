/*
  # Analytics Schema Updates

  1. New Tables
    - `metric_snapshots` - Stores point-in-time metrics
    - `user_activities` - Enhanced activity tracking
    - `engagement_stats` - User engagement metrics

  2. Security
    - Enable RLS on all new tables
    - Add policies for data access
*/

-- Metric Snapshots Table
CREATE TABLE metric_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  category text NOT NULL,
  metrics jsonb NOT NULL,
  snapshot_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, category, snapshot_date)
);

-- User Activities Table
CREATE TABLE user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  activity_type text NOT NULL,
  details jsonb NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Engagement Stats Table
CREATE TABLE engagement_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_count integer DEFAULT 0,
  total_duration interval DEFAULT '0'::interval,
  last_active timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE metric_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own metrics"
  ON metric_snapshots
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their own activities"
  ON user_activities
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their own engagement stats"
  ON engagement_stats
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Functions
CREATE OR REPLACE FUNCTION calculate_user_metrics(user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'applications', (
      SELECT count(*) FROM applications WHERE user_id = $1
    ),
    'interviews', (
      SELECT count(*) FROM interviews 
      WHERE application_id IN (SELECT id FROM applications WHERE user_id = $1)
    ),
    'offers', (
      SELECT count(*) FROM applications 
      WHERE user_id = $1 AND status = 'accepted'
    ),
    'response_rate', (
      SELECT ROUND(
        (COUNT(*) FILTER (WHERE status != 'pending')::float / 
        NULLIF(COUNT(*), 0)::float) * 100
      )
      FROM applications
      WHERE user_id = $1
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Trigger for updating engagement stats
CREATE OR REPLACE FUNCTION update_engagement_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO engagement_stats (user_id, session_count, last_active)
  VALUES (NEW.user_id, 1, NOW())
  ON CONFLICT (user_id) DO UPDATE
  SET 
    session_count = engagement_stats.session_count + 1,
    last_active = NOW(),
    updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER track_user_activity
  AFTER INSERT ON user_activities
  FOR EACH ROW
  EXECUTE FUNCTION update_engagement_stats();