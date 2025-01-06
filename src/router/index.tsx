import { createBrowserRouter, Outlet, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';
import { Header, Footer } from '../components/layout';

// Auth Pages
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

// Public Pages
import Landing from '../pages/Landing';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Careers from '../pages/Careers';
import NotFound from '../pages/NotFound';

// Candidate Pages
import CandidateJobs from '../pages/candidate/Jobs';
import CandidateResources from '../pages/candidate/Resources';
import CandidateSuccessStories from '../pages/candidate/SuccessStories';

// Employer Demo Pages
import JobPostings from '../pages/employer/demo/JobPostings';
import Applications from '../pages/employer/demo/Applications';
import EmployerAnalytics from '../pages/employer/demo/Analytics';

// Partner Demo Pages
import PartnerAnalytics from '../pages/partner/demo/Analytics';
import Apprenticeships from '../pages/partner/demo/Apprenticeships';
import Mentorship from '../pages/partner/demo/Mentorship';

function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return <NotFound />;
}

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'careers',
        element: <Careers />,
      },
      // Auth Routes
      {
        path: 'auth',
        children: [
          {
            path: 'sign-in',
            element: <SignIn />,
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
          {
            path: 'verify-email',
            element: <VerifyEmail />,
          },
        ],
      },
      // Candidate Routes
      {
        path: 'candidate',
        children: [
          {
            path: 'jobs',
            element: (
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateJobs />
              </ProtectedRoute>
            ),
          },
          {
            path: 'resources',
            element: (
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateResources />
              </ProtectedRoute>
            ),
          },
          {
            path: 'success-stories',
            element: (
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateSuccessStories />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Employer Demo Routes
      {
        path: 'employer/demo',
        children: [
          {
            path: 'job-postings',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <JobPostings />
              </ProtectedRoute>
            ),
          },
          {
            path: 'applications',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <Applications />
              </ProtectedRoute>
            ),
          },
          {
            path: 'analytics',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <EmployerAnalytics />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Partner Demo Routes
      {
        path: 'partner/demo',
        children: [
          {
            path: 'analytics',
            element: (
              <ProtectedRoute allowedRoles={['partner']}>
                <PartnerAnalytics />
              </ProtectedRoute>
            ),
          },
          {
            path: 'apprenticeships',
            element: (
              <ProtectedRoute allowedRoles={['partner']}>
                <Apprenticeships />
              </ProtectedRoute>
            ),
          },
          {
            path: 'mentorship',
            element: (
              <ProtectedRoute allowedRoles={['partner']}>
                <Mentorship />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
