
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { MainLayout } from '../../components/layout/MainLayout';
import { ProfileEditor } from '../../components/profile/ProfileEditor';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="text-center mb-12">
          <Logo className="h-48 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Company Profile</h1>
          <p className="text-lg text-gray-600">Manage your company information</p>
        </div>
        <ProfileEditor />
      </div>
    </MainLayout>
  );
}
