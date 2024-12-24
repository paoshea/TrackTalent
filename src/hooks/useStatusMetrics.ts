import { useState, useEffect } from "react";
import { getStatusEngagementMetrics } from "../services/analytics";
import type { StatusMetrics } from "../types/status";

export function useStatusMetrics(statusId: string) {
  const [metrics, setMetrics] = useState<StatusMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await getStatusEngagementMetrics(statusId);
        setMetrics(data);
      } catch (err) {
        console.error("Failed to load status metrics:", err);
        setError("Failed to load status metrics");
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [statusId]);

  return {
    metrics,
    isLoading,
    error,
  };
}
