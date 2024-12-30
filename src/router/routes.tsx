import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Jobs from "../pages/jobs/Jobs";
import type { UserRole, User } from "../types/auth";
import JobPostings from "../pages/employer/JobPostings";
import CandidateManagement from "../pages/employer/CandidateManagement";
import Analytics from "../pages/employer/Analytics";
import Applications from "../pages/employer/Applications"; // Assumed to exist
import Messages from "../pages/employer/Messages";     // Assumed to exist
import Profile from "../pages/employer/Profile";       // Assumed to exist

import AdminDashboard from "../pages/admin/Dashboard";
import CustomerDashboard from "../pages/customer/Dashboard";
import EmployerDashboard from "../pages/employer/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";
import { Landing } from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import NotFound from "../pages/NotFound";
import { OnboardingFlow } from "../pages/onboarding/OnboardingFlow";
import SuccessStories from "../pages/success-stories/SuccessStories";
import Resources from "../pages/resources/Resources";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
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

function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    const role = user.user_metadata?.role as UserRole;
    const dashboardPaths: Record<UserRole, string> = {
      admin: "/admin",
      employer: "/employer",
      candidate: "/candidate",
    };

    return <Navigate to={dashboardPaths[role] || "/"} replace />;
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

export const routes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "jobs",
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Jobs />
          </React.Suspense>
        ),
      },
      {
        path: "auth",
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "success-stories",
        element: <SuccessStories />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
    ],
  },
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
        path: "job-postings",
        element: <React.Suspense fallback={<div>Loading...</div>}>
          <JobPostings />
        </React.Suspense>,
      },
      {
        path: "candidate-management",
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
        element: <Applications />
      },
      {
        path: "messages",
        element: <Messages />
      },
      {
        path: "profile",
        element: <Profile />
      }
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
    path: "*",
    element: <NotFound />,
  },
];