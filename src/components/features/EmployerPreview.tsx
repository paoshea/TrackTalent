import React from 'react';
import { useApplicantTracking, useCustomerJobs, useDashboardMetrics } from '../../services/mockHooks';

export const EmployerPreview: React.FC = () => {
  const { stages } = useApplicantTracking();
  const { jobs } = useCustomerJobs({ customerId: 'mock', status: ['active'] });
  const { metrics } = useDashboardMetrics('employer');

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

      {/* Applicant Pipeline */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Applicant Pipeline</h4>
        <div className="relative">
          <div className="flex justify-between mb-2">
            {stages.map((stage) => (
              <div key={stage.name} className="text-center flex-1">
                <div className="text-sm font-medium text-gray-900">{stage.count}</div>
                <div className="text-xs text-gray-500">{stage.name}</div>
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
            <div className="absolute left-0 top-0 bottom-0 bg-indigo-600" style={{ width: '75%' }} />
          </div>
        </div>
      </div>

      {/* Active Jobs */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-2">Active Job Listings</h4>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <div>
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.company}</div>
                </div>
                <div className="text-sm text-gray-500">{job.location}</div>
              </div>
              <div className="text-sm text-gray-600 mb-2">{job.description}</div>
              <div className="flex flex-wrap gap-2">
                {job.requirements?.map((req: string) => (
                  <span key={req} className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                    {req}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-indigo-600 font-medium">
                {job.salary_range}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
