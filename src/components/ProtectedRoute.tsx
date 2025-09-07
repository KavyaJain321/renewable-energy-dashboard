import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  onUnauthorized?: () => void;
}

export function ProtectedRoute({ children, fallback, onUnauthorized }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, trigger unauthorized callback
  if (!user) {
    if (onUnauthorized) {
      onUnauthorized();
    }
    return null;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}
