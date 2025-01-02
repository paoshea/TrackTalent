import React from 'react';
import { useClientManagement, useRevenueAnalytics, useDashboardMetrics } from '../../services/mockHooks';

export const PartnerPreview: React.FC = () => {
  const { clients } = useClientManagement();
  const { monthly, totalRevenue, growth } = useRevenueAnalytics();
  const { metrics } = useDashboardMetrics('partner');

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

      {/* Revenue Overview */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Revenue Overview</h4>
        <div className="bg-gray-50 p-4 rounded-md">
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
                <div className="w-12 bg-indigo-600 rounded-t"
                  style={{ height: `${(month.revenue / totalRevenue) * 100}px` }}
                />
                <div className="text-xs text-gray-500 mt-1">{month.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Management */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-2">Active Clients</h4>
        <div className="space-y-4">
          {clients.map(client => (
            <div key={client.name} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">
                    {client.activeJobs} active jobs
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {client.totalHires} hires
                  </div>
                  <div className="text-xs text-gray-500">total</div>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full"
                  style={{ width: `${(client.totalHires / 15) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
