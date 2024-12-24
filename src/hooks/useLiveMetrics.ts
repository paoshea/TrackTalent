import { useState, useEffect } from "react";
import type { DashboardMetrics } from "../types/dashboard";
import { supabase } from "../lib/supabase";

export function useLiveMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from("dashboard_metrics")
          .select("*")
          .single();

        if (error) throw error;

        setMetrics(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch metrics",
        );
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = supabase
      .channel("dashboard_metrics")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dashboard_metrics",
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setMetrics(null);
          } else {
            setMetrics(payload.new as DashboardMetrics);
          }
        },
      )
      .subscribe();

    fetchInitialMetrics();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("dashboard_metrics")
        .select("*")
        .single();

      if (error) throw error;

      setMetrics(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh metrics",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    metrics,
    isLoading,
    error,
    refresh,
  };
}
