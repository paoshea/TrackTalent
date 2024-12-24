import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import type { DashboardMetrics } from "../../types/dashboard";

interface UserMetricsProps {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth?: DashboardMetrics["userGrowth"];
}

export function UserMetrics({
  totalUsers,
  activeUsers,
  newUsers,
  userGrowth,
}: UserMetricsProps) {
  const activeRate = ((activeUsers / totalUsers) * 100).toFixed(1);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">User Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {totalUsers.toLocaleString()}
          </p>
        </div>

        {/* Active Users */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <div className="mt-1">
            <p className="text-2xl font-semibold text-gray-900">
              {activeUsers.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{activeRate}% active</p>
          </div>
        </div>

        {/* New Users */}
        <div>
          <h3 className="text-sm font-medium text-gray-500">New Users</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {newUsers.toLocaleString()}
          </p>
        </div>

        {/* Growth Rate */}
        {userGrowth && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
            <div className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {userGrowth.value}%
              </p>
              <span
                className={`ml-2 flex items-center text-sm ${
                  userGrowth.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {userGrowth.isPositive ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {userGrowth.isPositive ? "Increase" : "Decrease"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
