
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Landing } from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import Jobs from "../pages/jobs/Jobs";
import Resources from "../pages/resources/Resources";
import SuccessStories from "../pages/success-stories/SuccessStories";
import PartnerAnalytics from "../pages/partners/Analytics";
import Apprenticeships from "../pages/partners/Apprenticeships";
import Mentorship from "../pages/partners/Mentorship";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";

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

export const guestRoutes = [
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
        element: <Jobs />,
      },
      {
        path: "resources",
        element: <Resources />,
      },
      {
        path: "success-stories",
        element: <SuccessStories />,
      },
      {
        path: "partners",
        children: [
          {
            path: "analytics",
            element: <PartnerAnalytics />,
          },
          {
            path: "apprenticeships",
            element: <Apprenticeships />,
          },
          {
            path: "mentorship",
            element: <Mentorship />,
          }
        ]
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
          {
            path: "signout",
            element: <Navigate to="/auth/login" replace />,
          }
        ],
      },
    ],
  },
];
