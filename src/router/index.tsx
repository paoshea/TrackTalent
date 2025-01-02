import { Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import routes from './routes';

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg text-gray-600">Loading...</div>
  </div>
);

// Wrap all route elements with Suspense
const wrapWithSuspense = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route: RouteObject) => {
    const wrappedRoute: RouteObject = {
      ...route,
      element: route.element ? (
        <Suspense fallback={<Loading />}>
          {route.element}
        </Suspense>
      ) : undefined
    };

    if (route.children) {
      wrappedRoute.children = wrapWithSuspense(route.children);
    }

    return wrappedRoute;
  });
};

// Create router with Suspense-wrapped routes
export const router = createBrowserRouter(wrapWithSuspense(routes), {
  basename: '/'
});
