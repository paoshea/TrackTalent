import { useAuth } from "../hooks/useAuth";
import * as mockHooks from "../services/mockHooks";
import { useCustomerJobs as realUseCustomerJobs } from "../hooks/useCustomerJobs";
import { useDashboardMetrics as realUseDashboardMetrics } from "../hooks/useDashboardMetrics";
import { useRecentActivity as realUseRecentActivity } from "../hooks/useRecentActivity";
import { MetricsGrid } from "./dashboard/MetricsGrid";
import { ActiveJobsList } from "./dashboard/ActiveJobsList";
import { RecentActivity } from "./dashboard/RecentActivity";
import { StatusUpdates } from "./dashboard/StatusUpdates";
import { LoadingState } from "./shared/LoadingState";

function Dashboard() {
  const { user } = useAuth();
  const isGuest = user?.id?.startsWith('guest-');
  const useCustomerJobs = isGuest ? mockHooks.useCustomerJobs : realUseCustomerJobs;
  const useDashboardMetrics = isGuest ? mockHooks.useDashboardMetrics : realUseDashboardMetrics;
  const useRecentActivity = isGuest ? mockHooks.useRecentActivity : realUseRecentActivity;

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

  // Helper function to handle both real and mock metrics
  const getMetricValue = (metric: number | { value: number; change: number } | undefined) => {
    if (metric === undefined) return 0;
    if (typeof metric === 'number') return metric;
    return metric.value;
  };

  const getMetricChange = (metric: number | { value: number; change: number } | undefined) => {
    if (metric === undefined) return 0;
    if (typeof metric === 'number') return 0;
    return metric.change;
  };

  const dashboardMetrics = [
    {
      title: "Active Jobs",
      value: getMetricValue(metrics?.activeJobs),
      change: getMetricChange(metrics?.activeJobs),
      description: "Currently active job postings",
    },
    {
      title: "Applications",
      value: getMetricValue(metrics?.applications),
      change: getMetricChange(metrics?.applications),
      description: "Total applications received",
    },
    {
      title: "Interviews",
      value: getMetricValue(metrics?.interviews),
      change: getMetricChange(metrics?.interviews),
      description: "Scheduled interviews",
    },
    {
      title: "Response Rate",
      value: `${getMetricValue(metrics?.responseRate)}%`,
      change: getMetricChange(metrics?.responseRate),
      description: "Application response rate",
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
              <MetricsGrid key={metric.title} {...metric} />
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

export default Dashboard;
