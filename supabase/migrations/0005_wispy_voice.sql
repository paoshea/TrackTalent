/*
  # Add trending hashtags and notification enhancements

  1. New Tables
    - `trending_hashtags` - Stores aggregated hashtag metrics
    - `hashtag_stats` - Stores detailed hashtag usage statistics
  
  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
  
  3. Functions
    - Add function to update trending hashtags
    - Add function to calculate hashtag engagement
*/

-- Trending Hashtags Table
CREATE TABLE trending_hashtags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  usage_count integer DEFAULT 0,
  engagement_score float DEFAULT 0,
  trending_score float DEFAULT 0,
  last_used_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Hashtag Statistics Table
CREATE TABLE hashtag_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hashtag_name text NOT NULL,
  total_uses integer DEFAULT 0,
  unique_users integer DEFAULT 0,
  avg_engagement float DEFAULT 0,
  time_period tstzrange NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(hashtag_name, time_period)
);

-- Enable RLS
ALTER TABLE trending_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view trending hashtags"
  ON trending_hashtags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view hashtag stats"
  ON hashtag_stats FOR SELECT
  TO authenticated
  USING (true);

-- Functions
CREATE OR REPLACE FUNCTION update_trending_hashtags()
RETURNS TRIGGER AS $$
BEGIN
  -- Update or insert into trending_hashtags
  INSERT INTO trending_hashtags (name, usage_count, last_used_at)
  VALUES (NEW.name, 1, now())
  ON CONFLICT (name) DO UPDATE
  SET 
    usage_count = trending_hashtags.usage_count + 1,
    last_used_at = now(),
    trending_score = (
      trending_hashtags.usage_count + 1
    ) * exp(
      -extract(
        epoch FROM (now() - trending_hashtags.last_used_at)
      )::float / 86400
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate hashtag engagement
CREATE OR REPLACE FUNCTION calculate_hashtag_engagement(
  hashtag_name text,
  time_period tstzrange
)
RETURNS float AS $$
DECLARE
  engagement float;
BEGIN
  SELECT 
    COALESCE(
      AVG(
        s.likes_count + s.comments_count * 2 + s.shares_count * 3
      ),
      0
    )
  INTO engagement
  FROM status_updates s
  JOIN status_hashtags h ON h.status_id = s.id
  WHERE 
    h.name = hashtag_name
    AND s.created_at <@ time_period;

  RETURN engagement;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_trending_hashtags_trigger
  AFTER INSERT ON status_hashtags
  FOR EACH ROW
  EXECUTE FUNCTION update_trending_hashtags();

-- Indexes
CREATE INDEX idx_trending_hashtags_score ON trending_hashtags(trending_score DESC);
CREATE INDEX idx_hashtag_stats_period ON hashtag_stats USING gist (time_period);

-- Function to get trending hashtags
CREATE OR REPLACE FUNCTION get_trending_hashtags(
  limit_count integer DEFAULT 10
)
RETURNS TABLE (
  name text,
  usage_count integer,
  trending_score float,
  engagement_rate float
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.name,
    h.usage_count,
    h.trending_score,
    COALESCE(
      (
        SELECT calculate_hashtag_engagement(
          h.name,
          tstzrange(now() - interval '24 hours', now())
        )
      ),
      0
    ) as engagement_rate
  FROM trending_hashtags h
  ORDER BY h.trending_score DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;