import { formatDistanceToNow } from "date-fns";
import {
  Briefcase,
  UserCheck,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";

type ActivityType =
  | "job_posted"
  | "candidate_applied"
  | "interview_scheduled"
  | "feedback_added"
  | "offer_sent"
  | "offer_accepted"
  | "application_rejected";

interface Activity {
  id: string;
  type: ActivityType;
  date: string;
  actor: {
    name: string;
    avatar?: string;
  };
  job?: {
    id: string;
    title: string;
  };
  candidate?: {
    id: string;
    name: string;
  };
  comment?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const activityConfig: Record<
  ActivityType,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    getMessage: (activity: Activity) => string;
  }
> = {
  job_posted: {
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    getMessage: (a) => `posted a new job: ${a.job?.title}`,
  },
  candidate_applied: {
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-100",
    getMessage: (a) => `applied for ${a.job?.title}`,
  },
  interview_scheduled: {
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    getMessage: (a) =>
      `scheduled an interview with ${a.candidate?.name} for ${a.job?.title}`,
  },
  feedback_added: {
    icon: MessageSquare,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    getMessage: (a) => `added feedback for ${a.candidate?.name}`,
  },
  offer_sent: {
    icon: Send,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    getMessage: (a) =>
      `sent an offer to ${a.candidate?.name} for ${a.job?.title}`,
  },
  offer_accepted: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    getMessage: (a) => `accepted the offer for ${a.job?.title}`,
  },
  application_rejected: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    getMessage: (a) => `was not selected for ${a.job?.title}`,
  },
};

export function ActivityFeed({
  activities,
  className = "",
}: ActivityFeedProps) {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Activity Feed</h3>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity) => {
            const config = activityConfig[activity.type];
            const Icon = config.icon;

            return (
              <li key={activity.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center space-x-4">
                  <div className={`${config.bgColor} rounded-lg p-2`}>
                    <Icon
                      className={`h-5 w-5 ${config.color}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.actor.name} {config.getMessage(activity)}
                    </p>
                    {activity.comment && (
                      <p className="mt-1 text-sm text-gray-500">
                        {activity.comment}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDistanceToNow(new Date(activity.date), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all activity
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
