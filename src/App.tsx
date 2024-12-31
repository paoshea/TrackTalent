
import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import routes from "./router/routes";
import { Logo } from "./components/branding/Logo";
import { supabase } from './lib/supabase';

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <TranslationProvider>
          <RouterProvider router={router} />
        </TranslationProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
