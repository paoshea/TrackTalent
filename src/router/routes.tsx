
import { RouteObject } from "react-router-dom";
import { PublicRoute } from "../components/auth/ProtectedRoute";
import guestRoutes from "./guestRoutes";
import authenticatedRoutes from "./authenticatedRoutes";
import NotFound from "../pages/NotFound";

const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      ...guestRoutes,
      ...authenticatedRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
