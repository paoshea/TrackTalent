import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";
import { NotificationItem } from "./NotificationItem";
import { LoadingState } from "../shared/LoadingState";

export function NotificationList() {
  const { user } = useAuth();
  const { notifications, markAsRead, isLoading } = useNotifications(
    user?.id || "",
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (!notifications.length) {
    return (
      <div className="text-center p-4 text-gray-500">
        No notifications to show
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRead={() => markAsRead(notification.id)}
        />
      ))}
    </div>
  );
}
