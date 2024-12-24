import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { JobList } from './JobList';
import { JobForm } from './JobForm';
import { useCustomerJobs } from '../../hooks/useCustomerJobs';

export function JobManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs, isLoading } = useCustomerJobs();

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Job Listings</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Job Post
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Job List or Form */}
      {isCreating ? (
        <JobForm
          onSubmit={async () => {
            setIsCreating(false);
            // Refresh jobs list
          }}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <JobList jobs={filteredJobs} isLoading={isLoading} />
      )}
    </div>
  );
}