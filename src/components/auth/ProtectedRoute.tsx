import React from "react";
import { Navigate } from "react-router-dom";
import { useUserRole, type UserRole } from "../../hooks/useUserRole";

interface Props {
  children: React.ReactNode;
  roles?: UserRole[];
}

export function ProtectedRoute({ children, roles }: Props) {
  const { role: userRole, isLoading, error } = useUserRole();
  const isAuthenticated = true; // TODO: Replace with actual auth check

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/error" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    // Redirect to appropriate dashboard based on user's role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
