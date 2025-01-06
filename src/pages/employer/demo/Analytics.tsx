// import React from 'react';
import { TrendingUp, Users, Clock, CheckCircle, Calendar, Filter } from 'lucide-react';

const metrics = {
  overview: {
    activeJobs: 12,
    totalApplications: 245,
    averageTimeToHire: '28 days',
    offerAcceptanceRate: '85%',
  },
  trends: {
    applications: [45, 52, 38, 65, 48, 55, 42, 68, 58, 72, 48, 62],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  sources: [
    { name: 'Direct Applications', value: 45 },
    { name: 'Employee Referrals', value: 25 },
    { name: 'Job Boards', value: 20 },
    { name: 'Social Media', value: 10 },
  ],
  stages: [
    { name: 'Applied', count: 245, color: 'bg-blue-500' },
    { name: 'Screening', count: 180, color: 'bg-yellow-500' },
    { name: 'Interview', count: 120, color: 'bg-green-500' },
    { name: 'Offer', count: 45, color: 'bg-purple-500' },
    { name: 'Hired', count: 38, color: 'bg-indigo-500' },
  ],
};

export default function Analytics() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Hiring Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your recruitment metrics and hiring performance.
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              Last 30 Days
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
              Filters
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.activeJobs}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.totalApplications}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Time to Hire</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.averageTimeToHire}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Offer Acceptance</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.offerAcceptanceRate}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Funnel */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Application Funnel</h3>
          <div className="mt-4 bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              {metrics.stages.map((stage) => (
                <div key={stage.name}>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-900">
                    <span>{stage.name}</span>
                    <span>{stage.count}</span>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`${stage.color} rounded-full h-2`}
                        style={{
                          width: `${(stage.count / metrics.stages[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Sources */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Application Sources</h3>
          <div className="mt-4 bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              {metrics.sources.map((source) => (
                <div key={source.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-900">{source.name}</div>
                  <div className="mt-2 flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{source.value}%</div>
                    <div className="ml-2 text-sm text-gray-500">of applications</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
