import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { getAnalytics } from "../services/analytics";
import type { DashboardMetrics } from "../types/dashboard";

export interface UseDashboardMetricsResult {
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboardMetrics(): UseDashboardMetricsResult {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getAnalytics({
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        }
      });
      setMetrics(data.metrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metrics");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    metrics,
    isLoading,
    error,
    refetch: fetchMetrics,
  };
}

export default useDashboardMetrics;
