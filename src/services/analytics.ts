import { supabase } from "../lib/supabase";
import type { StatusMetrics } from "../types/status";
import type { DashboardMetrics } from "../types/dashboard";

interface MetricSnapshot {
  id: string;
  snapshotDate: string;
  metrics: Partial<DashboardMetrics>;
}

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

export async function getMetricSnapshots(
  startDate?: string,
  endDate?: string
): Promise<MetricSnapshot[]> {
  try {
    let query = supabase
      .from('metric_snapshots')
      .select('*')
      .order('snapshot_date', { ascending: true });

    if (startDate) {
      query = query.gte('snapshot_date', startDate);
    }
    if (endDate) {
      query = query.lte('snapshot_date', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(snapshot => ({
      id: snapshot.id,
      snapshotDate: snapshot.snapshot_date,
      metrics: snapshot.metrics
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
