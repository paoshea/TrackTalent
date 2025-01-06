// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';
import Dashboard from '../components/dashboard/Dashboard';
import Settings from '../pages/Settings';
import { DemoRoutes } from './demoRoutes';

// Candidate Routes
import CandidateJobs from '../pages/candidate/Jobs';
import CandidateResources from '../pages/candidate/Resources';
import CandidateSuccessStories from '../pages/candidate/SuccessStories';

// Demo Routes
import JobPostings from '../pages/employer/demo/JobPostings';
import Applications from '../pages/employer/demo/Applications';
import EmployerAnalytics from '../pages/employer/demo/Analytics';
import PartnerAnalytics from '../pages/partner/demo/Analytics';
import Apprenticeships from '../pages/partner/demo/Apprenticeships';
import Mentorship from '../pages/partner/demo/Mentorship';

export function AuthenticatedRoutes() {
  return (
    <Routes>
      {/* Common Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/demo/*" element={<DemoRoutes />} />

      {/* Candidate Routes */}
      <Route
        path="/candidate/jobs"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/resources"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateResources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/success-stories"
        element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateSuccessStories />
          </ProtectedRoute>
        }
      />

      {/* Employer Demo Routes */}
      <Route
        path="/employer/demo/job-postings"
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <JobPostings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/demo/applications"
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <Applications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/demo/analytics"
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerAnalytics />
          </ProtectedRoute>
        }
      />

      {/* Partner Demo Routes */}
      <Route
        path="/partner/demo/analytics"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <PartnerAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner/demo/apprenticeships"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <Apprenticeships />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partner/demo/mentorship"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <Mentorship />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
