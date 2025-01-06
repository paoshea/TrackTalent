import React from 'react';
import { QuickStats } from './QuickStats';
import { Network, Users, TrendingUp, Globe } from 'lucide-react';

const PartnerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Partner Dashboard</h1>
      <QuickStats role="partner" />
      
      {/* Network Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Network className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900">Network Growth</h2>
          </div>
          <p className="text-sm text-gray-500">
            Track your network expansion and partner collaboration metrics.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900">Active Mentors</h2>
          </div>
          <p className="text-sm text-gray-500">
            Monitor mentor engagement and program participation.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900">Program Impact</h2>
          </div>
          <p className="text-sm text-gray-500">
            Measure the success and impact of your programs.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-medium text-gray-900">Global Reach</h2>
          </div>
          <p className="text-sm text-gray-500">
            View your global presence and expansion opportunities.
          </p>
        </div>
      </div>

      {/* Program Performance */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Program Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Apprenticeships</h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Completion Rate</span>
                <span className="text-sm font-medium text-purple-600">89%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '89%' }} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Mentorship</h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Satisfaction Rate</span>
                <span className="text-sm font-medium text-purple-600">95%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Career Growth</h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Advancement Rate</span>
                <span className="text-sm font-medium text-purple-600">85%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
