import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { useActivityFeed } from "../../hooks/useActivityFeed";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";

const navigationItems = [
  { name: "Overview", href: "/dashboard", icon: TrendingUp },
  { name: "Applications", href: "/applications", icon: CheckCircle },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Network", href: "/network", icon: Users },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { metrics } = useDashboardMetrics();
  const { activities } = useActivityFeed();

  const userMetrics = React.useMemo(() => {
    if (!metrics) return null;

    return {
      applications: metrics.applications || 0,
      interviews: metrics.interviews || 0,
      connections: metrics.connections || 0,
      messages: metrics.messages || 0,
    };
  }, [metrics]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </a>
              ))}
            </div>

            {user && (
              <div className="flex items-center">
                <span className="text-sm text-gray-500">
                  Welcome, {user.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {userMetrics && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <MetricCard
                label="Applications"
                value={userMetrics.applications}
                icon={CheckCircle}
              />
              <MetricCard
                label="Interviews"
                value={userMetrics.interviews}
                icon={Users}
              />
              <MetricCard
                label="Connections"
                value={userMetrics.connections}
                icon={Briefcase}
              />
              <MetricCard
                label="Messages"
                value={userMetrics.messages}
                icon={TrendingUp}
              />
            </div>
          )}

          {children}

          {activities && activities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <li key={activity.id} className="px-4 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <activity.icon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}

function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {label}
              </dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardLayout.displayName = "DashboardLayout";
MetricCard.displayName = "MetricCard";
