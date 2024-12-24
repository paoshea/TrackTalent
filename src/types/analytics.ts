import type { DashboardMetrics, ActivityType } from "./dashboard";
export type { DashboardMetrics };

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  snapshotDate: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface MetricSnapshot {
  snapshotDate: string;
  metrics: {
    applications: number;
    interviews: number;
    offers: number;
    hires: number;
    [key: string]: number;
  };
}

export interface EngagementStats {
  views: number;
  interactions: number;
  conversionRate: number;
  averageTimeSpent: number;
  bounceRate: number;
}

export interface AnalyticsData {
  metrics: DashboardMetrics;
  activities: ActivityItem[];
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  comparisons: {
    previousPeriod: number;
    industryAverage: number;
  };
}

export interface AnalyticsFilter {
  dateRange?: {
    start: string;
    end: string;
  };
  metrics?: string[];
  groupBy?: "day" | "week" | "month";
  includeComparisons?: boolean;
}

export interface AnalyticsChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export interface AnalyticsReport {
  title: string;
  description: string;
  period: {
    start: string;
    end: string;
  };
  metrics: Record<
    string,
    {
      current: number;
      previous: number;
      change: number;
      trend: "up" | "down" | "stable";
    }
  >;
  charts: Record<string, AnalyticsChartData>;
  insights: {
    type: "positive" | "negative" | "neutral";
    message: string;
    metric?: string;
    recommendation?: string;
  }[];
  exportedAt: string;
}

export interface AnalyticsExportOptions {
  format: "pdf" | "csv" | "excel";
  metrics: string[];
  includeCharts: boolean;
  includeInsights: boolean;
  dateRange: {
    start: string;
    end: string;
  };
}
