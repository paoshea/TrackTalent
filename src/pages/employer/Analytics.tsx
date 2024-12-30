import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { BarChart as BarChartIcon, Users, Clock, Target } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';

export default function Analytics() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Total Applications', value: '1,234', icon: Users, change: '+12%' },
    { label: 'Average Time to Hire', value: '23 days', icon: Clock, change: '-8%' },
    { label: 'Acceptance Rate', value: '68%', icon: Target, change: '+5%' }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hiring Analytics</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <metric.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{metric.label}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Applications</h2>
          <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <BarChartIcon className="h-12 w-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart visualization placeholder</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}