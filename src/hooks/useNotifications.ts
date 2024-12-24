import { useState, useEffect } from "react";
import type { Notification, NotificationFilter } from "../types/notifications";
import { supabase } from "../lib/supabase";

export function useNotifications(userId: string, filter?: NotificationFilter) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("notifications")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (filter) {
          if (filter.type?.length) {
            query = query.in("type", filter.type);
          }
          if (filter.read !== undefined) {
            query = query.eq("read", filter.read);
          }
          if (filter.startDate) {
            query = query.gte("created_at", filter.startDate);
          }
          if (filter.endDate) {
            query = query.lte("created_at", filter.endDate);
          }
          if (filter.priority) {
            query = query.eq("priority", filter.priority);
          }
        }

        const { data, error } = await query;

        if (error) throw error;

        setNotifications(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch notifications",
        );
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        },
      )
      .subscribe();

    fetchNotifications();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, filter]);

  const markAsRead = async (notificationId: string) => {
    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("notifications")
        .update({ read: true, read_at: now })
        .eq("id", notificationId);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true, readAt: now }
            : notification,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark notification as read",
      );
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      const now = new Date().toISOString();
      const unreadNotifications = notifications.filter((n) => !n.read);
      const unreadIds = unreadNotifications.map((n) => n.id);

      if (unreadIds.length === 0) return;

      const { error } = await supabase
        .from("notifications")
        .update({ read: true, read_at: now })
        .in("id", unreadIds);

      if (error) throw error;

      setNotifications((prev) =>
        prev.map((notification) =>
          !notification.read
            ? { ...notification, read: true, readAt: now }
            : notification,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to mark all notifications as read",
      );
      throw err;
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

      if (error) throw error;

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete notification",
      );
      throw err;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
