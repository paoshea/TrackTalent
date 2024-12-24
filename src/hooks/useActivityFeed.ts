import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getActivityIcon } from "../components/shared/ActivityIcon";
import type { Activity, ActivityFeedOptions } from "../types/activity";

export function useActivityFeed(options: ActivityFeedOptions = {}) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase
          .from("activities")
          .select("*")
          .order("created_at", { ascending: false });

        if (options.userId) {
          query = query.eq("userId", options.userId);
        }

        if (options.type) {
          query = query.eq("type", options.type);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        if (options.after) {
          query = query.gt("created_at", options.after);
        }

        if (options.before) {
          query = query.lt("created_at", options.before);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        const formattedActivities: Activity[] = data.map((activity) => ({
          id: activity.id,
          type: activity.type,
          userId: activity.userId,
          message: activity.message,
          icon: getActivityIcon(activity.type),
          timestamp: activity.created_at,
          content: activity.content,
          interactions: activity.interactions,
          metadata: activity.metadata,
        }));

        setActivities(formattedActivities);
        setHasMore(data.length === options.limit);
        setNextCursor(data[data.length - 1]?.created_at);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load activities",
        );
        console.error("Error fetching activities:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("activities")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
          filter: options.userId ? `userId=eq.${options.userId}` : undefined,
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setActivities((prev) => [
                {
                  ...payload.new,
                  icon: getActivityIcon(payload.new.type),
                } as Activity,
                ...prev,
              ]);
              break;
            case "UPDATE":
              setActivities((prev) =>
                prev.map((activity) =>
                  activity.id === payload.new.id
                    ? ({
                        ...payload.new,
                        icon: getActivityIcon(payload.new.type),
                      } as Activity)
                    : activity,
                ),
              );
              break;
            case "DELETE":
              setActivities((prev) =>
                prev.filter((activity) => activity.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [
    options.userId,
    options.type,
    options.limit,
    options.before,
    options.after,
  ]);

  const loadMore = async () => {
    if (!nextCursor || !hasMore) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .lt("created_at", nextCursor)
        .limit(options.limit || 10);

      if (fetchError) throw fetchError;

      const formattedActivities: Activity[] = data.map((activity) => ({
        id: activity.id,
        type: activity.type,
        userId: activity.userId,
        message: activity.message,
        icon: getActivityIcon(activity.type),
        timestamp: activity.created_at,
        content: activity.content,
        interactions: activity.interactions,
        metadata: activity.metadata,
      }));

      setActivities((prev) => [...prev, ...formattedActivities]);
      setHasMore(data.length === (options.limit || 10));
      setNextCursor(data[data.length - 1]?.created_at);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more activities",
      );
      console.error("Error loading more activities:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activities,
    isLoading,
    error,
    hasMore,
    loadMore,
  };
}
