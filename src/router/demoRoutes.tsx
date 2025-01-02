import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { mockAuth } from '../services/mockAuth';
import CandidateDashboard from '../pages/candidate/Dashboard';
import EmployerDashboard from '../pages/employer/Dashboard';
import PartnerDashboard from '../pages/partner/Dashboard';

// Demo route wrapper that sets up mock auth
const DemoRoute: React.FC<{ role: 'candidate' | 'employer' | 'partner', children: React.ReactNode }> = ({ role, children }) => {
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
