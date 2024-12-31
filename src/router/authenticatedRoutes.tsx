
import React from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";
import AdminDashboard from "../pages/admin/Dashboard";
import EmployerDashboard from "../pages/employer/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
import Applications from "../pages/candidate/Applications";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/candidate/Profile";
import JobPostings from "../pages/employer/JobPostings";
import CandidateManagement from "../pages/employer/CandidateManagement";
import Analytics from "../pages/employer/Analytics";
import { OnboardingFlow } from "../pages/onboarding/OnboardingFlow";

function ProtectedRoute({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const userRole = user.user_metadata?.role as UserRole;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

const authenticatedRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      }
    ],
  },
  {
    path: "/employer",
    element: <ProtectedRoute allowedRoles={["employer"]} />,
    children: [
      {
        path: "",
        element: <EmployerDashboard />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "job-postings",
        element: <JobPostings />,
      },
      {
        path: "candidate-management",
        element: <CandidateManagement />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      }
    ],
  },
  {
    path: "/candidate",
    element: <ProtectedRoute allowedRoles={["candidate"]} />,
    children: [
      {
        path: "",
        element: <CandidateDashboard />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
  },
  {
    path: "/onboarding",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <OnboardingFlow />,
      }
    ],
  }
];

export { authenticatedRoutes };
