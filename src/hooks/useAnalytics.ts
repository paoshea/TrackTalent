import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import {
  getMetricSnapshots,
  getEngagementStats,
  getAnalytics,
} from "../services/analytics";
import type {
  MetricSnapshot,
  EngagementStats,
  AnalyticsData,
  AnalyticsFilter,
} from "../types/analytics";
import type { DashboardMetrics } from "../types/dashboard";

interface AnalyticsState {
  analytics: AnalyticsData | null;
  snapshots: MetricSnapshot[];
  engagement: EngagementStats | null;
}

export function useAnalytics() {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsState>({
    analytics: null,
    snapshots: [],
    engagement: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadAnalytics = async () => {
      try {
        // Create filter for last 30 days
        const filter: AnalyticsFilter = {
          dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            end: new Date().toISOString(),
          },
        };

        const [analyticsData, engagementData, snapshotData] = await Promise.all([
          getAnalytics(filter),
          getEngagementStats(filter),
          getMetricSnapshots(filter),
        ]);

        setData({
          analytics: analyticsData,
          engagement: engagementData,
          snapshots: snapshotData,
        });
      } catch (err) {
        setError("Failed to load analytics");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [user]);

  return {
    metrics: data.analytics?.metrics || {} as DashboardMetrics,
    activities: data.analytics?.activities || [],
    snapshots: data.snapshots,
    engagement: data.engagement,
    trends: data.analytics?.trends,
    comparisons: data.analytics?.comparisons,
    loading,
    error,
  };
}
