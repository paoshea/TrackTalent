import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { mockAuth } from '../services/mockAuth';

// Lazy load dashboard components
const CandidateDashboard = lazy(() => import('../pages/candidate/Dashboard'));
const EmployerDashboard = lazy(() => import('../pages/employer/Dashboard'));
const PartnerDashboard = lazy(() => import('../pages/partner/Dashboard'));

// Demo route wrapper that sets up mock auth
interface DemoRouteProps {
  role: 'candidate' | 'employer' | 'partner';
  children: React.ReactNode;
}

const DemoRoute = ({ role, children }: DemoRouteProps) => {
  // Set up mock auth data
  const { user } = mockAuth.getMockData(role);
  if (!user) {
    return <Navigate to="/features" replace />;
  }

  return <>{children}</>;
};

export const demoRoutes: RouteObject[] = [
  {
    path: "demo",
    children: [
      {
        path: "candidate",
        element: (
          <DemoRoute role="candidate">
            <CandidateDashboard />
          </DemoRoute>
        ),
      },
      {
        path: "employer",
        element: (
          <DemoRoute role="employer">
            <EmployerDashboard />
          </DemoRoute>
        ),
      },
      {
        path: "partner",
        element: (
          <DemoRoute role="partner">
            <PartnerDashboard />
          </DemoRoute>
        ),
      }
    ]
  }
];
