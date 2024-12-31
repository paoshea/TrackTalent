
//import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserRole } from "../../hooks/useUserRole";
import type { UserRole } from "../../types/auth";
import { GuestLayout } from "../layout/GuestLayout";

export function PublicRoute() {
  const { role: userRole, isLoading } = useUserRole();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  );
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
