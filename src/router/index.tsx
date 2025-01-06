import { createBrowserRouter, Outlet, isRouteErrorResponse, useRouteError, useLocation } from 'react-router-dom';
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
import SuccessStories from '../pages/success-stories/index';
import Help from '../pages/help/index';
import Blog from '../pages/blog/index';
import { Privacy, Terms, Cookies } from '../pages/legal';

// Candidate Pages
import CandidateJobs from '../pages/candidate/Jobs';
import CandidateResources from '../pages/candidate/Resources';
import CandidateSuccessStories from '../pages/candidate/SuccessStories';
import CandidateDashboard from '../pages/candidate/Dashboard';

// Employer Pages
import JobPostings from '../pages/employer/demo/JobPostings';
import Applications from '../pages/employer/demo/Applications';
import EmployerAnalytics from '../pages/employer/demo/Analytics';
import EmployerDashboard from '../pages/employer/Dashboard';

// Partner Pages
import PartnerAnalytics from '../pages/partner/demo/Analytics';
import Apprenticeships from '../pages/partner/demo/Apprenticeships';
import Mentorship from '../pages/partner/demo/Mentorship';
import PartnerDashboard from '../pages/partner/Dashboard';

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
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        transparent={isLandingPage}
        sticky={true}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
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
      {
        path: 'success-stories',
        element: <SuccessStories />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'cookies',
        element: <Cookies />,
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
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            ),
          },
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
      // Employer Routes
      {
        path: 'employer',
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <EmployerDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'demo/job-postings',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <JobPostings />
              </ProtectedRoute>
            ),
          },
          {
            path: 'demo/applications',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <Applications />
              </ProtectedRoute>
            ),
          },
          {
            path: 'demo/analytics',
            element: (
              <ProtectedRoute allowedRoles={['employer']}>
                <EmployerAnalytics />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Partner Routes
      {
        path: 'partner',
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute allowedRoles={['partner']}>
                <PartnerDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'demo/analytics',
            element: (
              <ProtectedRoute allowedRoles={['partner']}>
                <PartnerAnalytics />
              </ProtectedRoute>
            ),
          },
          {
            path: 'demo/apprenticeships',
            element: (
              <ProtectedRoute allowedRoles={['partner']}>
                <Apprenticeships />
              </ProtectedRoute>
            ),
          },
          {
            path: 'demo/mentorship',
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
