import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import {
  getMetricSnapshots,
  getEngagementStats,
  getAnalytics,
} from "../services/analytics";
import { 
  Activity as ActivityIcon,
  Bell,
  Calendar,
  CheckCircle,
  FileText,
  MessageSquare,
  User,
  Users
} from "lucide-react";
import type {
  MetricSnapshot,
  EngagementStats,
  AnalyticsData,
  AnalyticsFilter,
} from "../types/analytics";
import type { DashboardMetrics, ActivityItem } from "../types/dashboard";

export interface AnalyticsState {
  analytics: AnalyticsData | null;
  snapshots: MetricSnapshot[];
  engagement: EngagementStats | null;
}

export interface UseAnalyticsResult {
  metrics: DashboardMetrics;
  activities: ActivityItem[];
  snapshots: MetricSnapshot[];
  engagement: EngagementStats | null;
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  } | undefined;
  comparisons: {
    previousPeriod: number;
    industryAverage: number;
  } | undefined;
  loading: boolean;
  error: string | null;
}

export function useAnalytics(): UseAnalyticsResult {
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
            start: new Date(
              Date.now() - 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            end: new Date().toISOString(),
          },
        };

        const [analyticsData, engagementData, snapshotData] = await Promise.all(
          [
            getAnalytics(filter),
            getEngagementStats(filter),
            getMetricSnapshots(filter),
          ],
        );

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
    metrics: data.analytics?.metrics ?? {
      messages: 0,
      recentActivities: [],
      systemAlerts: [],
      userGrowth: {
        total: 0,
        trend: 0,
        byPeriod: {
          daily: 0,
          weekly: 0,
          monthly: 0
        },
        byType: {
          candidates: 0,
          employers: 0
        },
        retention: 0,
        churnRate: 0
      },
      jobs: {
        total: 0,
        active: 0,
        trend: 0
      },
      applications: {
        total: 0,
        pending: 0,
        trend: 0
      },
      interviews: {
        total: 0,
        scheduled: 0,
        completed: 0,
        byOutcome: {
          offered: 0,
          rejected: 0,
          pending: 0
        },
        trend: 0
      },
      timeToHire: {
        average: 0,
        trend: 0
      },
      activeJobsChange: 0,
      totalCandidates: 0,
      candidatesChange: 0,
      placementRate: 0,
      placementRateChange: 0,
      timeToFill: 0,
      timeToFillChange: 0,
      connections: 0,
      jobViews: 0,
      savedJobs: 0,
      matchScore: 0,
      profileViews: 0
    },
    activities: data.analytics?.activities.map(activity => {
      // Map activity type to appropriate icon
      const getIcon = () => {
        switch (activity.type) {
          case 'job_posted':
            return FileText;
          case 'application_received':
            return CheckCircle;
          case 'interview_scheduled':
            return Calendar;
          case 'interview_completed':
            return Users;
          case 'offer_sent':
            return MessageSquare;
          case 'offer_accepted':
            return CheckCircle;
          case 'candidate_hired':
            return User;
          case 'status_update':
            return ActivityIcon;
          default:
            return Bell;
        }
      };

      return {
        ...activity,
        icon: getIcon(),
        timestamp: activity.snapshotDate,
        user: {
          id: 'system',
          name: 'System',
        },
        action: activity.type,
        target: activity.description,
        content: activity.description
      };
    }) || [],
    snapshots: data.snapshots,
    engagement: data.engagement,
    trends: data.analytics?.trends,
    comparisons: data.analytics?.comparisons,
    loading,
    error,
  };
}
