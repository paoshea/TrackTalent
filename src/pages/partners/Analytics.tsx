
import React from 'react';
import { BarChart, Users, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/layout/Footer';

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center justify-between mb-8">
            <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
            <h1 className="text-3xl font-bold text-gray-900">Partner Analytics</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
