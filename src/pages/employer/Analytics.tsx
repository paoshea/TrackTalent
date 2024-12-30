
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, Users, Clock, ChevronDown, Calendar } from 'lucide-react';

const MOCK_MONTHLY_DATA = [
  { month: 'Jan', applications: 45, hires: 3 },
  { month: 'Feb', applications: 52, hires: 4 },
  { month: 'Mar', applications: 68, hires: 5 },
  { month: 'Apr', applications: 75, hires: 6 },
  { month: 'May', applications: 85, hires: 7 },
  { month: 'Jun', applications: 92, hires: 8 },
];

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('6M');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500">
          ← Back to Home
        </Link>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-lg text-gray-600">Track your hiring performance and metrics</p>
      </div>

      <div className="mb-8 flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Calendar className="h-5 w-5 mr-2" />
          Last {timeframe}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { icon: BarChart2, label: 'Total Applications', value: '417', trend: '+12%' },
          { icon: TrendingUp, label: 'Response Rate', value: '68%', trend: '+5%' },
          { icon: Users, label: 'Active Candidates', value: '156', trend: '+8%' },
          { icon: Clock, label: 'Avg. Time to Hire', value: '18 days', trend: '-2 days' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.trend}
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
        <h3 className="text-lg font-medium text-gray-900 mb-4">Applications Overview</h3>
        <div className="h-64 relative">
          <div className="absolute inset-0 flex items-end justify-between">
            {MOCK_MONTHLY_DATA.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center w-1/6">
                <div className="relative w-full">
                  <div 
                    className="bg-indigo-200 w-full rounded-t"
                    style={{ height: `${data.applications}px` }}
                  />
                  <div 
                    className="bg-indigo-600 w-full rounded-t absolute bottom-0"
                    style={{ height: `${data.hires * 8}px` }}
                  />
                </div>
                <span className="mt-2 text-sm text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-200 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Applications</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2" />
            <span className="text-sm text-gray-600">Hires</span>
          </div>
        </div>
      </div>
    </div>
  );
}
