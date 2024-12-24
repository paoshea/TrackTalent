import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface PipelineStats {
  totalCandidates: number;
  candidatesTrend: {
    value: number;
    isPositive: boolean;
  };
  newApplications: number;
  applicationsTrend: {
    value: number;
    isPositive: boolean;
  };
  inReview: number;
  shortlisted: number;
  interviewsScheduled: number;
  offersExtended: number;
  offersAccepted: number;
  offersDeclined: number;
}

interface UseCandidateStatsResult {
  stats: PipelineStats | null;
  isLoading: boolean;
  error: string | null;
}

export function useCandidateStats(jobId: string): UseCandidateStatsResult {
  const [stats, setStats] = useState<PipelineStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get current stats
        const { data: currentStats, error: currentError } = await supabase
          .from("job_pipeline_stats")
          .select("*")
          .eq("jobId", jobId)
          .single();

        if (currentError) throw currentError;

        // Get historical stats for trend calculation
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: historicalStats, error: historicalError } = await supabase
          .from("job_pipeline_stats_history")
          .select("*")
          .eq("jobId", jobId)
          .gte("timestamp", thirtyDaysAgo.toISOString())
          .order("timestamp", { ascending: false })
          .limit(30);

        if (historicalError) throw historicalError;

        // Calculate trends
        const previousStats = historicalStats[historicalStats.length - 1];
        const candidatesTrend = previousStats
          ? calculateTrend(
              previousStats.total_candidates,
              currentStats.total_candidates,
            )
          : { value: 0, isPositive: true };

        const applicationsTrend = previousStats
          ? calculateTrend(
              previousStats.new_applications,
              currentStats.new_applications,
            )
          : { value: 0, isPositive: true };

        setStats({
          totalCandidates: currentStats.total_candidates,
          candidatesTrend,
          newApplications: currentStats.new_applications,
          applicationsTrend,
          inReview: currentStats.in_review,
          shortlisted: currentStats.shortlisted,
          interviewsScheduled: currentStats.interviews_scheduled,
          offersExtended: currentStats.offers_extended,
          offersAccepted: currentStats.offers_accepted,
          offersDeclined: currentStats.offers_declined,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load candidate statistics",
        );
        console.error("Error fetching candidate stats:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [jobId]);

  return {
    stats,
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
