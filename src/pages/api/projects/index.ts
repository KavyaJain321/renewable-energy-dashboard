import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

// Types
interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  geojson: any;
  area_hectares?: number;
  energy_potential?: any;
  financial_analysis?: any;
  created_at: string;
  updated_at: string;
}

interface CreateProjectRequest {
  name: string;
  description?: string;
  geojson: any;
  area_hectares?: number;
  energy_potential?: any;
  financial_analysis?: any;
}

// GET /api/projects - List all projects for the authenticated user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleGetProjects(req, res);
  } else if (req.method === 'POST') {
    return handleCreateProject(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Fetch projects for the authenticated user
    const { data: projects, error: fetchError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching projects:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }

    return res.status(200).json(projects || []);
  } catch (error) {
    console.error('Error in handleGetProjects:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleCreateProject(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the JWT token and get user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Validate request body
    const { name, description, geojson, area_hectares, energy_potential, financial_analysis }: CreateProjectRequest = req.body;

    if (!name || !geojson) {
      return res.status(400).json({ error: 'Name and geojson are required' });
    }

    // Create the project
    const { data: newProject, error: createError } = await supabaseAdmin
      .from('projects')
      .insert({
        user_id: user.id,
        name,
        description,
        geojson,
        area_hectares,
        energy_potential,
        financial_analysis,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating project:', createError);
      return res.status(500).json({ error: 'Failed to create project' });
    }

    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Error in handleCreateProject:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
