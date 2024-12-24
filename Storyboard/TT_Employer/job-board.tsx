import React from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { JobCard } from './JobCard';
import { useJobs } from '../../hooks/useJobs';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export default function JobBoard() {
  const { jobs, isLoading } = useJobs();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Job Listings</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Post New Job
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}