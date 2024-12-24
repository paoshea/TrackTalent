import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface CustomerMetrics {
  views: number;
  viewsTrend: {
    value: number;
    isPositive: boolean;
  };
  applications: number;
  applicationsTrend: {
    value: number;
    isPositive: boolean;
  };
  timeToFill: number;
  timeToHire: number;
  acceptanceRate: number;
  acceptanceRateTrend: {
    value: number;
    isPositive: boolean;
  };
}

interface UseCustomerMetricsResult {
  metrics: CustomerMetrics | null;
  isLoading: boolean;
  error: string | null;
}

export function useCustomerMetrics(jobId: string): UseCustomerMetricsResult {
  const [metrics, setMetrics] = useState<CustomerMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get current metrics
        const { data: currentMetrics, error: currentError } = await supabase
          .from("job_metrics")
          .select("*")
          .eq("jobId", jobId)
          .single();

        if (currentError) throw currentError;

        // Get historical metrics for trend calculation
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: historicalMetrics, error: historicalError } =
          await supabase
            .from("job_metrics_history")
            .select("*")
            .eq("jobId", jobId)
            .gte("timestamp", thirtyDaysAgo.toISOString())
            .order("timestamp", { ascending: false })
            .limit(30);

        if (historicalError) throw historicalError;

        // Calculate trends
        const previousMetrics = historicalMetrics[historicalMetrics.length - 1];

        const viewsTrend = previousMetrics
          ? calculateTrend(previousMetrics.views, currentMetrics.views)
          : { value: 0, isPositive: true };

        const applicationsTrend = previousMetrics
          ? calculateTrend(
              previousMetrics.applications,
              currentMetrics.applications,
            )
          : { value: 0, isPositive: true };

        const acceptanceRateTrend = previousMetrics
          ? calculateTrend(
              previousMetrics.acceptance_rate,
              currentMetrics.acceptance_rate,
            )
          : { value: 0, isPositive: true };

        setMetrics({
          views: currentMetrics.views,
          viewsTrend,
          applications: currentMetrics.applications,
          applicationsTrend,
          timeToFill: currentMetrics.time_to_fill,
          timeToHire: currentMetrics.time_to_hire,
          acceptanceRate: currentMetrics.acceptance_rate,
          acceptanceRateTrend,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load job metrics",
        );
        console.error("Error fetching job metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [jobId]);

  return {
    metrics,
    isLoading,
    error,
  };
}

function calculateTrend(
  previous: number,
  current: number,
): { value: number; isPositive: boolean } {
  if (previous === 0) return { value: 0, isPositive: true };

  const percentageChange = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(Math.round(percentageChange)),
    isPositive: percentageChange >= 0,
  };
}
