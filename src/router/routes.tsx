
import { guestRoutes } from "./guestRoutes";
import { authenticatedRoutes } from "./authenticatedRoutes";
import NotFound from "../pages/NotFound";

export const routes = [
  ...guestRoutes,
  ...authenticatedRoutes,
  {
    path: "*",
    element: <NotFound />,
  },
];
