import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="py-2">
            <button
              onClick={() => handleNavigation('/')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('/jobs')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Jobs
            </button>
            <button
              onClick={() => handleNavigation('/features')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Features
            </button>
            <button
              onClick={() => handleNavigation('/resources')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Resources
            </button>
          </div>

          <div className="border-t py-2">
            <button
              onClick={() => handleNavigation('/auth/login')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigation('/auth/register')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-blue-600"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
