import React from 'react';
import { BarChart, LineChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export default function EmployerAnalytics() {
  const { metrics, loading } = useAnalytics();

  if (loading) {
    return <LoadingSpinner />;
  }

  const MetricCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-indigo-100 rounded-full">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Applications"
          value={metrics.totalApplications}
          icon={Users}
          trend={5.2}
        />
        <MetricCard
          title="Time to Hire (avg)"
          value={metrics.timeToHire + ' days'}
          icon={Clock}
          trend={-2.1}
        />
        <MetricCard
          title="Acceptance Rate"
          value={metrics.acceptanceRate + '%'}
          icon={CheckCircle}
          trend={1.8}
        />
        <MetricCard
          title="Active Jobs"
          value={metrics.activeJobs}
          icon={TrendingUp}
          trend={3.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Application Trends
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#4F46E5"
                  fill="#EEF2FF"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">