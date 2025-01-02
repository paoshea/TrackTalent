import { RouteObject } from "react-router-dom";
import GuestLayout from "../components/layout/GuestLayout";
import guestRoutes from "./guestRoutes";
import authenticatedRoutes from "./authenticatedRoutes";
import NotFound from "../pages/NotFound";

const routes: RouteObject[] = [
  {
    element: <GuestLayout />,
    children: [
      ...guestRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  ...authenticatedRoutes,
];

export default routes;
