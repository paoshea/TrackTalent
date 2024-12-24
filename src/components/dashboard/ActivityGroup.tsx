import { formatDate } from "../../utils/dateUtils";
import { ActivityItem } from "./ActivityItem";
import type { ActivityItem as ActivityItemType } from "../../types/dashboard";

interface ActivityGroupProps {
  date: string;
  activities: ActivityItemType[];
  onLike: (id: string) => void;
  onComment: (id: string, comment: string) => void;
}

export function ActivityGroup({
  date,
  activities,
  onLike,
  onComment,
}: ActivityGroupProps) {
  const formattedDate = formatDate(new Date(date));

  return (
    <div
      className="mb-8"
      role="group"
      aria-label={`Activities from ${formattedDate}`}
    >
      <h3
        className="text-sm font-medium text-gray-500 mb-4"
        id={`activity-date-${date}`}
      >
        {formatDate(new Date(date))}
      </h3>
      <div
        className="space-y-4"
        role="list"
        aria-labelledby={`activity-date-${date}`}
      >
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onLike={onLike}
            onComment={onComment}
          />
        ))}
      </div>
    </div>
  );
}
