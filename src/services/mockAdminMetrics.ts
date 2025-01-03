import type { DashboardMetrics } from "../types/dashboard";

export const mockAdminMetrics: DashboardMetrics = {
  messages: 150,
  recentActivities: [],
  systemAlerts: [
    {
      id: "1",
      title: "System Update",
      description: "System maintenance scheduled for tonight",
      priority: "medium",
      timestamp: new Date().toISOString(),
      resolved: false,
      category: "system"
    }
  ],
  userGrowth: {
    total: 1000,
    trend: 5,
    byPeriod: {
      daily: 10,
      weekly: 50,
      monthly: 200
    },
    byType: {
      candidates: 800,
      employers: 200
    },
    retention: 85,
    churnRate: 15
  },
  jobs: {
    total: 250,
    active: 150,
    trend: 10
  },
  applications: {
    total: 500,
    pending: 100,
    trend: 15
  },
  interviews: {
    total: 200,
    scheduled: 50,
    completed: 150,
    byOutcome: {
      offered: 80,
      rejected: 50,
      pending: 20
    },
    trend: 8
  },
  timeToHire: {
    average: 15,
    trend: -2
  },
  activeJobsChange: 5,
  totalCandidates: 800,
  candidatesChange: 10,
  placementRate: 75,
  placementRateChange: 5,
  timeToFill: 20,
  timeToFillChange: -1,
  connections: 1200,
  jobViews: 5000,
  savedJobs: 300,
  matchScore: 85,
  profileViews: 2500
};

export async function getMockAdminMetrics(): Promise<DashboardMetrics> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAdminMetrics;
}
