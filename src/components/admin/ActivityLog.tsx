import { formatDistanceToNow } from "date-fns";
import type { DashboardMetrics, Activity } from "../../types/dashboard";

interface ActivityLogProps {
  activities: NonNullable<DashboardMetrics["recentActivities"]>;
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "application_received":
        return "📝";
      case "interview_scheduled":
      case "interview_completed":
        return "🗣️";
      case "offer_sent":
      case "offer_accepted":
        return "📋";
      case "candidate_hired":
        return "🎉";
      case "job_posted":
        return "📢";
      case "status_update":
        return "📌";
      default:
        return "📌";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-500">No recent activity</p>
      ) : (
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity: Activity, index: number) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {index !== activities.length - 1 && (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <span className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white text-lg">
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">
                            {activity.user.name}
                          </span>{" "}
                          <span className="text-gray-500">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium text-gray-900">
                            {activity.target}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {formatDistanceToNow(new Date(activity.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      {activity.metadata &&
                        Object.keys(activity.metadata).length > 0 && (
                          <div className="mt-2 text-sm text-gray-700">
                            <ul className="list-disc pl-5 space-y-1">
                              {Object.entries(activity.metadata).map(
                                ([key, value]: [string, unknown]) => (
                                  <li key={key}>
                                    <span className="font-medium">{key}:</span>{" "}
                                    {Array.isArray(value)
                                      ? value.length
                                      : String(value)}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
