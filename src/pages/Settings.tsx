// import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../contexts/TranslationContext';

export function Settings() {
  const { user } = useAuth();
  const { translate } = useTranslation();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {translate('dashboard.settings')}
      </h1>
      
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {/* Settings content will go here */}
          <p className="text-gray-500">Settings page under construction.</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
