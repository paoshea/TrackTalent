import type { QuickStatsMetrics } from "../types/dashboard";

export const mockMetrics: QuickStatsMetrics = {
  activeJobs: 15,
  applications: 25,
  interviews: 8,
  responseRate: 75,
  connections: 30,
  trends: {
    jobs: 10,
    applications: 15,
    interviews: 20,
    responseRate: 5,
    connections: 8
  }
};

export async function getMockMetrics(): Promise<QuickStatsMetrics> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockMetrics;
}
