import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { demoRoutes } from "./demoRoutes";
import FeaturesLayout from "../components/layout/FeaturesLayout";

// Lazy load page components
const Jobs = lazy(() => import("../pages/jobs/Jobs"));
const Resources = lazy(() => import("../pages/resources/Resources"));
const SuccessStories = lazy(() => import("../pages/success-stories/SuccessStories"));
const Analytics = lazy(() => import("../pages/partners/Analytics"));
const Apprenticeships = lazy(() => import("../pages/partners/Apprenticeships"));
const Mentorship = lazy(() => import("../pages/partners/Mentorship"));
const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const EmployerLanding = lazy(() => import("../pages/employer/Landing"));
const JobPostings = lazy(() => import("../pages/employer/JobPostings"));
const EmployerApplications = lazy(() => import("../pages/employer/Applications"));
const EmployerAnalytics = lazy(() => import("../pages/employer/Analytics"));

// Lazy load feature pages
const Features = lazy(() => import("../pages/features").then(m => ({ default: m.Features })));
const CandidateFeatures = lazy(() => import("../pages/features").then(m => ({ default: m.CandidateFeatures })));
const EmployerFeatures = lazy(() => import("../pages/features").then(m => ({ default: m.EmployerFeatures })));
const PartnerFeatures = lazy(() => import("../pages/features").then(m => ({ default: m.PartnerFeatures })));

const guestRoutes: RouteObject[] = [
  {
    path: "",
    element: <Landing />,
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/register",
    element: <Register />,
  },
  // Candidate Routes
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
  // Partner Routes
  {
    path: "partners/analytics",
    element: <Analytics />,
  },
  {
    path: "partners/apprenticeships",
    element: <Apprenticeships />,
  },
  {
    path: "partners/mentorship",
    element: <Mentorship />,
  },
  // Employer Routes
  {
    path: "employer",
    children: [
      {
        path: "",
        element: <EmployerLanding />,
      },
      {
        path: "landing",
        element: <EmployerLanding />,
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
        element: <EmployerAnalytics />,
      }
    ]
  },
  // Feature Pages
  {
    path: "features",
    element: <FeaturesLayout />,
    children: [
      {
        path: "",
        element: <Features />
      },
      {
        path: "candidate",
        element: <CandidateFeatures />
      },
      {
        path: "employer",
        element: <EmployerFeatures />
      },
      {
        path: "partner",
        element: <PartnerFeatures />
      }
    ]
  },
  ...demoRoutes
];

export default guestRoutes;
