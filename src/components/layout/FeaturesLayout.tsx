import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';

const FeaturesLayout: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back navigation - only show on role-specific pages */}
      {useLocation().pathname !== '/features' && (
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link
                  to="/features"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <svg 
                    className="mr-2 h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  {translate('nav.back')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-4rem)]">
        <Outlet />
      </div>
    </div>
  );
};

export default FeaturesLayout;
