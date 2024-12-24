import { useState } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { useAuth } from "../../hooks/useAuth";
import { NotificationItem } from "./NotificationItem";
import type { NotificationType } from "../../types/notifications";

export function NotificationCenter() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<{
    type?: NotificationType[];
    read?: boolean;
  }>({});

  const { notifications, markAsRead, markAllAsRead } = useNotifications(
    user?.id || "",
    filter,
  );

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <button
            onClick={() => markAllAsRead()}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setFilter({})}
            className={`px-3 py-1 text-sm rounded-full ${
              !filter.type
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter({ read: false })}
            className={`px-3 py-1 text-sm rounded-full ${
              filter.read === false
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={() => markAsRead(notification.id)}
          />
        ))}

        {notifications.length === 0 && (
          <div className="px-4 py-6 text-center text-gray-500">
            No notifications to show
          </div>
        )}
      </div>
    </div>
  );
}
