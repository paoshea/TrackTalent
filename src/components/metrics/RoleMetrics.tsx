import { useRoleSpecificData } from "../../hooks/useRoleSpecificData";
import { MetricCard, type MetricCardProps } from "./MetricCard";
import { Users, Briefcase, Clock, TrendingUp, LucideIcon } from "lucide-react";
import type { DashboardMetrics } from "../../types/dashboard";

type MetricCardData = {
  label: string;
  value: number;
  icon: LucideIcon;
  description: string;
};

interface ApplicationStats {
  total: number;
  inReview: number;
  interviews: number;
  offers: number;
}

interface HiringStats {
  openPositions: number;
  totalApplications: number;
  shortlisted: number;
  interviewed: number;
}

interface PlatformStats {
  totalUsers: number;
  activeJobs: number;
  successfulPlacements: number;
  averageTimeToHire: number;
}

export function RoleMetrics() {
  const { data } = useRoleSpecificData();

  if (!data) {
    return (
      <div className="text-center p-4 text-gray-500" role="alert">
        No metrics available
      </div>
    );
  }

  const getMetricCards = (): MetricCardData[] => {
    const metrics = data.metrics as DashboardMetrics & {
      applicationStats?: ApplicationStats;
      hiringStats?: HiringStats;
      platformStats?: PlatformStats;
    };

    if (metrics.applicationStats) {
      return [
        {
          label: "Total Applications",
          value: metrics.applicationStats.total,
          icon: Briefcase,
          description: "Total number of applications submitted",
        },
        {
          label: "In Review",
          value: metrics.applicationStats.inReview,
          icon: Clock,
          description: "Applications currently under review",
        },
        {
          label: "Interviews",
          value: metrics.applicationStats.interviews,
          icon: Users,
          description: "Number of interviews scheduled",
        },
        {
          label: "Offers",
          value: metrics.applicationStats.offers,
          icon: TrendingUp,
          description: "Number of offers received",
        },
      ];
    }

    if (metrics.hiringStats) {
      return [
        {
          label: "Open Positions",
          value: metrics.hiringStats.openPositions,
          icon: Briefcase,
          description: "Currently active job postings",
        },
        {
          label: "Total Applications",
          value: metrics.hiringStats.totalApplications,
          icon: Users,
          description: "Total applications received",
        },
        {
          label: "Shortlisted",
          value: metrics.hiringStats.shortlisted,
          icon: Clock,
          description: "Candidates shortlisted for interview",
        },
        {
          label: "Interviewed",
          value: metrics.hiringStats.interviewed,
          icon: TrendingUp,
          description: "Candidates interviewed",
        },
      ];
    }

    if (metrics.platformStats) {
      return [
        {
          label: "Total Users",
          value: metrics.platformStats.totalUsers,
          icon: Users,
          description: "Total registered users",
        },
        {
          label: "Active Jobs",
          value: metrics.platformStats.activeJobs,
          icon: Briefcase,
          description: "Currently active job postings",
        },
        {
          label: "Placements",
          value: metrics.platformStats.successfulPlacements,
          icon: TrendingUp,
          description: "Successful job placements",
        },
        {
          label: "Avg. Time to Hire",
          value: metrics.platformStats.averageTimeToHire,
          icon: Clock,
          description: "Average days from posting to hire",
        },
      ];
    }

    return [];
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      role="region"
      aria-label="Role metrics overview"
    >
      {getMetricCards().map((metric, index) => (
        <MetricCard
          key={`metric-${index}`}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
          className="h-full"
        />
      ))}
    </div>
  );
}
