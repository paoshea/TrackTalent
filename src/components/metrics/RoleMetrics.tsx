import { useRoleSpecificData } from "../../hooks/useRoleSpecificData";
import { MetricCard } from "./MetricCard";
import { Users, Briefcase, Clock, TrendingUp, LucideIcon } from "lucide-react";

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

interface RoleMetricsProps {
  role: 'candidate' | 'employer' | 'partner';
}

export function RoleMetrics({ role }: RoleMetricsProps) {
  const { stats, loading, error } = useRoleSpecificData(role);

  if (loading) {
    return (
      <div className="text-center p-4 text-gray-500" role="alert">
        Loading metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500" role="alert">
        Error loading metrics: {error.message}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center p-4 text-gray-500" role="alert">
        No metrics available
      </div>
    );
  }

  const getMetricCards = (): MetricCardData[] => {
    switch (role) {
      case 'candidate': {
        const applicationStats: ApplicationStats = {
          total: stats.analytics.talentPool.totalCandidates,
          inReview: Math.floor(stats.analytics.talentPool.totalCandidates * 0.3),
          interviews: Math.floor(stats.analytics.talentPool.totalCandidates * 0.15),
          offers: Math.floor(stats.analytics.talentPool.totalCandidates * 0.05)
        };

        return [
          {
            label: "Active Jobs",
            value: stats.analytics.talentPool.activeLearners,
            icon: Briefcase,
            description: "Jobs matching your profile",
          },
          {
            label: "Applications",
            value: applicationStats.total,
            icon: Users,
            description: "Your submitted applications",
          },
          {
            label: "Response Rate",
            value: parseInt(stats.analytics.skills.verificationRate),
            icon: Clock,
            description: "Average employer response time",
          },
          {
            label: "Success Rate",
            value: parseInt(stats.analytics.placements.retentionRate),
            icon: TrendingUp,
            description: "Application success rate",
          },
        ];
      }

      case 'employer': {
        const hiringStats: HiringStats = {
          openPositions: stats.analytics.talentPool.activeLearners,
          totalApplications: stats.analytics.talentPool.totalCandidates,
          shortlisted: Math.floor(stats.analytics.talentPool.totalCandidates * 0.2),
          interviewed: Math.floor(stats.analytics.talentPool.totalCandidates * 0.1)
        };

        return [
          {
            label: "Open Positions",
            value: hiringStats.openPositions,
            icon: Briefcase,
            description: "Currently active job postings",
          },
          {
            label: "Total Applications",
            value: hiringStats.totalApplications,
            icon: Users,
            description: "Applications received",
          },
          {
            label: "Time to Hire",
            value: parseInt(stats.analytics.placements.careerProgression),
            icon: Clock,
            description: "Average days to hire",
          },
          {
            label: "Retention Rate",
            value: parseInt(stats.analytics.placements.retentionRate),
            icon: TrendingUp,
            description: "Employee retention rate",
          },
        ];
      }

      case 'partner': {
        const platformStats: PlatformStats = {
          totalUsers: stats.mentorship.network.activeMentors,
          activeJobs: stats.apprenticeships.programs.active,
          successfulPlacements: Math.floor(stats.apprenticeships.programs.active * parseInt(stats.apprenticeships.outcomes.hireRate) / 100),
          averageTimeToHire: parseInt(stats.apprenticeships.outcomes.averageTimeToPromotion)
        };

        return [
          {
            label: "Active Programs",
            value: platformStats.activeJobs,
            icon: Briefcase,
            description: "Current training programs",
          },
          {
            label: "Total Learners",
            value: platformStats.totalUsers,
            icon: Users,
            description: "Active program participants",
          },
          {
            label: "Completion Rate",
            value: parseInt(stats.apprenticeships.outcomes.completionRate),
            icon: Clock,
            description: "Program completion rate",
          },
          {
            label: "Success Rate",
            value: parseInt(stats.mentorship.effectiveness.networkGrowth),
            icon: TrendingUp,
            description: "Career placement rate",
          },
        ];
      }

      default:
        return [];
    }
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
          description={metric.description}
          className="h-full"
        />
      ))}
    </div>
  );
}
