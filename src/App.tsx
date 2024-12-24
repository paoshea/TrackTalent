import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";
import { routes } from "./router/routes";
import { Logo } from "./components/branding/Logo";

const router = createBrowserRouter(routes);

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Logo className="h-12 w-auto mx-auto mb-4" />
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <FormProvider onSubmit={async () => {}}>
        <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
