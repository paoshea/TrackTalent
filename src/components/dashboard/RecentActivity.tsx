import { formatTimeAgo } from "../../utils/dateUtils";
import type { Activity } from "../../types/dashboard";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (!activities?.length) {
    return (
      <div className="text-center text-gray-500">
        No recent activity to display
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => {
          const Icon = activity.icon;
          return (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {activity.title}{" "}
                        <span className="font-medium text-gray-900">
                          {activity.description}
                        </span>
                      </p>
                      {activity.content && (
                        <p className="mt-1 text-sm text-gray-500">
                          {activity.content}
                        </p>
                      )}
                      {activity.metadata && (
                        <div className="mt-2 text-sm text-gray-500">
                          {activity.metadata.jobTitle && (
                            <p>Job: {activity.metadata.jobTitle}</p>
                          )}
                          {activity.metadata.candidateName && (
                            <p>Candidate: {activity.metadata.candidateName}</p>
                          )}
                          {activity.metadata.interviewDate && (
                            <p>
                              Interview Date:{" "}
                              {formatTimeAgo(activity.metadata.interviewDate)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
