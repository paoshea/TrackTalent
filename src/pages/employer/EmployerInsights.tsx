// import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { BarChart, TrendingUp } from 'lucide-react';

export default function EmployerInsights() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Hiring Analytics & Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Recruitment Analytics</h3>
            <p className="text-gray-600 mb-4">Track key metrics and optimize your hiring process with data-driven insights.</p>
            <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">View Demo →</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Performance Tracking</h3>
            <p className="text-gray-600 mb-4">Monitor recruitment performance and identify areas for improvement.</p>
            <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">Learn More →</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
