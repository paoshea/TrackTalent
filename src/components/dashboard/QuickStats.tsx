import { Briefcase, Star, Users, Clock } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import type { QuickStatsMetrics } from '../../types/dashboard';
import type { TranslationKey } from '../../contexts/TranslationContext';

interface QuickStatsProps {
  metrics: QuickStatsMetrics | null | undefined;
  isLoading?: boolean;
  error?: string;
}

const stats = [
  {
    translationKey: "stats.activeJobs" as TranslationKey,
    value: (m?: QuickStatsMetrics | null) => m?.activeJobs ?? 0,
    trend: (m?: QuickStatsMetrics | null) => m?.trends?.jobs ?? 0,
    icon: Briefcase,
    color: "text-blue-600",
    link: "/candidate/jobs"
  },
  {
    translationKey: "stats.applications" as TranslationKey,
    value: (m?: QuickStatsMetrics | null) => m?.applications ?? 0,
    trend: (m?: QuickStatsMetrics | null) => m?.trends?.applications ?? 0,
    icon: Star,
    color: "text-yellow-600",
    link: "/candidate/applications"
  },
  {
    translationKey: "stats.interviews" as TranslationKey,
    value: (m?: QuickStatsMetrics | null) => m?.interviews ?? 0,
    trend: (m?: QuickStatsMetrics | null) => m?.trends?.interviews ?? 0,
    icon: Users,
    color: "text-green-600",
    link: "/candidate/interviews"
  },
  {
    translationKey: "stats.responseRate" as TranslationKey,
    value: (m?: QuickStatsMetrics | null) => `${m?.responseRate ?? 0}%`,
    trend: (m?: QuickStatsMetrics | null) => m?.trends?.responseRate ?? 0,
    icon: Clock,
    color: "text-purple-600",
    link: "/candidate/response-rate"
  },
];

export function QuickStats({ metrics, isLoading = false, error }: QuickStatsProps) {
  const { translate } = useTranslation();

  if (isLoading) {
    return <div className="animate-pulse">Loading stats...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error loading stats: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <a key={item.translationKey} href={item.link} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6 hover:bg-gray-100 hover:shadow-md transition duration-300">
          <dt>
            <div className={`absolute rounded-md p-3 ${item.color} bg-opacity-10`}>
              <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {translate(item.translationKey)}
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
        </a>
      ))}
    </div>
  );
}
