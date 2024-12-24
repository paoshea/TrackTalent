import React from 'react';
import { useCustomerMetrics } from '../../hooks/useCustomerMetrics';
import { ActiveJobsList } from './ActiveJobsList';
import { CandidateStats } from './CandidateStats';
import { MetricCard } from '../shared/MetricCard';
import { Users, Clock, TrendingUp } from 'lucide-react';

export function EmployerDashboard() {
  const { metrics } = useCustomerMetrics();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Applicants"
          value={metrics.totalApplicants}
          icon={Users}
          description="Across all active positions"
        />
        <MetricCard 
          title="Time to Fill"
          value={`${metrics.averageTimeToFill} days`}
          icon={Clock}
          description="Average days to fill a position"
        />
        <MetricCard 
          title="Success Rate"
          value={`${metrics.successRate}%`}
          icon={TrendingUp}
          description="Successful placements"
        />
      </div>

      {/* Active Jobs and Candidate Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActiveJobsList />
        </div>
        <div className="lg:col-span-1">
          <CandidateStats />
        </div>
      </div>
    </div>
  );
}