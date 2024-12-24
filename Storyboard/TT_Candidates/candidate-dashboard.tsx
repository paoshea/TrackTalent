import React from 'react';
import { JobRecommendations } from './JobRecommendations';
import { SkillProgress } from './SkillProgress';
import { CareerGoals } from './CareerGoals';
import { LearningResources } from './LearningResources';
import { ApplicationStats } from './ApplicationStats';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { useUserProfile } from '../../hooks/useUserProfile';

export function CandidateDashboard() {
  const { profile, isLoading } = useUserProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {profile?.firstName || 'Candidate'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your job search
        </p>
      </div>

      {/* Application Stats */}
      <div className="mb-8">
        <ApplicationStats />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <JobRecommendations />
          <SkillProgress />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <CareerGoals />
          <LearningResources />
        </div>
      </div>
    </div>
  );
}