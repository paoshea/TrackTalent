import { Routes, Route } from "react-router-dom";
import routes from "../router/routes";

export function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path || 'root'}
          path={route.path}
          element={route.element}
        >
          {route.children?.map((childRoute) => (
            <Route
              key={`${route.path || 'root'}-${childRoute.path}`}
              path={childRoute.path}
              element={childRoute.element}
            >
              {childRoute.children?.map((grandChild) => (
                <Route
                  key={`${route.path || 'root'}-${childRoute.path}-${grandChild.path}`}
                  path={grandChild.path}
                  element={grandChild.element}
                />
              ))}
            </Route>
          ))}
        </Route>
      ))}
    </Routes>
  );
}
