// import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { Briefcase, Users, BarChart } from 'lucide-react';

export default function EmployerFeatures() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Hiring Solutions for Employers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Job Posting Management</h3>
            <p className="text-gray-600 mb-4">Create and manage job postings with our intuitive tools.</p>
            <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">Get Started →</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Candidate Matching</h3>
            <p className="text-gray-600 mb-4">Find the perfect candidates with our AI-powered matching system.</p>
            <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">Learn More →</Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-gray-600 mb-4">Make data-driven decisions with comprehensive hiring analytics.</p>
            <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-500">Explore →</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
