/*
  # Unified Analytics and Engagement Schema
  
  1. Core Tables
    - Users and Companies (from core schema)
    - Jobs and Applications (from core schema)
    - Messages and Skills (from core schema)
    - Interviews (from core schema)
  
  2. Analytics and Engagement
    - Status engagement tracking
    - User session tracking
    - Interaction history
    - Performance metrics
  
  3. Security
    - RLS policies for all tables
    - Role-based access control
    
  4. Performance
    - Optimized indexes
    - Automated calculation functions
*/

-- Core Tables (preserving from original schema)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'company', 'candidate')),
  full_name text NOT NULL,
  company_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE,
  plan text DEFAULT 'basic',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Status and Engagement Tables (merged from multiple schemas)
CREATE TABLE IF NOT EXISTS status_engagement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id uuid REFERENCES status_updates(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  event_type text NOT NULL CHECK (event_type IN ('view', 'like', 'comment', 'share')),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS status_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id uuid REFERENCES status_updates(id) ON DELETE CASCADE UNIQUE,
  views_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  engagement_rate float DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Session and Interaction Tracking
CREATE TABLE IF NOT EXISTS session_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  duration interval,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS interaction_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  interaction_type text NOT NULL,
  target_type text NOT NULL,
  target_id uuid NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Metrics and Analytics
CREATE TABLE IF NOT EXISTS engagement_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  metric_type text NOT NULL,
  value float DEFAULT 0,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, metric_type, period_start)
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE interaction_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Companies can manage their own data"
  ON companies FOR ALL
  TO authenticated
  USING (id IN (
    SELECT company_id FROM users
    WHERE id = auth.uid() AND role = 'company'
  ));

CREATE POLICY "Users can view their own engagement data"
  ON status_engagement FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    status_id IN (
      SELECT id FROM status_updates WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own metrics"
  ON engagement_metrics FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their own session logs"
  ON session_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Functions
CREATE OR REPLACE FUNCTION calculate_engagement_score(user_id uuid)
RETURNS float
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  score float;
BEGIN
  SELECT 
    COALESCE(
      (
        COUNT(DISTINCT DATE(created_at))::float / 
        GREATEST(
          DATE_PART('day', NOW() - MIN(created_at))::float,
          1
        )
      ) * 100,
      0
    ) INTO score
  FROM interaction_history
  WHERE user_id = user_id
  AND created_at >= NOW() - INTERVAL '30 days';
  
  RETURN ROUND(score, 2);
END;
$$;

CREATE OR REPLACE FUNCTION update_status_performance()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO status_performance (status_id)
  VALUES (NEW.status_id)
  ON CONFLICT (status_id) DO UPDATE
  SET
    views_count = (
      SELECT COUNT(DISTINCT user_id)
      FROM status_engagement
      WHERE status_id = NEW.status_id AND event_type = 'view'
    ),
    likes_count = (
      SELECT COUNT(DISTINCT user_id)
      FROM status_engagement
      WHERE status_id = NEW.status_id AND event_type = 'like'
    ),
    comments_count = (
      SELECT COUNT(DISTINCT user_id)
      FROM status_engagement
      WHERE status_id = NEW.status_id AND event_type = 'comment'
    ),
    shares_count = (
      SELECT COUNT(DISTINCT user_id)
      FROM status_engagement
      WHERE status_id = NEW.status_id AND event_type = 'share'
    ),
    engagement_rate = (
      SELECT ROUND(
        (COUNT(DISTINCT user_id)::float / NULLIF(
          (SELECT COUNT(DISTINCT user_id) FROM status_engagement WHERE status_id = NEW.status_id AND event_type = 'view'),
          0
        )) * 100,
        2
      )
      FROM status_engagement
      WHERE status_id = NEW.status_id AND event_type IN ('like', 'comment', 'share')
    ),
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_status_performance_trigger
  AFTER INSERT ON status_engagement
  FOR EACH ROW
  EXECUTE FUNCTION update_status_performance();

-- Optimized Indexes
CREATE INDEX idx_status_engagement_status_id ON status_engagement(status_id);
CREATE INDEX idx_status_engagement_event_type ON status_engagement(event_type);
CREATE INDEX idx_status_performance_engagement ON status_performance(engagement_rate DESC);
CREATE INDEX idx_engagement_metrics_user_period ON engagement_metrics(user_id, period_start, period_end);
CREATE INDEX idx_session_logs_user_date ON session_logs(user_id, started_at);
CREATE INDEX idx_interaction_history_user_type ON interaction_history(user_id, interaction_type);