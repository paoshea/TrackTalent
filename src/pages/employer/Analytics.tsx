
import React from 'react';
import { Logo } from '../../components/branding/Logo';
import { BarChart2, TrendingUp, Users, Clock } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Logo className="h-12 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
        <p className="text-lg text-gray-600">Get insights into your hiring process</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BarChart2, label: 'Total Applications', value: '0' },
          { icon: TrendingUp, label: 'Response Rate', value: '0%' },
          { icon: Users, label: 'Active Candidates', value: '0' },
          { icon: Clock, label: 'Avg. Time to Hire', value: '0 days' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white overflow-hidden shadow rounded-lg">
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
                    <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
