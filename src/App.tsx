import { useState, useEffect, createContext, useContext } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";
import { routes } from "./router/routes";
import { Logo } from "./components/branding/Logo";
import { supabase } from './lib/supabase';

const router = createBrowserRouter(routes);

const TranslationContext = createContext({ language: 'en', setLanguage: () => {} });

function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Default language

  const contextValue = { language, setLanguage };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}


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
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data } = await supabase.from('todos').select();
      if (data && data.length > 0) {
        setTodos(data);
      }
    }
    getTodos();
  }, []);

  return (
    <AuthProvider>
      <FormProvider onSubmit={async () => {}}>
        <TranslationProvider>
          <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
        </TranslationProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;