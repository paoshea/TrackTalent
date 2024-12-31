
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <metric.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {metric.label}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
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
      </div>
    </MainLayout>
  );
}
