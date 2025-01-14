import { useState, useEffect, useCallback } from "react";
import { getMockMetrics } from "../services/mockMetrics";
import type { QuickStatsMetrics } from "../types/dashboard";

export interface UseDashboardMetricsResult {
  metrics: QuickStatsMetrics | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDashboardMetrics(): UseDashboardMetricsResult {
  const [metrics, setMetrics] = useState<QuickStatsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use mock data for now
      // TODO: Replace with actual API call when backend is ready
      const mockData = await getMockMetrics();
      setMetrics(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch metrics");
    } finally {
      setIsLoading(false);
    }
  }, []);

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
