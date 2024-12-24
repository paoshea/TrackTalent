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
          applications: 12,
          interviews: 2,
          connections: 25,
          messages: 8,
          jobViews: 45,
          profileViews: 15,
          savedJobs: 5,
          matchScore: 85,
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
          applications: 45,
          interviews: 8,
          connections: 120,
          messages: 35,
          activeJobs: 5,
          totalApplications: 45,
          scheduledInterviews: 8,
          offersSent: 3,
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
          applications: 890,
          interviews: 156,
          connections: 2500,
          messages: 1200,
          totalUsers: 1250,
          activeJobs: 156,
          totalApplications: 890,
          systemUptime: 99.9,
          userGrowth: {
            value: 12,
            isPositive: true,
          },
          jobGrowth: {
            value: 8,
            isPositive: true,
          },
          applicationRateGrowth: {
            value: 15,
            isPositive: true,
          },
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
