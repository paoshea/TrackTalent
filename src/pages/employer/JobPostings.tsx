import React from 'react';
import { Logo } from '../../components/branding/Logo';
import { Briefcase, Plus, Search } from 'lucide-react';
import { JobList } from '../../components/jobs/JobList';
import { JobForm } from '../../components/jobs/JobForm';

export default function JobPostings() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Logo className="h-12 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Postings</h1>
        <p className="text-lg text-gray-600">Create and manage job postings with ease</p>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transition-shadow duration-200">
          <Plus className="h-5 w-5 mr-2" />
          Create New Job
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <JobList jobs={[]} />
    </div>
  );
}