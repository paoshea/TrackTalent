import React, { useState } from 'react';
import { Search, Briefcase, MapPin, Filter } from 'lucide-react';
import { JobCard } from './JobCard';
import { useJobs } from '../hooks/useJobs';
import { LoadingSpinner } from './shared/LoadingSpinner';

export function JobBoard() {
  const { jobs, isLoading } = useJobs();
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    experienceLevel: '',
    jobType: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesQuery = !filters.query || 
      job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.query.toLowerCase());
      
    const matchesLocation = !filters.location || 
      job.location.toLowerCase().includes(filters.location.toLowerCase());
      
    const matchesExperience = !filters.experienceLevel || 
      job.experienceLevel === filters.experienceLevel;
      
    return matchesQuery && matchesLocation && matchesExperience;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs or companies"
                value={filters.query}
                onChange={e => setFilters(prev => ({ ...prev, query: e.target.value }))}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  value={filters.experienceLevel}
                  onChange={e => setFilters(prev => ({ ...prev, experienceLevel: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  value={filters.jobType}
                  onChange={e => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Jobs List */}
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}