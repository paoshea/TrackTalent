
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { UserRole, User } from "../types/auth";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../pages/admin/Dashboard";
import EmployerDashboard from "../pages/employer/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
import Applications from "../pages/candidate/Applications";
import Messages from "../pages/candidate/Messages";
import Profile from "../pages/candidate/Profile";
import Jobs from "../pages/jobs/Jobs";
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

const getDashboardPath = (role?: UserRole): string => {
  const dashboardPaths: Record<UserRole, string> = {
    admin: "/admin",
    employer: "/employer",
    candidate: "/candidate",
  };
  return role ? dashboardPaths[role] : "/";
};

export const authenticatedRoutes = [
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
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
        path: "jobs",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <JobPostings />
        </React.Suspense>,
      },
      {
        path: "candidates",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <CandidateManagement />
        </React.Suspense>,
      },
      {
        path: "analytics",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <Analytics />
        </React.Suspense>,
      },
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
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
    ],
  },
  {
    path: "/onboarding",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: (
          <OnboardingFlow
            onComplete={(user: User) => getDashboardPath(user.role)}
          />
        ),
      },
    ],
  },
  {
    path: "/auth/signout",
    element: <Navigate to="/auth/login" replace />
  },
];
