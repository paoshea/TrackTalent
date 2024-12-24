import { useState, useEffect } from "react";
import { useUserRole } from "./useUserRole";
import type { DashboardMetrics } from "../types/dashboard";
import type { UserRole } from "../types/auth";

interface CandidateData {
  metrics: DashboardMetrics;
  recentApplications: Array<{
    id: string;
    jobTitle: string;
    company: string;
    status: string;
    appliedAt: string;
  }>;
  upcomingInterviews: Array<{
    id: string;
    jobTitle: string;
    company: string;
    scheduledAt: string;
    duration: number;
  }>;
}

interface EmployerData {
  metrics: DashboardMetrics;
  activeJobs: Array<{
    id: string;
    title: string;
    applicants: number;
    postedAt: string;
  }>;
  recentApplications: Array<{
    id: string;
    jobTitle: string;
    candidateName: string;
    status: string;
    appliedAt: string;
  }>;
}

interface AdminData {
  metrics: DashboardMetrics;
  systemHealth: {
    status: "healthy" | "warning" | "error";
    issues: Array<{
      id: string;
      type: string;
      message: string;
      severity: "low" | "medium" | "high";
    }>;
  };
}

type RoleData = {
  candidate: CandidateData;
  employer: EmployerData;
  admin: AdminData;
};

export function useRoleSpecificData() {
  const { role } = useUserRole();
  const [data, setData] = useState<RoleData[UserRole] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would fetch from your API based on role
        const mockData = getMockDataForRole(role);
        setData(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [role]);

  return { data, isLoading, error };
}

function getMockDataForRole(role: UserRole): RoleData[UserRole] {
  switch (role) {
    case "candidate":
      return {
        metrics: {
          messages: 8,
          recentActivities: [],
          systemAlerts: [],
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
            total: 100,
            active: 45,
            trend: 10
          },
          applications: {
            total: 12,
            pending: 5,
            trend: 8
          },
          interviews: {
            total: 2,
            scheduled: 1,
            completed: 1,
            byOutcome: {
              offered: 0,
              rejected: 0,
              pending: 1
            },
            trend: 5
          },
          timeToHire: {
            average: 15,
            trend: -2
          },
          activeJobsChange: 5,
          totalCandidates: 500,
          candidatesChange: 10,
          placementRate: 75,
          placementRateChange: 5,
          timeToFill: 20,
          timeToFillChange: -1,
          connections: 25,
          jobViews: 45,
          savedJobs: 5,
          matchScore: 85,
          profileViews: 15
        },
        recentApplications: [
          {
            id: "1",
            jobTitle: "Senior Developer",
            company: "TechCorp",
            status: "Under Review",
            appliedAt: new Date().toISOString(),
          },
        ],
        upcomingInterviews: [
          {
            id: "1",
            jobTitle: "Senior Developer",
            company: "TechCorp",
            scheduledAt: new Date().toISOString(),
            duration: 60,
          },
        ],
      };

    case "employer":
      return {
        metrics: {
          messages: 35,
          recentActivities: [],
          systemAlerts: [],
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
            total: 150,
            active: 45,
            trend: 15
          },
          applications: {
            total: 45,
            pending: 20,
            trend: 12
          },
          interviews: {
            total: 8,
            scheduled: 5,
            completed: 3,
            byOutcome: {
              offered: 1,
              rejected: 1,
              pending: 1
            },
            trend: 8
          },
          timeToHire: {
            average: 18,
            trend: -1
          },
          activeJobsChange: 8,
          totalCandidates: 800,
          candidatesChange: 15,
          placementRate: 80,
          placementRateChange: 8,
          timeToFill: 22,
          timeToFillChange: -2,
          connections: 120,
          jobViews: 250,
          savedJobs: 15,
          matchScore: 90,
          profileViews: 180
        },
        activeJobs: [
          {
            id: "1",
            title: "Senior Developer",
            applicants: 12,
            postedAt: new Date().toISOString(),
          },
        ],
        recentApplications: [
          {
            id: "1",
            jobTitle: "Senior Developer",
            candidateName: "John Doe",
            status: "Under Review",
            appliedAt: new Date().toISOString(),
          },
        ],
      };

    case "admin":
      return {
        metrics: {
          messages: 1200,
          recentActivities: [],
          systemAlerts: [],
          userGrowth: {
            total: 5000,
            trend: 12,
            byPeriod: {
              daily: 50,
              weekly: 250,
              monthly: 1000
            },
            byType: {
              candidates: 4000,
              employers: 1000
            },
            retention: 90,
            churnRate: 10
          },
          jobs: {
            total: 1000,
            active: 450,
            trend: 25
          },
          applications: {
            total: 890,
            pending: 200,
            trend: 15
          },
          interviews: {
            total: 156,
            scheduled: 80,
            completed: 76,
            byOutcome: {
              offered: 45,
              rejected: 20,
              pending: 11
            },
            trend: 12
          },
          timeToHire: {
            average: 16,
            trend: -3
          },
          activeJobsChange: 25,
          totalCandidates: 4000,
          candidatesChange: 20,
          placementRate: 85,
          placementRateChange: 10,
          timeToFill: 18,
          timeToFillChange: -3,
          connections: 2500,
          jobViews: 15000,
          savedJobs: 2500,
          matchScore: 92,
          profileViews: 8000
        },
        systemHealth: {
          status: "healthy",
          issues: [],
        },
      };

    default:
      throw new Error("Invalid role");
  }
}
