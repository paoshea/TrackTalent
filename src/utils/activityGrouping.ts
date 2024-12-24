import type {
  Activity,
  ActivityType,
  ActivityGroup,
  ActivityItem,
  ActivityInteraction,
} from "../types/activity";

export const activityGroupLabels: Record<ActivityType, string> = {
  message_received: "Messages",
  interview_scheduled: "Interviews",
  application_submitted: "Applications",
  status_updated: "Status Updates",
  job_posted: "Job Postings",
  candidate_shortlisted: "Shortlists",
  application_updated: "Application Updates",
  interview_completed: "Completed Interviews",
  offer_extended: "Offers Extended",
  offer_accepted: "Offers Accepted",
  offer_declined: "Offers Declined",
  status_posted: "Status Posts",
  status_liked: "Status Likes",
  status_shared: "Status Shares",
  comment_added: "Comments",
  profile_updated: "Profile Updates",
  job_updated: "Job Updates",
  job_closed: "Closed Jobs",
};

function transformActivityToActivityItem(activity: Activity): ActivityItem {
  const metadata = activity.metadata as
    | Record<string, string | undefined>
    | undefined;

  return {
    id: activity.id,
    type: activity.type,
    userId: activity.userId,
    userName: (metadata?.userName as string) || "Unknown User",
    userAvatar: metadata?.userAvatar,
    targetId: (metadata?.targetId as string) || activity.id,
    targetType:
      (metadata?.targetType as ActivityItem["targetType"]) || "status",
    action: activity.message,
    timestamp: activity.timestamp,
    content: activity.content,
    metadata: {
      title: metadata?.title,
      description: metadata?.description,
      company: metadata?.company,
      location: metadata?.location,
      status: metadata?.status,
      date: metadata?.date,
      url: metadata?.url,
      ...(metadata || {}),
    },
  };
}

export function groupActivitiesByDate(activities: Activity[]): ActivityGroup[] {
  const groups = activities.reduce(
    (acc, activity) => {
      const date = new Date(activity.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transformActivityToActivityItem(activity));
      return acc;
    },
    {} as Record<string, ActivityItem[]>,
  );

  return Object.entries(groups)
    .map(([date, items]) => ({
      date,
      items: items.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function groupActivitiesByType(
  activities: Activity[],
): Record<ActivityType, Activity[]> {
  return activities.reduce(
    (acc, activity) => {
      if (!acc[activity.type]) {
        acc[activity.type] = [];
      }
      acc[activity.type].push(activity);
      return acc;
    },
    {} as Record<ActivityType, Activity[]>,
  );
}

export function filterActivitiesByDateRange(
  activities: Activity[],
  startDate: Date,
  endDate: Date,
): Activity[] {
  return activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return activityDate >= startDate && activityDate <= endDate;
  });
}

export function getActivityDateRanges(activities: Activity[]): {
  earliest: Date;
  latest: Date;
} {
  if (!activities.length) {
    return {
      earliest: new Date(),
      latest: new Date(),
    };
  }

  const dates = activities.map((a) => new Date(a.timestamp).getTime());
  return {
    earliest: new Date(Math.min(...dates)),
    latest: new Date(Math.max(...dates)),
  };
}

function countInteractionsByType(
  interactions: ActivityInteraction[] | undefined,
  type: ActivityInteraction["type"],
): number {
  return interactions?.filter((i) => i.type === type).length || 0;
}

export function sortActivitiesByEngagement(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => {
    const aEngagement =
      countInteractionsByType(a.interactions, "like") +
      countInteractionsByType(a.interactions, "comment") * 2 +
      countInteractionsByType(a.interactions, "share") * 3;

    const bEngagement =
      countInteractionsByType(b.interactions, "like") +
      countInteractionsByType(b.interactions, "comment") * 2 +
      countInteractionsByType(b.interactions, "share") * 3;

    return bEngagement - aEngagement;
  });
}
