import { supabase } from "../lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { ActivityItem } from "../types/activity";
import type { AnalyticsData } from "../types/analytics";
import type { Status } from "../types/status";

export class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribeToActivities(
    userId: string,
    onActivity: (activity: ActivityItem) => void,
  ) {
    const channel = supabase
      .channel(`activities:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "activity_feed",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onActivity(payload.new as ActivityItem);
        },
      )
      .subscribe();

    this.channels.set("activities", channel);
    return () => this.unsubscribe("activities");
  }

  subscribeToMetrics(
    userId: string,
    onMetricUpdate: (metrics: AnalyticsData) => void,
  ) {
    const channel = supabase
      .channel(`metrics:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "analytics_metrics",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onMetricUpdate(payload.new as AnalyticsData);
        },
      )
      .subscribe();

    this.channels.set("metrics", channel);
    return () => this.unsubscribe("metrics");
  }

  subscribeToStatusUpdates(
    userId: string,
    onStatusUpdate: (status: Status) => void,
  ) {
    const channel = supabase
      .channel(`status:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "status_updates",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          onStatusUpdate(payload.new as Status);
        },
      )
      .subscribe();

    this.channels.set("status", channel);
    return () => this.unsubscribe("status");
  }

  private unsubscribe(channelKey: string) {
    const channel = this.channels.get(channelKey);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(channelKey);
    }
  }

  unsubscribeAll() {
    this.channels.forEach((channel) => channel.unsubscribe());
    this.channels.clear();
  }
}
