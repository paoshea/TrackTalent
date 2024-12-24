import { useState, useEffect } from "react";
import type { Activity } from "../types/dashboard";
import { supabase } from "../lib/supabase";

export function useLiveActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start as true since we fetch immediately
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(20);

        if (error) throw error;

        const formattedActivities: Activity[] = data.map((activity) => ({
          id: activity.id,
          type: activity.type,
          title: activity.title,
          description: activity.description,
          timestamp: activity.timestamp,
          icon: activity.icon,
          metadata: activity.metadata,
        }));

        setActivities(formattedActivities);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch activities",
        );
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = supabase
      .channel("activities")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "activities",
        },
        (payload) => {
          const newActivity = payload.new;
          const formattedActivity: Activity = {
            id: newActivity.id,
            type: newActivity.type,
            title: newActivity.title,
            description: newActivity.description,
            timestamp: newActivity.timestamp,
            icon: newActivity.icon,
            metadata: newActivity.metadata,
          };

          setActivities((prev) => [formattedActivity, ...prev].slice(0, 20));
        },
      )
      .subscribe();

    fetchInitialActivities();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    activities,
    isLoading,
    error,
  };
}
