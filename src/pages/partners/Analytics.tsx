import React from 'react';
import { BarChart, Users, Award, ArrowLeft } from 'lucide-react';

export default function Analytics() {
  const metrics = [
    {
      id: 1,
      label: 'Active Apprenticeships',
      value: '234',
      trend: '+12%',
      icon: Award
    },
    {
      id: 2,
      label: 'Mentorship Sessions',
      value: '1,890',
      trend: '+8%',
      icon: Users
    },
    {
      id: 3,
      label: 'Success Rate',
      value: '94%',
      trend: '+3%',
      icon: BarChart
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <img src="/favicon.svg" alt="Logo" className="h-12 w-12 md:h-[48px] md:w-[48px]" />
        <button 
          onClick={() => window.history.back()} 
          className="ml-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Partner Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">{metric.label}</h2>
              <metric.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">{metric.value}</span>
              <span className="ml-2 text-sm font-medium text-green-600">{metric.trend}</span>
            </p>
          </div>
        ))}
      </div>
      <footer className="mt-16 border-t pt-8">
        <p className="text-center text-gray-600">© 2024 All rights reserved.</p>
      </footer>
    </div>
  );
}