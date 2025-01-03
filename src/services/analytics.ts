import { supabase } from "../lib/supabase";
import type { StatusMetrics } from "../types/status";
import type { AnalyticsData, EngagementStats, AnalyticsFilter, MetricSnapshot } from "../types/analytics";

export async function getStatusEngagementMetrics(statusId: string): Promise<StatusMetrics> {
  try {
    const { data, error } = await supabase
      .from('status_metrics')
      .select(`
        views,
        likes,
        comments,
        shares,
        engagement_rate,
        avg_time_spent,
        unique_viewers,
        peak_viewers,
        total_interactions
      `)
      .eq('status_id', statusId)
      .single();

    if (error) throw error;

    if (!data) {
      throw new Error('No metrics found for this status');
    }

    return {
      views: data.views || 0,
      likes: data.likes || 0,
      comments: data.comments || 0,
      shares: data.shares || 0,
      engagementRate: data.engagement_rate || 0,
      avgTimeSpent: data.avg_time_spent || 0,
      uniqueViewers: data.unique_viewers || 0,
      peakViewers: data.peak_viewers || 0,
      totalInteractions: data.total_interactions || 0
    };
  } catch (error) {
    console.error('Error fetching status metrics:', error);
    throw error;
  }
}

export async function getMetricSnapshots(filter: AnalyticsFilter): Promise<MetricSnapshot[]> {
  try {
    let query = supabase
      .from('metric_snapshots')
      .select('*')
      .order('snapshot_date', { ascending: true });

    if (filter.dateRange?.start) {
      query = query.gte('snapshot_date', filter.dateRange.start);
    }
    if (filter.dateRange?.end) {
      query = query.lte('snapshot_date', filter.dateRange.end);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(snapshot => ({
      snapshotDate: snapshot.snapshot_date,
      metrics: {
        applications: 0,
        interviews: 0,
        offers: 0,
        hires: 0,
        ...(typeof snapshot.metrics === 'object' && snapshot.metrics !== null
          ? Object.fromEntries(
              Object.entries(snapshot.metrics).filter(([_, value]) => typeof value === 'number')
            )
          : {})
      }
    }));
  } catch (error) {
    console.error('Error fetching metric snapshots:', error);
    throw error;
  }
}

export async function trackStatusView(statusId: string) {
  try {
    const { error } = await supabase
      .from('status_views')
      .insert({
        status_id: statusId,
        viewed_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking status view:', error);
    throw error;
  }
}

export async function getEngagementStats(_filter: AnalyticsFilter): Promise<EngagementStats> {
  // Mock implementation - filter would be used in real implementation
  return {
    views: 100,
    interactions: 50,
    conversionRate: 2.8,
    averageTimeSpent: 180,
    bounceRate: 25
  };
}

export async function getAnalytics(_filter: AnalyticsFilter): Promise<AnalyticsData> {
  // Mock implementation - filter would be used in real implementation
  return {
    metrics: {
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
    activities: [],
    trends: {
      daily: [],
      weekly: [],
      monthly: []
    },
    comparisons: {
      previousPeriod: 0,
      industryAverage: 0
    }
  };
}

export async function trackStatusInteraction(
  statusId: string,
  interactionType: 'like' | 'comment' | 'share'
) {
  try {
    const { error } = await supabase
      .from('status_interactions')
      .insert({
        status_id: statusId,
        type: interactionType,
        interacted_at: new Date().toISOString()
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error tracking status interaction:', error);
    throw error;
  }
}
