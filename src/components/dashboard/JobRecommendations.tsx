
import React from 'react';
import { useRecommendedJobs } from '../../hooks/useRecommendedJobs';
import { JobCard } from '../jobs/JobCard';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export function JobRecommendations() {
  const { jobs, isLoading } = useRecommendedJobs();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recommended Jobs</h2>
      <div className="space-y-4">
        {jobs?.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No recommended jobs found. Update your skills to get better recommendations.
          </p>
        ) : (
          jobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}
