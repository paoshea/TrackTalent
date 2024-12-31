
import { RouteObject } from "react-router-dom";
import { guestRoutes } from "./guestRoutes";
import { authenticatedRoutes } from "./authenticatedRoutes";
import NotFound from "../pages/NotFound";

export const routes: RouteObject[] = [
  ...guestRoutes,
  ...authenticatedRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];
