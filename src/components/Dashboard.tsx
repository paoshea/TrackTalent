import { useAuth } from "../hooks/useAuth";
import { useCustomerJobs } from "../hooks/useCustomerJobs";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { useRecentActivity } from "../hooks/useRecentActivity";
import { MetricsGrid } from "./dashboard/MetricsGrid";
import { ActiveJobsList } from "./dashboard/ActiveJobsList";
import { RecentActivity } from "./dashboard/RecentActivity";
import { StatusUpdates } from "./dashboard/StatusUpdates";
import { LoadingState } from "./shared/LoadingState";

export function Dashboard() {
  const { user } = useAuth();
  const { jobs, isLoading: jobsLoading } = useCustomerJobs({
    customerId: user?.id || "",
    status: ["published"],
    limit: 5,
  });

  const { metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { activities, isLoading: activitiesLoading } = useRecentActivity();

  if (!user) return null;

  if (jobsLoading || metricsLoading || activitiesLoading) {
    return <LoadingState />;
  }

  const dashboardMetrics = [
    {
      title: "Active Jobs",
      value: metrics?.jobs?.active ?? 0,
      change: metrics?.jobs?.trend ?? 0,
      description: "Currently active job postings",
    },
    {
      title: "Total Candidates",
      value: metrics?.applications?.total ?? 0,
      change: metrics?.applications?.trend ?? 0,
      description: "Total candidates in pipeline",
    },
    {
      title: "Placement Rate",
      value: `${metrics?.placementRate ?? 0}%`,
      change: metrics?.placementRateChange ?? 0,
      description: "Successful placements rate",
    },
    {
      title: "Time to Fill",
      value: metrics?.timeToFill ? `${metrics.timeToFill} days` : "N/A",
      change: metrics?.timeToFillChange ?? 0,
      description: "Average days to fill a position",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="space-y-8">
        {/* Metrics Grid */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <MetricsGrid
                key={metric.title}
                {...metric}
              />
            ))}
          </div>
        </section>

        {/* Active Jobs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Active Jobs</h2>
            <a
              href="/jobs"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all
            </a>
          </div>
          <ActiveJobsList jobs={jobs} />
        </section>

        {/* Recent Activity and Status Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h2>
            <RecentActivity activities={activities} />
          </section>

          <section>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Status Updates
            </h2>
            <StatusUpdates userId={user.id} limit={5} />
          </section>
        </div>
      </div>
    </div>
  );
}
