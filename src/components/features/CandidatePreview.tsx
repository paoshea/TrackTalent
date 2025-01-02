import React from 'react';
import { useSkillAssessments, useCareerProgress, useDashboardMetrics } from '../../services/mockHooks';

export const CandidatePreview: React.FC = () => {
  const { skills } = useSkillAssessments();
  const { goals } = useCareerProgress();
  const { metrics } = useDashboardMetrics('candidate');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Preview Dashboard</h3>
      
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Active Jobs</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.activeJobs.value}</div>
          <div className="text-sm text-green-600">+{metrics.activeJobs.change} this week</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Applications</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.applications.value}</div>
          <div className="text-sm text-green-600">+{metrics.applications.change} this week</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Interviews</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.interviews.value}</div>
          <div className="text-sm text-green-600">+{metrics.interviews.change} this week</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-500">Response Rate</div>
          <div className="text-xl font-semibold text-gray-900">{metrics.responseRate.value}%</div>
          <div className="text-sm text-green-600">+{metrics.responseRate.change}% this week</div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-2">Verified Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <div 
              key={skill.name}
              className={`px-3 py-1 rounded-full text-sm ${
                skill.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {skill.name} - {skill.level}
              {skill.verified && (
                <span className="ml-1 text-green-600">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-2">Career Goals</h4>
        <div className="space-y-4">
          {goals.map(goal => (
            <div key={goal.title} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{goal.title}</span>
                <span className="text-sm text-gray-500">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 mt-1">{goal.progress}% complete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
