import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

// Types
interface UpdateProjectRequest {
  name?: string;
  description?: string;
  geojson?: any;
  area_hectares?: number;
  energy_potential?: any;
  financial_analysis?: any;
}

// GET /api/projects/[id] - Get a specific project
// PUT /api/projects/[id] - Update a specific project
// DELETE /api/projects/[id] - Delete a specific project
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  if (req.method === 'GET') {
    return handleGetProject(req, res, id);
  } else if (req.method === 'PUT') {
    return handleUpdateProject(req, res, id);
  } else if (req.method === 'DELETE') {
    return handleDeleteProject(req, res, id);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetProject(req: NextApiRequest, res: NextApiResponse, projectId: string) {
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

    // Fetch the specific project
    const { data: project, error: fetchError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', user.id) // Ensure user can only access their own projects
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Project not found' });
      }
      console.error('Error fetching project:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch project' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error('Error in handleGetProject:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleUpdateProject(req: NextApiRequest, res: NextApiResponse, projectId: string) {
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
    const updateData: UpdateProjectRequest = req.body;

    // Build update object with only provided fields
    const updateFields: any = {};
    if (updateData.name !== undefined) updateFields.name = updateData.name;
    if (updateData.description !== undefined) updateFields.description = updateData.description;
    if (updateData.geojson !== undefined) updateFields.geojson = updateData.geojson;
    if (updateData.area_hectares !== undefined) updateFields.area_hectares = updateData.area_hectares;
    if (updateData.energy_potential !== undefined) updateFields.energy_potential = updateData.energy_potential;
    if (updateData.financial_analysis !== undefined) updateFields.financial_analysis = updateData.financial_analysis;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Update the project
    const { data: updatedProject, error: updateError } = await supabaseAdmin
      .from('projects')
      .update(updateFields)
      .eq('id', projectId)
      .eq('user_id', user.id) // Ensure user can only update their own projects
      .select()
      .single();

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return res.status(404).json({ error: 'Project not found' });
      }
      console.error('Error updating project:', updateError);
      return res.status(500).json({ error: 'Failed to update project' });
    }

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error in handleUpdateProject:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleDeleteProject(req: NextApiRequest, res: NextApiResponse, projectId: string) {
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

    // Delete the project
    const { error: deleteError } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user.id); // Ensure user can only delete their own projects

    if (deleteError) {
      console.error('Error deleting project:', deleteError);
      return res.status(500).json({ error: 'Failed to delete project' });
    }

    return res.status(204).send(); // No content on successful deletion
  } catch (error) {
    console.error('Error in handleDeleteProject:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
