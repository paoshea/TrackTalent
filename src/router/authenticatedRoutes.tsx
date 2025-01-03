import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";
import { CandidateLayout } from "../components/layout/CandidateLayout";
import { EmployerLayout } from "../components/layout/EmployerLayout";
import { PartnerLayout } from "../components/layout/PartnerLayout";

// Lazy load page components
const EmployerDashboard = lazy(() => import("../pages/employer/Dashboard"));
const CandidateDashboard = lazy(() => import("../pages/candidate/Dashboard"));
const Applications = lazy(() => import("../pages/candidate/Applications"));
const Messages = lazy(() => import("../pages/messages/Messages").then(m => ({ default: m.MessagesPage })));
const Profile = lazy(() => import("../pages/candidate/Profile"));
const JobPostings = lazy(() => import("../pages/employer/JobPostings"));
const EmployerApplications = lazy(() => import("../pages/employer/Applications"));
const Analytics = lazy(() => import("../pages/employer/Analytics"));
const Apprenticeships = lazy(() => import("../pages/partners/Apprenticeships"));
const Mentorship = lazy(() => import("../pages/partners/Mentorship"));
const PartnerAnalytics = lazy(() => import("../pages/partners/Analytics"));
const OnboardingFlow = lazy(() => import("../pages/onboarding/OnboardingFlow").then(m => ({ default: m.OnboardingFlow })));

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
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

  return children ? <>{children}</> : <Outlet />;
}

const authenticatedRoutes: RouteObject[] = [
  {
    path: "/employer",
    element: (
      <ProtectedRoute allowedRoles={["employer"]}>
        <EmployerLayout />
      </ProtectedRoute>
    ),
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
        path: "job-postings",
        element: <JobPostings />,
      },
      {
        path: "applications",
        element: <EmployerApplications />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      }
    ],
  },
  {
    path: "/candidate",
    element: (
      <ProtectedRoute allowedRoles={["candidate"]}>
        <CandidateLayout />
      </ProtectedRoute>
    ),
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
    path: "/partner",
    element: (
      <ProtectedRoute allowedRoles={["partner"]}>
        <PartnerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <div>Partner Dashboard</div>,
      },
      {
        path: "apprenticeships",
        element: <Apprenticeships />,
      },
      {
        path: "mentorship",
        element: <Mentorship />,
      },
      {
        path: "analytics",
        element: <PartnerAnalytics />,
      },
      {
        path: "messages",
        element: <Messages />,
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

export default authenticatedRoutes;
