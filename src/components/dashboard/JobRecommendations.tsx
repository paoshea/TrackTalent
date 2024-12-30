import React from 'react';
import { useRecommendedJobs } from '../../hooks/useRecommendedJobs';
import { JobCard } from '../jobs/JobCard';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom'; // Import Link component
import { ChevronRight } from 'react-feather'; // Import ChevronRight icon


export function JobRecommendations() {
  const { jobs, isLoading } = useRecommendedJobs();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200">
      <h2 className="text-lg font-medium text-gray-900 hover:text-indigo-600">
        <Link to="/candidate/jobs" className="flex items-center justify-between">
          Recommended Jobs
          <ChevronRight className="h-5 w-5" />
        </Link>
      </h2>
      <div className="space-y-4">
        {jobs?.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            No recommended jobs found. Update your skills to get better recommendations.
          </p>
        ) : (
          jobs?.map((job) => (
            <Link to={`/candidate/jobs/${job.id}`} key={job.id} className="hover:underline"> {/* Added Link to individual job */}
              <JobCard job={job} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}