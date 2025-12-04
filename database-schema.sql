-- Example database schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create a table to store Santa Call configurations
CREATE TABLE IF NOT EXISTS santa_calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name TEXT NOT NULL,
  child_info TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  father_email TEXT,
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE santa_calls ENABLE ROW LEVEL SECURITY;

-- Create policies to allow users to only see and manage their own calls
DROP POLICY IF EXISTS "Users can view their own santa calls" ON santa_calls;
CREATE POLICY "Users can view their own santa calls"
  ON santa_calls FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own santa calls" ON santa_calls;
CREATE POLICY "Users can insert their own santa calls"
  ON santa_calls FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own santa calls" ON santa_calls;
CREATE POLICY "Users can update their own santa calls"
  ON santa_calls FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own santa calls" ON santa_calls;
CREATE POLICY "Users can delete their own santa calls"
  ON santa_calls FOR DELETE
  USING (auth.uid() = user_id);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_santa_calls_user_id ON santa_calls(user_id);
CREATE INDEX IF NOT EXISTS idx_santa_calls_created_at ON santa_calls(created_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_santa_calls_updated_at ON santa_calls;
CREATE TRIGGER update_santa_calls_updated_at
  BEFORE UPDATE ON santa_calls
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

