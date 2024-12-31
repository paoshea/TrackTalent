import type { QuickStatsMetrics } from "../types/dashboard";

interface AnalyticsParams {
  dateRange: {
    start: string;
    end: string;
  };
}

// Mock analytics data for demonstration
const mockMetrics: QuickStatsMetrics = {
  activeJobs: 15,
  applications: 25,
  interviews: 8,
  responseRate: 75,
  trends: {
    jobs: 10,
    applications: 15,
    interviews: 20,
    responseRate: 5
  }
};

export async function getAnalytics(_params: AnalyticsParams): Promise<{ metrics: QuickStatsMetrics }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, we would use the params to filter the data
  // For now, just return mock data
  return {
    metrics: mockMetrics
  };
}
