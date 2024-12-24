import { supabase } from "../lib/supabase";
import type { Database } from "../types/database";
import type { StatusMetrics } from "../types/status";
import type {
  AnalyticsData,
  AnalyticsFilter,
  AnalyticsReport,
  AnalyticsExportOptions,
  ActivityItem,
  MetricSnapshot,
  EngagementStats,
} from "../types/analytics";

type DbResult<T> = T extends keyof Database["public"]["Tables"] 
  ? Database["public"]["Tables"][T]["Row"]
  : never;

export async function getAnalytics(
  filter?: AnalyticsFilter,
): Promise<AnalyticsData> {
  try {
    let query = supabase.from("analytics").select("*");

    if (filter?.dateRange) {
      query = query
        .gte("date", filter.dateRange.start)
        .lte("date", filter.dateRange.end);
    }

    const { data, error } = await query.single<DbResult<"analytics">>();

    if (error) throw error;
    if (!data) throw new Error("No analytics data found");

    // Transform raw database metrics into DashboardMetrics shape
    return {
      metrics: {
        messages: data.messages || 0,
        recentActivities: data.activities || [],
        systemAlerts: [],
        userGrowth: {
          total: data.connections || 0,
          trend: data.comparisons.previousPeriod,
          byPeriod: {
            daily: data.trends.daily[0] || 0,
            weekly: data.trends.weekly[0] || 0,
            monthly: data.trends.monthly[0] || 0
          },
          byType: {
            candidates: Math.floor((data.connections || 0) * 0.8), // Example: 80% candidates
            employers: Math.floor((data.connections || 0) * 0.2)  // Example: 20% employers
          },
          retention: 85, // Example: 85% retention
          churnRate: 15  // Example: 15% churn
        },
        jobs: {
          total: data.trends.daily[0] || 0,
          active: data.trends.daily[0] || 0,
          trend: data.comparisons.previousPeriod
        },
        applications: {
          total: data.applications || 0,
          pending: Math.floor(data.applications * 0.3), // Example: 30% pending
          trend: data.comparisons.previousPeriod
        },
        interviews: {
          total: data.interviews || 0,
          scheduled: Math.floor(data.interviews * 0.4), // Example: 40% scheduled
          completed: Math.floor(data.interviews * 0.6), // Example: 60% completed
          byOutcome: {
            offered: Math.floor(data.interviews * 0.2), // Example: 20% offered
            rejected: Math.floor(data.interviews * 0.3), // Example: 30% rejected
            pending: Math.floor(data.interviews * 0.5), // Example: 50% pending
          },
          trend: data.comparisons.previousPeriod
        },
        timeToHire: {
          average: 14, // Example: 14 days
          trend: data.comparisons.previousPeriod
        },
        activeJobsChange: data.comparisons.previousPeriod,
        totalCandidates: data.connections || 0,
        candidatesChange: data.comparisons.previousPeriod,
        placementRate: 0.65, // Example: 65%
        placementRateChange: data.comparisons.previousPeriod,
        timeToFill: 21, // Example: 21 days
        timeToFillChange: data.comparisons.previousPeriod,
        connections: data.connections || 0,
        jobViews: data.trends.daily[0] || 0,
        savedJobs: Math.floor(data.trends.daily[0] * 0.2) || 0, // Example: 20% of job views
        matchScore: Math.floor(Math.random() * 40 + 60), // Example: Random score between 60-100
        profileViews: Math.floor(data.trends.daily[0] * 0.5) || 0, // Example: 50% of job views
      },
      activities: data.activities,
      trends: data.trends,
      comparisons: data.comparisons,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw new Error("Failed to fetch analytics");
  }
}

export async function getMetricSnapshots(
  filter?: AnalyticsFilter
): Promise<MetricSnapshot[]> {
  try {
    let query = supabase
      .from("metric_snapshots")
      .select("*")
      .order("timestamp", { ascending: true });

    if (filter?.dateRange) {
      query = query
        .gte("timestamp", filter.dateRange.start)
        .lte("timestamp", filter.dateRange.end);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data || []) as MetricSnapshot[];
  } catch (error) {
    console.error("Error fetching metric snapshots:", error);
    throw new Error("Failed to fetch metric snapshots");
  }
}

export async function getEngagementStats(
  filter?: AnalyticsFilter
): Promise<EngagementStats> {
  try {
    let query = supabase
      .from("engagement_stats")
      .select("*");

    if (filter?.dateRange) {
      query = query
        .gte("timestamp", filter.dateRange.start)
        .lte("timestamp", filter.dateRange.end);
    }

    const { data, error } = await query.single<DbResult<"engagement_stats">>();

    if (error) throw error;
    if (!data) throw new Error("No engagement stats found");

    return {
      views: data.views,
      interactions: data.interactions,
      conversionRate: data.conversion_rate,
      averageTimeSpent: data.average_time_spent,
      bounceRate: data.bounce_rate,
    };
  } catch (error) {
    console.error("Error fetching engagement stats:", error);
    throw new Error("Failed to fetch engagement stats");
  }
}

export async function calculateMetrics(
  snapshots: MetricSnapshot[]
): Promise<Record<string, number>> {
  try {
    const metrics: Record<string, number> = {};
    const metricKeys = new Set<string>();

    // Collect all possible metric keys
    snapshots.forEach(snapshot => {
      Object.keys(snapshot.metrics).forEach(key => metricKeys.add(key));
    });

    // Calculate averages for each metric
    metricKeys.forEach(key => {
      const values = snapshots
        .map(s => s.metrics[key])
        .filter(v => typeof v === 'number');
      
      if (values.length > 0) {
        metrics[key] = values.reduce((a, b) => a + b, 0) / values.length;
      }
    });

    return metrics;
  } catch (error) {
    console.error("Error calculating metrics:", error);
    throw new Error("Failed to calculate metrics");
  }
}

export async function getActivities(
  filter?: AnalyticsFilter,
): Promise<ActivityItem[]> {
  try {
    let query = supabase
      .from("activities")
      .select("*")
      .order("timestamp", { ascending: false });

    if (filter?.dateRange) {
      query = query
        .gte("timestamp", filter.dateRange.start)
        .lte("timestamp", filter.dateRange.end);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []) as ActivityItem[];
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
}

export async function generateReport(
  filter: AnalyticsFilter,
): Promise<AnalyticsReport> {
  try {
    const { data, error } = await supabase.rpc("generate_analytics_report", {
      start_date: filter.dateRange?.start,
      end_date: filter.dateRange?.end,
      metrics: filter.metrics,
      include_comparisons: filter.includeComparisons,
    });

    if (error) throw error;
    if (!data) throw new Error("No report data returned");

    return {
      title: data.title,
      description: data.description,
      period: {
        start: filter.dateRange?.start || "",
        end: filter.dateRange?.end || "",
      },
      metrics: data.metrics,
      charts: data.charts,
      insights: data.insights,
      exportedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate analytics report");
  }
}

export async function exportAnalytics(
  options: AnalyticsExportOptions,
): Promise<string> {
  try {
    const { data, error } = await supabase.rpc("export_analytics", {
      format: options.format,
      metrics: options.metrics,
      include_charts: options.includeCharts,
      include_insights: options.includeInsights,
      start_date: options.dateRange.start,
      end_date: options.dateRange.end,
    });

    if (error) throw error;
    if (!data?.url) throw new Error("No export URL returned");

    return data.url;
  } catch (error) {
    console.error("Error exporting analytics:", error);
    throw new Error("Failed to export analytics");
  }
}

export async function getStatusEngagementMetrics(
  statusId: string,
): Promise<StatusMetrics> {
  try {
    const { data, error } = await supabase
      .from("status_metrics")
      .select("*")
      .eq("status_id", statusId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("No metrics found for status");

    return {
      likes: data.likes || 0,
      comments: data.comments || 0,
      shares: data.shares || 0,
      views: data.views || 0,
      engagementRate: data.engagement_rate || 0,
    };
  } catch (error) {
    console.error("Error fetching status metrics:", error);
    throw new Error("Failed to fetch status metrics");
  }
}
