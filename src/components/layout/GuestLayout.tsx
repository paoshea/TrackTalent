import React, { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { Footer } from './Footer';

const GuestLayout: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage } = useTranslation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isLandingPage && (
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/favicon.svg"
                  alt="TrackTalent"
                  className="h-16 w-auto"
                />
                <span className="ml-3 text-2xl font-bold text-gray-900">
                  TrackTalent
                </span>
              </Link>
            </div>

            {/* Navigation and Actions */}
            <div className="flex items-center space-x-8">
              {/* Main Navigation */}
              <nav className="hidden md:flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="/features"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Features
                </Link>
              </nav>

              {/* Language and Auth */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
                >
                  {language.toUpperCase()}
                </button>
                <div className="h-4 w-px bg-gray-200" />
                <Link
                  to="/auth/login"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestLayout;
