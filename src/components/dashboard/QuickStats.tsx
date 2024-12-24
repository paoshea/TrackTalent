import {
  Users,
  Briefcase,
  Calendar,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface DashboardMetrics {
  activeJobs: number;
  totalCandidates: number;
  scheduledInterviews: number;
  successfulHires: number;
  trends: {
    jobs: number;
    candidates: number;
    interviews: number;
    hires: number;
  };
}

interface QuickStatsProps {
  metrics: DashboardMetrics;
  className?: string;
}

const stats = [
  {
    name: "Active Jobs",
    value: (m: DashboardMetrics) => m.activeJobs,
    trend: (m: DashboardMetrics) => m.trends.jobs,
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Total Candidates",
    value: (m: DashboardMetrics) => m.totalCandidates,
    trend: (m: DashboardMetrics) => m.trends.candidates,
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Scheduled Interviews",
    value: (m: DashboardMetrics) => m.scheduledInterviews,
    trend: (m: DashboardMetrics) => m.trends.interviews,
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    name: "Successful Hires",
    value: (m: DashboardMetrics) => m.successfulHires,
    trend: (m: DashboardMetrics) => m.trends.hires,
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

export function QuickStats({ metrics, className = "" }: QuickStatsProps) {
  return (
    <div className={className}>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const value = stat.value(metrics);
          const trend = stat.trend(metrics);
          const Icon = stat.icon;

          return (
            <div
              key={stat.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${stat.bgColor}`}>
                  <Icon
                    className={`h-6 w-6 ${stat.color}`}
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {value.toLocaleString()}
                </p>
                <p
                  className={`
                    ml-2 flex items-baseline text-sm font-semibold
                    ${trend > 0 ? "text-green-600" : "text-red-600"}
                  `}
                >
                  {trend > 0 ? (
                    <TrendingUp
                      className="self-center flex-shrink-0 h-4 w-4 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <TrendingDown
                      className="self-center flex-shrink-0 h-4 w-4 text-red-500"
                      aria-hidden="true"
                    />
                  )}
                  <span className="ml-1">{Math.abs(trend)}%</span>
                </p>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all
                      <span className="sr-only"> {stat.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
