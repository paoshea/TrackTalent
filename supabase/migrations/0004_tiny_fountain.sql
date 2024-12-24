/*
  # Add Status Tables

  1. New Tables
    - `status_updates` - Stores user status updates
    - `status_mentions` - Tracks user mentions in status updates
    - `status_hashtags` - Tracks hashtags used in status updates
    - `status_media` - Stores media attachments for status updates

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Status Updates Table
CREATE TABLE status_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  visibility text DEFAULT 'public',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Status Mentions Table
CREATE TABLE status_mentions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id uuid REFERENCES status_updates(id) ON DELETE CASCADE,
  mentioned_user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(status_id, mentioned_user_id)
);

-- Status Hashtags Table
CREATE TABLE status_hashtags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id uuid REFERENCES status_updates(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(status_id, name)
);

-- Status Media Table
CREATE TABLE status_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status_id uuid REFERENCES status_updates(id) ON DELETE CASCADE,
  url text NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view public status updates"
  ON status_updates FOR SELECT
  TO authenticated
  USING (visibility = 'public' OR user_id = auth.uid());

CREATE POLICY "Users can create status updates"
  ON status_updates FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own status updates"
  ON status_updates FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Indexes
CREATE INDEX idx_status_updates_user_id ON status_updates(user_id);
CREATE INDEX idx_status_mentions_mentioned_user_id ON status_mentions(mentioned_user_id);
CREATE INDEX idx_status_hashtags_name ON status_hashtags(name);

-- Functions
CREATE OR REPLACE FUNCTION process_status_mentions()
RETURNS TRIGGER AS $$
BEGIN
  -- Extract and insert mentions
  INSERT INTO status_mentions (status_id, mentioned_user_id)
  SELECT 
    NEW.id,
    auth.users.id
  FROM 
    regexp_matches(NEW.content, '@([a-zA-Z0-9_]+)', 'g') AS mentions(username)
    JOIN auth.users ON auth.users.raw_user_meta_data->>'username' = mentions.username;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION process_status_hashtags()
RETURNS TRIGGER AS $$
BEGIN
  -- Extract and insert hashtags
  INSERT INTO status_hashtags (status_id, name)
  SELECT 
    NEW.id,
    LOWER(hashtag[1])
  FROM 
    regexp_matches(NEW.content, '#([a-zA-Z0-9_]+)', 'g') AS hashtag;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER status_mentions_trigger
  AFTER INSERT ON status_updates
  FOR EACH ROW
  EXECUTE FUNCTION process_status_mentions();

CREATE TRIGGER status_hashtags_trigger
  AFTER INSERT ON status_updates
  FOR EACH ROW
  EXECUTE FUNCTION process_status_hashtags();