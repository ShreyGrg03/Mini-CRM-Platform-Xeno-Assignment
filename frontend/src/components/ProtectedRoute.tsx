import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAdmin = false,
  redirectPath = '/login',
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // If admin access is required but user is not admin, redirect
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated (and admin if required), render the outlet
  return <Outlet />;
};

export default ProtectedRoute;
