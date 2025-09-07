-- Row Level Security (RLS) policies for projects table
-- Ensures users can only access their own projects

-- Enable RLS on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can select only their own projects
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert only their own projects
CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own projects
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete only their own projects
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE
  USING (auth.uid() = user_id);

-- Additional policy for service role (admin operations)
-- This allows the service role to perform operations for any user
-- Useful for admin functions, data migration, etc.
CREATE POLICY "Service role can manage all projects" ON projects
  FOR ALL
  USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON projects TO authenticated;
GRANT ALL ON projects TO service_role;

-- Grant usage on sequence (if using serial instead of gen_random_uuid)
-- GRANT USAGE, SELECT ON SEQUENCE projects_id_seq TO authenticated;
-- GRANT USAGE, SELECT ON SEQUENCE projects_id_seq TO service_role;
