//import React from 'react';
import { useRecommendedJobs } from '../../hooks/useRecommendedJobs';
import { JobCard } from '../jobs/JobCard';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'react-feather';
import { useTranslation } from '../../contexts/TranslationContext';
import type { TranslationKey } from '../../contexts/TranslationContext';

export function JobRecommendations() {
  const { jobs, isLoading } = useRecommendedJobs();
  const { translate } = useTranslation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {translate('dashboard.recommendations' as TranslationKey)}
        </h2>
        <Link to="/candidate/jobs" className="text-indigo-600 hover:text-indigo-700">
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="space-y-4">
        {jobs?.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            {translate('dashboard.noRecommendations' as TranslationKey)}
          </p>
        ) : (
          jobs?.map((job) => (
            <div 
              key={job.id} 
              className="cursor-pointer hover:bg-gray-50 transition-colors duration-200" 
              onClick={() => window.location.href = `/candidate/jobs/${job.id}`}
            >
              <JobCard job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
