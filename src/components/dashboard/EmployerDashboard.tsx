import React from 'react';
import { QuickStats } from './QuickStats';

const EmployerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Employer Dashboard</h1>
      <QuickStats role="employer" />
      
      {/* Additional employer-specific sections can be added here */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Verification System</h2>
          <p className="text-sm text-gray-500">
            Monitor your verification system performance and candidate quality metrics.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Talent Pipeline</h2>
          <p className="text-sm text-gray-500">
            Track your talent acquisition funnel and candidate progression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
