-- Run this migration in your Supabase SQL Editor

-- 1. Create a function to extract the Clerk global user ID from the JWT
CREATE OR REPLACE FUNCTION requesting_user_id()
RETURNS TEXT AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub', ''
  )::text;
$$ LANGUAGE SQL STABLE;

-- 2. Examples of how you can use it in Row Level Security (RLS) policies:
--
-- CREATE POLICY "Users can view own data"
-- ON your_table FOR SELECT
-- TO authenticated
-- USING (user_id = requesting_user_id());
--
-- ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
