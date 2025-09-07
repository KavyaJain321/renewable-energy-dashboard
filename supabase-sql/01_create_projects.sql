-- Create projects table for storing user-selected areas and project data
-- This table stores the GeoJSON polygons and project metadata

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  geojson JSONB NOT NULL,
  area_hectares DECIMAL(10,2),
  energy_potential JSONB, -- Store calculated energy potential data
  financial_analysis JSONB, -- Store financial calculations
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_geojson ON projects USING GIN(geojson);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE projects IS 'Stores user-created renewable energy projects with GeoJSON polygons';
COMMENT ON COLUMN projects.id IS 'Unique project identifier';
COMMENT ON COLUMN projects.user_id IS 'Reference to the user who created this project';
COMMENT ON COLUMN projects.name IS 'User-defined project name';
COMMENT ON COLUMN projects.description IS 'Optional project description';
COMMENT ON COLUMN projects.geojson IS 'GeoJSON polygon defining the project area';
COMMENT ON COLUMN projects.area_hectares IS 'Calculated area in hectares';
COMMENT ON COLUMN projects.energy_potential IS 'Stored energy potential calculations (solar, wind, etc.)';
COMMENT ON COLUMN projects.financial_analysis IS 'Stored financial analysis results';
COMMENT ON COLUMN projects.created_at IS 'Project creation timestamp';
COMMENT ON COLUMN projects.updated_at IS 'Last modification timestamp';
