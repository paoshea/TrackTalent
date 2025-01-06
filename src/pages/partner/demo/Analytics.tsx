// import React from 'react';
import { Users, TrendingUp, Award, Star, Calendar, Filter } from 'lucide-react';

const metrics = {
  overview: {
    activePrograms: 25,
    totalLearners: 1250,
    completionRate: '89%',
    placementRate: '85%',
  },
  impact: {
    economicMobility: '65%',
    skillGap: '90%',
    diversity: '45%',
    retention: '92%',
  },
  skills: {
    top: ['JavaScript', 'Python', 'React', 'AWS', 'Data Analysis'],
    emerging: ['AI/ML', 'Cloud Architecture', 'Blockchain'],
    growth: '+45% YoY',
  },
  outcomes: [
    { name: 'Average Salary Increase', value: '85%', trend: '+5%' },
    { name: 'Career Transitions', value: '450+', trend: '+12%' },
    { name: 'Industry Partners', value: '50+', trend: '+8%' },
    { name: 'Mentor Network', value: '500+', trend: '+15%' },
  ],
};

export default function Analytics() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Partner Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your impact and program performance metrics.
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
                  <Star className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Programs</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.activePrograms}
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
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Learners</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.totalLearners}
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
                  <Award className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.completionRate}
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Placement Rate</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.overview.placementRate}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Program Impact</h3>
          <div className="mt-4 bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {Object.entries(metrics.impact).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-semibold text-gray-900">{value}</div>
                    <div className="text-sm text-green-600">Improvement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Skills Overview</h3>
          <div className="mt-4 bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Top Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {metrics.skills.top.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Emerging Skills</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {metrics.skills.emerging.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Skill Growth</h4>
                <div className="mt-2">
                  <div className="text-2xl font-semibold text-gray-900">{metrics.skills.growth}</div>
                  <div className="text-sm text-gray-500">Average skill acquisition rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Program Outcomes</h3>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.outcomes.map((outcome) => (
              <div key={outcome.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-500">{outcome.name}</div>
                    <div className="text-sm text-green-600">{outcome.trend}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-semibold text-gray-900">{outcome.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
