
import { Briefcase, Star, Users, Clock } from 'lucide-react';
import type { QuickStatsMetrics } from '../../types/dashboard';

interface QuickStatsProps {
  metrics?: QuickStatsMetrics;
  isLoading?: boolean;
}

const stats = [
  {
    name: "Active Jobs",
    value: (m?: QuickStatsMetrics) => m?.activeJobs ?? 0,
    trend: (m?: QuickStatsMetrics) => m?.trends?.jobs ?? 0,
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    name: "Applications",
    value: (m?: QuickStatsMetrics) => m?.applications ?? 0,
    trend: (m?: QuickStatsMetrics) => m?.trends?.applications ?? 0,
    icon: Star,
    color: "text-yellow-600",
  },
  {
    name: "Interviews",
    value: (m?: QuickStatsMetrics) => m?.interviews ?? 0,
    trend: (m?: QuickStatsMetrics) => m?.trends?.interviews ?? 0,
    icon: Users,
    color: "text-green-600",
  },
  {
    name: "Response Rate",
    value: (m?: QuickStatsMetrics) => `${m?.responseRate ?? 0}%`,
    trend: (m?: QuickStatsMetrics) => m?.trends?.responseRate ?? 0,
    icon: Clock,
    color: "text-purple-600",
  },
];

export default function QuickStats({ metrics, isLoading = false }: QuickStatsProps) {
  if (isLoading) {
    return <div className="animate-pulse">Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className={`absolute rounded-md p-3 ${item.color} bg-opacity-10`}>
              <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {item.value(metrics)}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <span className={`font-medium ${item.trend(metrics) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend(metrics) >= 0 ? '↑' : '↓'} {Math.abs(item.trend(metrics))}%
                </span>
              </div>
            </div>
          </dd>
        </div>
      ))}
    </div>
  );
}
