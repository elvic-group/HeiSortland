-- Migration: Add lat/lng to places, and create saved_events table
-- Run this via Supabase SQL Editor or Management API

-- 1. Add lat/lng columns to places
ALTER TABLE places
ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;

-- 2. Create saved_events table
CREATE TABLE IF NOT EXISTS saved_events (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, event_id)
);

ALTER TABLE saved_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saves" ON saved_events
FOR ALL USING (auth.uid() = user_id);
