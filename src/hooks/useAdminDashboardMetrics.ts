import { useState, useEffect, useCallback } from "react";
import { getMockAdminMetrics } from "../services/mockAdminMetrics";
import type { DashboardMetrics } from "../types/dashboard";

export interface UseAdminDashboardMetricsResult {
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAdminDashboardMetrics(): UseAdminDashboardMetricsResult {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use mock data for now
      // TODO: Replace with actual API call when backend is ready
      const mockData = await getMockAdminMetrics();
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
