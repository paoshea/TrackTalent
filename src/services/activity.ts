import type {
  Activity,
  ActivityFilter,
  ActivityStats,
  ActivityType,
  InteractionEvent,
} from "../types/activity";
import { supabase } from "../lib/supabase";

const ACTIVITY_TYPES: ActivityType[] = [
  "message_received",
  "interview_scheduled",
  "application_submitted",
  "status_updated",
  "job_posted",
  "candidate_shortlisted",
  "application_updated",
  "interview_completed",
  "offer_extended",
  "offer_accepted",
  "offer_declined",
  "status_posted",
  "status_liked",
  "status_shared",
  "comment_added",
  "profile_updated",
  "job_updated",
  "job_closed",
];

export async function getActivities(
  filter?: ActivityFilter,
): Promise<Activity[]> {
  try {
    let query = supabase
      .from("activities")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter) {
      if (filter.userId) {
        query = query.eq("user_id", filter.userId);
      }

      if (filter.types?.length) {
        query = query.in("type", filter.types);
      }

      if (filter.targetId) {
        query = query.eq("target_id", filter.targetId);
      }

      if (filter.targetType) {
        query = query.eq("target_type", filter.targetType);
      }

      if (filter.startDate) {
        query = query.gte("created_at", filter.startDate);
      }

      if (filter.endDate) {
        query = query.lte("created_at", filter.endDate);
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export async function createActivity(
  activity: Omit<Activity, "id" | "timestamp">,
): Promise<Activity | null> {
  try {
    const { data, error } = await supabase
      .from("activities")
      .insert([activity])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error creating activity:", error);
    return null;
  }
}

export async function createInteraction(
  event: InteractionEvent,
): Promise<boolean> {
  try {
    const { error } = await supabase.from("activity_interactions").insert([
      {
        activity_id: event.activityId,
        user_id: event.userId,
        type: event.type,
        content: event.content,
        metadata: event.metadata,
      },
    ]);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error creating interaction:", error);
    return false;
  }
}

export async function getActivityStats(userId: string): Promise<ActivityStats> {
  try {
    const activities = await getActivities({ userId });

    const stats: ActivityStats = {
      total: activities.length,
      byType: ACTIVITY_TYPES.reduce(
        (acc, type) => ({ ...acc, [type]: 0 }),
        {} as Record<ActivityType, number>,
      ),
      interactions: {
        likes: 0,
        comments: 0,
        shares: 0,
      },
      trending: {
        daily: [],
        weekly: [],
        monthly: [],
      },
    };

    activities.forEach((activity) => {
      // Count by type
      stats.byType[activity.type]++;

      // Sum interactions
      if (activity.interactions) {
        const likes = activity.interactions.filter(
          (i) => i.type === "like",
        ).length;
        const comments = activity.interactions.filter(
          (i) => i.type === "comment",
        ).length;
        const shares = activity.interactions.filter(
          (i) => i.type === "share",
        ).length;

        stats.interactions.likes += likes;
        stats.interactions.comments += comments;
        stats.interactions.shares += shares;
      }
    });

    // Get trending activities
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    stats.trending.daily = activities
      .filter((a) => new Date(a.timestamp) > dayAgo)
      .sort(
        (a, b) =>
          (b.interactions?.filter((i) => i.type === "like").length || 0) -
          (a.interactions?.filter((i) => i.type === "like").length || 0),
      )
      .slice(0, 5);

    stats.trending.weekly = activities
      .filter((a) => new Date(a.timestamp) > weekAgo)
      .sort(
        (a, b) =>
          (b.interactions?.filter((i) => i.type === "like").length || 0) -
          (a.interactions?.filter((i) => i.type === "like").length || 0),
      )
      .slice(0, 5);

    stats.trending.monthly = activities
      .filter((a) => new Date(a.timestamp) > monthAgo)
      .sort(
        (a, b) =>
          (b.interactions?.filter((i) => i.type === "like").length || 0) -
          (a.interactions?.filter((i) => i.type === "like").length || 0),
      )
      .slice(0, 5);

    return stats;
  } catch (error) {
    console.error("Error getting activity stats:", error);
    return {
      total: 0,
      byType: ACTIVITY_TYPES.reduce(
        (acc, type) => ({ ...acc, [type]: 0 }),
        {} as Record<ActivityType, number>,
      ),
      interactions: {
        likes: 0,
        comments: 0,
        shares: 0,
      },
      trending: {
        daily: [],
        weekly: [],
        monthly: [],
      },
    };
  }
}
