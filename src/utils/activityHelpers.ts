import type { ActivityType, ActivityItem } from "../types/activity";

export const activityTitles: Record<ActivityType, string> = {
  message_received: "Message Received",
  interview_scheduled: "Interview Scheduled",
  application_submitted: "Application Submitted",
  status_updated: "Status Updated",
  job_posted: "Job Posted",
  candidate_shortlisted: "Candidate Shortlisted",
  application_updated: "Application Updated",
  interview_completed: "Interview Completed",
  offer_extended: "Offer Extended",
  offer_accepted: "Offer Accepted",
  offer_declined: "Offer Declined",
  status_posted: "Status Posted",
  status_liked: "Status Liked",
  status_shared: "Status Shared",
  comment_added: "Comment Added",
  profile_updated: "Profile Updated",
  job_updated: "Job Updated",
  job_closed: "Job Closed",
};

export const activityIcons: Record<ActivityType, string> = {
  message_received: "✉️",
  interview_scheduled: "📅",
  application_submitted: "📝",
  status_updated: "🔄",
  job_posted: "📋",
  candidate_shortlisted: "⭐",
  application_updated: "✏️",
  interview_completed: "✅",
  offer_extended: "🤝",
  offer_accepted: "🎉",
  offer_declined: "❌",
  status_posted: "📢",
  status_liked: "❤️",
  status_shared: "🔄",
  comment_added: "💬",
  profile_updated: "👤",
  job_updated: "📋",
  job_closed: "🔒",
};

export const activityDescriptions: Record<
  ActivityType,
  (activity: ActivityItem) => string
> = {
  message_received: (activity) => `${activity.userName} sent you a message`,
  interview_scheduled: (activity) =>
    `Interview scheduled with ${activity.userName} for ${activity.metadata?.title}`,
  application_submitted: (activity) =>
    `${activity.userName} submitted an application for ${activity.metadata?.title}`,
  status_updated: (activity) =>
    `${activity.userName} updated their status to ${activity.metadata?.status}`,
  job_posted: (activity) =>
    `${activity.userName} posted a new job: ${activity.metadata?.title}`,
  candidate_shortlisted: (activity) =>
    `${activity.userName} was shortlisted for ${activity.metadata?.title}`,
  application_updated: (activity) =>
    `${activity.userName} updated their application for ${activity.metadata?.title}`,
  interview_completed: (activity) =>
    `Interview completed with ${activity.userName} for ${activity.metadata?.title}`,
  offer_extended: (activity) =>
    `Offer extended to ${activity.userName} for ${activity.metadata?.title}`,
  offer_accepted: (activity) =>
    `${activity.userName} accepted the offer for ${activity.metadata?.title}`,
  offer_declined: (activity) =>
    `${activity.userName} declined the offer for ${activity.metadata?.title}`,
  status_posted: (activity) => `${activity.userName} posted a status update`,
  status_liked: (activity) => `${activity.userName} liked a status`,
  status_shared: (activity) => `${activity.userName} shared a status`,
  comment_added: (activity) =>
    `${activity.userName} commented on ${activity.metadata?.title}`,
  profile_updated: (activity) => `${activity.userName} updated their profile`,
  job_updated: (activity) =>
    `${activity.userName} updated the job posting for ${activity.metadata?.title}`,
  job_closed: (activity) =>
    `${activity.userName} closed the job posting for ${activity.metadata?.title}`,
};

export function formatActivityDate(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString();
}

export function groupActivitiesByDate(activities: ActivityItem[]): Array<{
  date: string;
  items: ActivityItem[];
}> {
  const groups: Record<string, ActivityItem[]> = {};

  activities.forEach((activity) => {
    const date = new Date(activity.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
  });

  return Object.entries(groups)
    .map(([date, items]) => ({ date, items }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
