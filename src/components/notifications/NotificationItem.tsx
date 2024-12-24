import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Notification, NotificationType } from "../../types/notifications";

interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
}

const notificationIcons: Record<NotificationType, LucideIcon> = {
  application_status: Info,
  interview_scheduled: Info,
  message_received: Info,
  job_match: CheckCircle,
  profile_view: Info,
  skill_endorsed: CheckCircle,
  job_alert: AlertTriangle,
  system_alert: AlertCircle,
};

const notificationColors: Record<NotificationType, string> = {
  application_status: "text-blue-500",
  interview_scheduled: "text-purple-500",
  message_received: "text-green-500",
  job_match: "text-blue-500",
  profile_view: "text-gray-500",
  skill_endorsed: "text-yellow-500",
  job_alert: "text-orange-500",
  system_alert: "text-red-500",
};

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const Icon = notificationIcons[notification.type];
  const colorClass = notificationColors[notification.type];

  return (
    <div
      className={`
        p-4 hover:bg-gray-50 transition-colors
        ${notification.read ? "opacity-75" : ""}
      `}
      onClick={onRead}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${colorClass}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {notification.title}
          </p>
          <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
          {notification.metadata?.url && (
            <a
              href={notification.metadata.url}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              View details
            </a>
          )}
          <p className="mt-1 text-xs text-gray-400">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
