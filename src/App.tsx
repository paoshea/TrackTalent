import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BrandingProvider } from './contexts/BrandingContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { TranslationProvider } from './contexts/TranslationContext';
import { router } from './router';

function App() {
  return (
    <AuthProvider>
      <BrandingProvider>
        <LoadingProvider>
          <TranslationProvider>
            <RouterProvider router={router} />
          </TranslationProvider>
        </LoadingProvider>
      </BrandingProvider>
    </AuthProvider>
  );
}

export default App;
