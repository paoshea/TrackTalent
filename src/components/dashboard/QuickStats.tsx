import React from 'react';
import { useRoleSpecificData } from '../../hooks/useRoleSpecificData';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle2, 
  Target,
  Clock
} from 'lucide-react';
import type { QuickStatsMetrics } from '../../types/dashboard';

interface QuickStatsProps {
  role?: 'candidate' | 'employer' | 'partner';
  metrics?: QuickStatsMetrics;
}

interface StatData {
  label: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down';
  icon: React.FC<{ className?: string }>;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ role, metrics }) => {
  const { stats, loading, error } = useRoleSpecificData(role || 'employer');

  if (loading && !metrics) {
    return <div>Loading stats...</div>;
  }

  if (error && !metrics) {
    return <div>Error loading stats: {error.message}</div>;
  }

  // If metrics are provided directly, use those instead of role-specific stats
  if (metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Jobs"
          value={metrics.activeJobs}
          change={`${metrics.trends.jobs >= 0 ? '+' : ''}${metrics.trends.jobs}%`}
          trend={metrics.trends.jobs >= 0 ? 'up' : 'down'}
          icon={Target}
          color="text-blue-500"
        />
        <StatCard
          label="Applications"
          value={metrics.applications}
          change={`${metrics.trends.applications >= 0 ? '+' : ''}${metrics.trends.applications}%`}
          trend={metrics.trends.applications >= 0 ? 'up' : 'down'}
          icon={CheckCircle2}
          color="text-blue-500"
        />
        <StatCard
          label="Response Rate"
          value={`${metrics.responseRate}%`}
          change={`${metrics.trends.responseRate >= 0 ? '+' : ''}${metrics.trends.responseRate}%`}
          trend={metrics.trends.responseRate >= 0 ? 'up' : 'down'}
          icon={Clock}
          color="text-blue-500"
        />
        <StatCard
          label="Connections"
          value={metrics.connections}
          change={`${metrics.trends.connections >= 0 ? '+' : ''}${metrics.trends.connections}%`}
          trend={metrics.trends.connections >= 0 ? 'up' : 'down'}
          icon={TrendingUp}
          color="text-blue-500"
        />
      </div>
    );
  }

  const getRoleStats = (): StatData[] => {
    switch (role) {
      case 'candidate':
        return [
          {
            label: 'Active Jobs',
            value: stats?.analytics.talentPool.activeLearners || 0,
            change: '+15%',
            trend: 'up',
            icon: Target
          },
          {
            label: 'Skill Match Rate',
            value: stats?.analytics.skills.verificationRate || '0%',
            change: '+5%',
            trend: 'up',
            icon: CheckCircle2
          },
          {
            label: 'Response Time',
            value: '48hrs',
            change: '-20%',
            trend: 'down',
            icon: Clock
          },
          {
            label: 'Career Growth',
            value: stats?.analytics.placements.careerProgression || '0%',
            change: '+8%',
            trend: 'up',
            icon: TrendingUp
          }
        ];

      case 'employer':
        return [
          {
            label: 'Talent Pool',
            value: stats?.analytics.talentPool.totalCandidates || 0,
            change: '+25%',
            trend: 'up',
            icon: Users
          },
          {
            label: 'Verified Skills',
            value: stats?.analytics.talentPool.verifiedSkills || 0,
            change: '+30%',
            trend: 'up',
            icon: CheckCircle2
          },
          {
            label: 'Retention Rate',
            value: stats?.analytics.placements.retentionRate || '0%',
            change: '+5%',
            trend: 'up',
            icon: Target
          },
          {
            label: 'Time to Hire',
            value: '48hrs',
            change: '-15%',
            trend: 'down',
            icon: Clock
          }
        ];

      case 'partner':
        return [
          {
            label: 'Active Programs',
            value: stats?.apprenticeships.programs.active || 0,
            change: '+20%',
            trend: 'up',
            icon: Target
          },
          {
            label: 'Network Growth',
            value: stats?.mentorship.effectiveness.networkGrowth || '0%',
            change: '+45%',
            trend: 'up',
            icon: TrendingUp
          },
          {
            label: 'Success Rate',
            value: stats?.apprenticeships.outcomes.completionRate || '0%',
            change: '+10%',
            trend: 'up',
            icon: CheckCircle2
          },
          {
            label: 'Active Mentors',
            value: stats?.mentorship.network.activeMentors || 0,
            change: '+35%',
            trend: 'up',
            icon: Users
          }
        ];

      default:
        return [];
    }
  };

  const roleStats = getRoleStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {roleStats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          icon={stat.icon}
          color={
            role === 'employer' ? 'text-green-500' :
            role === 'partner' ? 'text-purple-500' :
            'text-blue-500'
          }
        />
      ))}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number | string;
  change: string;
  trend: 'up' | 'down';
  icon: React.FC<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  trend,
  icon: Icon,
  color
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="ml-2 text-sm text-gray-500">{label}</span>
      </div>
      <div className={`flex items-center text-sm ${
        trend === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend === 'up' ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {change}
      </div>
    </div>
    <div className="mt-2">
      <div className="text-2xl font-semibold text-gray-900">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div 
          className={`h-1 rounded-full ${color.replace('text-', 'bg-')}`}
          style={{ 
            width: `${
              typeof value === 'string' 
                ? parseInt(value) 
                : Math.min((value / 1000) * 100, 100)
            }%` 
          }}
        />
      </div>
    </div>
  </div>
);
