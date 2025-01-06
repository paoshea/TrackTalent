import React from 'react';
import { useClientManagement, useRevenueAnalytics, useDashboardMetrics } from '../../services/mockHooks';
import { 
  BarChart3, 
  Globe, 
  Network, 
  Users, 
  Scale,
  Target,
  Building2,
  Award
} from 'lucide-react';

export const PartnerPreview: React.FC = () => {
  const { clients, verificationStats } = useClientManagement();
  const { monthly, totalRevenue, growth } = useRevenueAnalytics();
  const { metrics } = useDashboardMetrics('partner');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Network Growth Dashboard</h3>

      {/* Network Overview */}
      <div className="mb-8 bg-purple-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Network className="h-5 w-5 mr-2 text-purple-600" />
          Network Performance
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Globe className="h-5 w-5 text-purple-600 mb-2" />
            <div className="text-2xl font-semibold text-gray-900">15</div>
            <div className="text-sm text-gray-500">Countries</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Users className="h-5 w-5 text-purple-600 mb-2" />
            <div className="text-2xl font-semibold text-gray-900">500+</div>
            <div className="text-sm text-gray-500">Active Mentors</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Building2 className="h-5 w-5 text-purple-600 mb-2" />
            <div className="text-2xl font-semibold text-gray-900">25</div>
            <div className="text-sm text-gray-500">Specializations</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <Scale className="h-5 w-5 text-purple-600 mb-2" />
            <div className="text-2xl font-semibold text-gray-900">150%</div>
            <div className="text-sm text-gray-500">Network Growth</div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      {/* Revenue Overview */}
      <div className="mb-8 bg-green-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
          Revenue Growth
        </h4>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-semibold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Growth</div>
              <div className="text-2xl font-semibold text-green-600">
                +{growth}%
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-24">
            {monthly.map(month => (
              <div key={month.month} className="flex flex-col items-center">
                <div className="w-12 bg-green-600 rounded-t"
                  style={{ height: `${(month.revenue / totalRevenue) * 100}px` }}
                />
                <div className="text-xs text-gray-500 mt-1">{month.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Success */}
      <div className="mb-8 bg-blue-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          Client Success Metrics
        </h4>
        <div className="space-y-4">
          {clients.map(client => (
            <div key={client.name} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">
                    {client.activeJobs} active jobs
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {client.verifiedHires} of {client.totalHires} verified
                  </div>
                  <div className="text-xs text-green-600">
                    {client.retentionRate}% retention
                  </div>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${(client.verifiedHires / client.totalHires) * 100}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Skill Match: {client.skillMatchRate}%</span>
                <span>Avg. Time to Hire: {client.averageTimeToHire}d</span>
                <span>Satisfaction: {client.satisfactionScore}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Impact */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2 text-yellow-600" />
          Program Impact
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-900 mb-2">Hiring Success</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time to Hire</span>
                <span className="font-medium">{verificationStats.averageTimeToHire}d</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Skill Match</span>
                <span className="font-medium">{verificationStats.averageSkillMatch}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Retention</span>
                <span className="font-medium">{verificationStats.averageRetention}%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm font-medium text-gray-900 mb-2">Placements</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-medium">{verificationStats.totalPlacements}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Verified</span>
                <span className="font-medium">{verificationStats.verifiedPlacements}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Satisfaction</span>
                <span className="font-medium">{verificationStats.averageSatisfaction}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
