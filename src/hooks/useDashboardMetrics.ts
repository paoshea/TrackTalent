import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
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

      if (import.meta.env.DEV) {
        // Use mock data in development
        const mockData = await getMockMetrics();
        setMetrics(mockData);
      } else {
        // Fetch metrics from Supabase in production
        const { data, error: fetchError } = await supabase.rpc('get_dashboard_metrics');
        if (fetchError) throw fetchError;
        setMetrics(data || null);
      }
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
