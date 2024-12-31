import { RouteObject } from "react-router-dom";
import Jobs from "../pages/jobs/Jobs";
import Resources from "../pages/resources/Resources";
import SuccessStories from "../pages/success-stories/SuccessStories";
import Analytics from "../pages/partners/Analytics";
import Apprenticeships from "../pages/partners/Apprenticeships";
import Mentorship from "../pages/partners/Mentorship";
import { PublicRoute } from "../components/auth/ProtectedRoute";
import Landing from "../pages/Landing";

const guestRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicRoute />,
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
            element: <Analytics />,
          },
          {
            path: "apprenticeships",
            element: <Apprenticeships />,
          },
          {
            path: "mentorship",
            element: <Mentorship />,
          },
        ],
      },
    ],
  },
];

export default guestRoutes;