import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { HeaderProvider } from './contexts/HeaderContext';
import { TranslationProvider } from './contexts/TranslationContext';

function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <HeaderProvider>
          <RouterProvider router={router} />
        </HeaderProvider>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
