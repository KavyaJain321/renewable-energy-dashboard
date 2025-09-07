import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthProvider';

// Types for project data
export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  geojson: any; // GeoJSON object
  area_hectares?: number;
  energy_potential?: any;
  financial_analysis?: any;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  geojson: any;
  area_hectares?: number;
  energy_potential?: any;
  financial_analysis?: any;
}

export interface UseProjectReturn {
  // State
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createProject: (data: CreateProjectData) => Promise<Project | null>;
  fetchProjects: () => Promise<void>;
  selectProject: (project: Project) => void;
  clearSelectedProject: () => void;
  deleteProject: (projectId: string) => Promise<boolean>;
  updateProject: (projectId: string, data: Partial<CreateProjectData>) => Promise<boolean>;
}

export function useProject(): UseProjectReturn {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new project
  const createProject = useCallback(async (data: CreateProjectData): Promise<Project | null> => {
    if (!user) {
      setError('User must be authenticated to create projects');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      const newProject = await response.json();
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch all projects for the current user
  const fetchProjects = useCallback(async (): Promise<void> => {
    if (!user) {
      setError('User must be authenticated to fetch projects');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/projects');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch projects');
      }

      const userProjects = await response.json();
      setProjects(userProjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Select a project
  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  // Clear selected project
  const clearSelectedProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Delete a project
  const deleteProject = useCallback(async (projectId: string): Promise<boolean> => {
    if (!user) {
      setError('User must be authenticated to delete projects');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      setProjects(prev => prev.filter(p => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, selectedProject]);

  // Update a project
  const updateProject = useCallback(async (projectId: string, data: Partial<CreateProjectData>): Promise<boolean> => {
    if (!user) {
      setError('User must be authenticated to update projects');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update project');
      }

      const updatedProject = await response.json();
      setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));
      if (selectedProject?.id === projectId) {
        setSelectedProject(updatedProject);
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user, selectedProject]);

  return {
    // State
    projects,
    selectedProject,
    isLoading,
    error,
    
    // Actions
    createProject,
    fetchProjects,
    selectProject,
    clearSelectedProject,
    deleteProject,
    updateProject,
  };
}
