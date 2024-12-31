import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import { GuestLayout } from "./components/layout/GuestLayout";
import guestRoutes from "./router/guestRoutes";
import authenticatedRoutes from "./router/authenticatedRoutes";
import NotFound from "./pages/NotFound";

function App() {
  const handleFormSubmit = async (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <FormProvider onSubmit={handleFormSubmit}>
          <TranslationProvider>
            <Routes>
              <Route element={<GuestLayout />}>
                {guestRoutes.map((route) => {
                  if (route.children) {
                    return (
                      <Route key={route.path} path={route.path}>
                        {route.children.map((childRoute) => (
                          <Route
                            key={`${route.path}-${childRoute.path}`}
                            path={childRoute.path}
                            element={childRoute.element}
                          />
                        ))}
                      </Route>
                    );
                  }
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
                <Route path="*" element={<NotFound />} />
              </Route>
              {authenticatedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                >
                  {route.children?.map((childRoute) => (
                    <Route
                      key={`${route.path}-${childRoute.path}`}
                      path={`${route.path}/${childRoute.path}`}
                      element={childRoute.element}
                    />
                  ))}
                </Route>
              ))}
            </Routes>
          </TranslationProvider>
        </FormProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
