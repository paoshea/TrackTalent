import { RouteObject } from "react-router-dom";
import { demoRoutes } from "./demoRoutes";
import Jobs from "../pages/jobs/Jobs";
import Resources from "../pages/resources/Resources";
import SuccessStories from "../pages/success-stories/SuccessStories";
import Analytics from "../pages/partners/Analytics";
import Apprenticeships from "../pages/partners/Apprenticeships";
import Mentorship from "../pages/partners/Mentorship";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import EmployerLanding from "../pages/employer/Landing";
import JobPostings from "../pages/employer/JobPostings";
import EmployerApplications from "../pages/employer/Applications";
import EmployerAnalytics from "../pages/employer/Analytics";
import { Features, CandidateFeatures, EmployerFeatures, PartnerFeatures } from "../pages/features";
import FeaturesLayout from "../components/layout/FeaturesLayout";

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
