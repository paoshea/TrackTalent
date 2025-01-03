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
import type { Job } from "../types/jobs";
import type { Activity } from "../types/dashboard";
import { LucideIcon } from "lucide-react";

interface User {
  id: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  description: string;
}

interface AuthContextType {
  user: User | null;
}

type MetricValue = number | { value: number; change: number };

function getMetricValue(metric: MetricValue): number {
  return typeof metric === 'number' ? metric : metric.value;
}

function getMetricChange(metric: MetricValue): number {
  return typeof metric === 'number' ? 0 : metric.change;
}

function Dashboard() {
  const { user } = useAuth() as AuthContextType;
  const isGuest = user?.id?.startsWith('guest-');

  // Use the real hooks directly, TypeScript will infer the correct types
  const useCustomerJobs = isGuest ? mockHooks.useCustomerJobs : realUseCustomerJobs;
  const useDashboardMetrics = isGuest ? mockHooks.useDashboardMetrics : realUseDashboardMetrics;
  const useRecentActivity = isGuest ? mockHooks.useRecentActivity : realUseRecentActivity;

  const { jobs: hookJobs, isLoading: jobsLoading, error: jobsError } = useCustomerJobs({
    customerId: user?.id || "",
    status: ["published"],
    limit: 5,
  });

  const { 
    metrics, 
    isLoading: metricsLoading, 
    error: metricsError 
  } = useDashboardMetrics();

  const { 
    activities: hookActivities, 
    isLoading: activitiesLoading,
    error: activitiesError 
  } = useRecentActivity();

  // Convert hook jobs to dashboard jobs
  const jobs: Job[] = hookJobs.map(hookJob => ({
    id: hookJob.id,
    title: hookJob.title,
    location: hookJob.location,
    type: "full-time",
    experience_level: "mid",
    companyId: "default",
    company: {
      id: "default",
      name: typeof hookJob.company === 'string' ? hookJob.company : hookJob.company.name,
      logo: ""
    },
    status: (hookJob.status === "published" || hookJob.status === "draft" || hookJob.status === "closed") 
      ? hookJob.status 
      : "published",
    applicantCount: 0,
    createdAt: typeof hookJob.created_at === 'string' ? hookJob.created_at : new Date().toISOString(),
    updatedAt: typeof hookJob.created_at === 'string' ? hookJob.created_at : new Date().toISOString(),
    description: hookJob.description || "",
    department: "",
    requirements: hookJob.requirements || [],
    benefits: [],
    experienceLevel: "mid",
    compensation: {
      salary: {
        min: 0,
        max: 0,
        currency: "USD",
        period: "yearly"
      }
    },
    skills: [],
    salaryRange: {
      min: 0,
      max: 0,
      currency: "USD",
      period: "yearly"
    },
    remote: {
      allowed: false,
      type: "occasional"
    }
  }));

  // Convert hook activities to dashboard activities
  const activities: Activity[] = hookActivities.map(hookActivity => ({
    id: hookActivity.id,
    type: hookActivity.type === 'application' ? 'job_posted' : 
          hookActivity.type === 'interview' ? 'interview_scheduled' :
          hookActivity.type === 'offer' ? 'offer_sent' : 'status_update',
    title: hookActivity.type,
    description: hookActivity.type,
    icon: (() => null) as unknown as LucideIcon,
    timestamp: new Date().toISOString(),
    content: "",
    user: {
      id: "",
      name: "",
    },
    action: hookActivity.type,
    target: "",
    metadata: {
      ...hookActivity.metadata,
      description: hookActivity.type
    }
  }));

  if (!user) return null;

  if (jobsLoading || metricsLoading || activitiesLoading) {
    return <LoadingState />;
  }

  if (jobsError || metricsError || activitiesError || !metrics) {
    return <div>Error loading dashboard data</div>;
  }

  const dashboardMetrics: MetricCardProps[] = [
    {
      title: "Active Jobs",
      value: getMetricValue(metrics.activeJobs),
      change: getMetricChange(metrics.activeJobs),
      description: "Currently active job postings",
    },
    {
      title: "Applications",
      value: getMetricValue(metrics.applications),
      change: getMetricChange(metrics.applications),
      description: "Total applications received",
    },
    {
      title: "Interviews",
      value: getMetricValue(metrics.interviews),
      change: getMetricChange(metrics.interviews),
      description: "Scheduled interviews",
    },
    {
      title: "Response Rate",
      value: `${getMetricValue(metrics.responseRate)}%`,
      change: getMetricChange(metrics.responseRate),
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
