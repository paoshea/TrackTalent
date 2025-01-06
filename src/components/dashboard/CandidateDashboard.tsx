import React from 'react';
import { QuickStats } from './QuickStats';

const CandidateDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Candidate Dashboard</h1>
      <QuickStats role="candidate" />
    </div>
  );
};

export default CandidateDashboard;
