
import React from 'react';
import { Users, Filter, Search } from 'lucide-react';

export default function CandidateManagement() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500">
          ← Back to Home
        </Link>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Candidate Management</h1>
        <p className="text-lg text-gray-600">Track and manage candidates throughout the hiring process</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-lg transition-shadow duration-200">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center text-gray-500 py-12">
            <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg">No candidates yet</p>
            <p className="mt-2">Candidates who apply to your jobs will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
