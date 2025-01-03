
// import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Users, Clock } from 'lucide-react';

export default function EmployerSolutions() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Recruitment Solutions</h1>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-indigo-600 mr-4" />
              <h3 className="text-xl font-semibold">Talent Pipeline Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Streamline your recruitment process with our comprehensive pipeline management tools.</p>
            <Link to="/auth/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Start Building Your Pipeline
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-indigo-600 mr-4" />
              <h3 className="text-xl font-semibold">Interview Scheduling</h3>
            </div>
            <p className="text-gray-600 mb-4">Automated interview scheduling and candidate communication tools.</p>
            <Link to="/auth/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Explore Scheduling Tools
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
