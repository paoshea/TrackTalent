
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import { GuestLayout } from "./components/layout/GuestLayout";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Jobs from "./pages/jobs/Jobs";
import Resources from "./pages/resources/Resources";
import SuccessStories from "./pages/success-stories/SuccessStories";
import Analytics from "./pages/partners/Analytics";
import Apprenticeships from "./pages/partners/Apprenticeships";
import Mentorship from "./pages/partners/Mentorship";
import NotFound from "./pages/NotFound";
import authenticatedRoutes from "./router/authenticatedRoutes";

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
              {authenticatedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                >
                  {route.children?.map((child) => (
                    <Route
                      key={child.path}
                      path={child.path}
                      element={child.element}
                    />
                  ))}
                </Route>
              ))}
              <Route element={<GuestLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/success-stories" element={<SuccessStories />} />
                <Route path="/partners/analytics" element={<Analytics />} />
                <Route path="/partners/apprenticeships" element={<Apprenticeships />} />
                <Route path="/partners/mentorship" element={<Mentorship />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TranslationProvider>
        </FormProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
