import type { DashboardMetrics } from "../../types/dashboard";

interface SystemHealthProps {
  uptime: number;
  issues: DashboardMetrics["systemAlerts"];
}

export function SystemHealth({ uptime, issues = [] }: SystemHealthProps) {
  const getStatusColor = () => {
    if (issues.some((issue) => issue.priority === "high"))
      return "text-red-500";
    if (issues.some((issue) => issue.priority === "medium"))
      return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">System Health</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Uptime */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">System Uptime</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {uptime.toFixed(2)}%
          </p>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
          <p className={`mt-1 text-2xl font-semibold ${getStatusColor()}`}>
            {issues.length === 0
              ? "Healthy"
              : issues.some((issue) => issue.priority === "high")
                ? "Critical"
                : "Warning"}
          </p>
        </div>

        {/* Active Issues */}
        {issues.length > 0 && (
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Active Issues
            </h3>
            <div className="space-y-2">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md ${
                    issue.priority === "high"
                      ? "bg-red-50 text-red-700"
                      : issue.priority === "medium"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{issue.message}</span>
                    <span className="text-sm capitalize">{issue.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
