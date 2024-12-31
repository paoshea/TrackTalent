
import { RouteObject } from "react-router-dom";
import Jobs from "../pages/jobs/Jobs";
import Resources from "../pages/resources/Resources";
import SuccessStories from "../pages/success-stories/SuccessStories";
import Analytics from "../pages/partners/Analytics";
import Apprenticeships from "../pages/partners/Apprenticeships";
import Mentorship from "../pages/partners/Mentorship";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";

const guestRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/success-stories",
    element: <SuccessStories />,
  },
  {
    path: "/partners/analytics",
    element: <Analytics />,
  },
  {
    path: "/partners/apprenticeships",
    element: <Apprenticeships />,
  },
  {
    path: "/partners/mentorship",
    element: <Mentorship />,
  }
];

export default guestRoutes;
