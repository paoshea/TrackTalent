import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';

// Employer Demo Routes
import JobPostings from '../pages/employer/demo/JobPostings';
import Applications from '../pages/employer/demo/Applications';
import EmployerAnalytics from '../pages/employer/demo/Analytics';

// Partner Demo Routes
import PartnerAnalytics from '../pages/partner/demo/Analytics';
import Apprenticeships from '../pages/partner/demo/Apprenticeships';
import Mentorship from '../pages/partner/demo/Mentorship';

export function DemoRoutes() {
  return (
    <Routes>
      {/* Employer Demo Routes */}
      <Route
        path="/employer/job-postings"
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <JobPostings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/applications"
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <Applications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/analytics"
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerAnalytics />
          </ProtectedRoute>
        }
      />

      {/* Partner Demo Routes */}
      <Route
        path="/partner/analytics"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <PartnerAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner/apprenticeships"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <Apprenticeships />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner/mentorship"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <Mentorship />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
