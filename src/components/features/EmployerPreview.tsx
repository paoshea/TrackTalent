import React from 'react';
import { useRoleSpecificData } from '../../hooks/useRoleSpecificData';
import {  
  Users, 
  CheckCircle2, 
  Clock,
  Target,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';

export const EmployerPreview: React.FC = () => {
  const { stats, loading, error } = useRoleSpecificData('employer');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Talent Acquisition Dashboard</h3>

      {/* Verification System Overview */}
      <div className="mb-8 bg-green-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
          Verification System
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-semibold text-gray-900">{stats?.analytics.talentPool.verifiedSkills}</div>
            <div className="text-sm text-gray-500">Verified Skills</div>
            <div className="text-xs text-green-600">{stats?.analytics.skills.verificationRate} success rate</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-semibold text-gray-900">{stats?.analytics.talentPool.activeLearners}</div>
            <div className="text-sm text-gray-500">Active Learners</div>
            <div className="text-xs text-green-600">{stats?.analytics.talentPool.skillGrowthRate} growth</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-semibold text-gray-900">{stats?.analytics.placements.total}</div>
            <div className="text-sm text-gray-500">Successful Placements</div>
            <div className="text-xs text-green-600">{stats?.analytics.placements.retentionRate} retention</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-semibold text-gray-900">{stats?.analytics.skills.certifications}</div>
            <div className="text-sm text-gray-500">Certifications</div>
            <div className="text-xs text-green-600">Industry validated</div>
          </div>
        </div>
      </div>

      {/* Talent Pipeline */}
      <div className="mb-8 bg-blue-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Talent Pipeline
        </h4>
        <div className="space-y-4">
          {stats?.analytics.skills.top.map((skill, index) => (
            <div key={skill} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span className="font-medium text-gray-900">{skill}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {['High demand', 'Growing fast', 'Top rated'][index]}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${85 - index * 10}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{stats?.analytics.talentPool.verifiedSkills} verified candidates</span>
                <span>{stats?.analytics.placements.retentionRate} retention rate</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Performance */}
      <div className="mb-8 bg-purple-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-purple-600" />
          Hiring Performance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-900 mb-2">Time to Hire</div>
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-semibold text-gray-900">48hrs</div>
                <div className="text-sm text-gray-500">Average match time</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-900 mb-2">Quality of Hire</div>
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-semibold text-gray-900">{stats?.analytics.placements.retentionRate}</div>
                <div className="text-sm text-gray-500">Retention rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-yellow-600" />
          Growth Metrics
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-900 mb-2">Talent Growth</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pool Size</span>
                <span className="font-medium">{stats?.analytics.talentPool.totalCandidates}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active Growth</span>
                <span className="font-medium">{stats?.analytics.talentPool.skillGrowthRate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Verified Skills</span>
                <span className="font-medium">{stats?.analytics.skills.verificationRate}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-900 mb-2">Career Impact</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Salary Growth</span>
                <span className="font-medium">{stats?.analytics.placements.averageSalaryIncrease}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progression</span>
                <span className="font-medium">{stats?.analytics.placements.careerProgression}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Retention</span>
                <span className="font-medium">{stats?.analytics.placements.retentionRate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
