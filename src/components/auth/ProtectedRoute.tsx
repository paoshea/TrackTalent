
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserRole } from "../../hooks/useUserRole";
import type { UserRole } from "../../types/auth";

export function PublicRoute() {
  const { role: userRole } = useUserRole();
  
  if (userRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function ProtectedRoute({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const { role: userRole, isLoading, error } = useUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/error" replace />;
  }

  if (!userRole) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
