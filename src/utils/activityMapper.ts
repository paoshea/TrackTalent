import type { ActivityItem } from "../types/analytics";
import type { Activity, ActivityType, ActivityUser } from "../types/dashboard";
import type { LucideIcon } from "lucide-react";
import { Calendar, FileText, Bell } from "lucide-react";
import type { Database } from "../types/database";

type DatabaseActivity =
  Database["public"]["Tables"]["analytics"]["Row"]["activities"][number];

const activityTypeMap: Record<DatabaseActivity["type"], ActivityType> = {
  job_posted: "job_posted",
  application_received: "application_received",
  interview_scheduled: "interview_scheduled",
  interview_completed: "interview_completed",
  offer_sent: "offer_sent",
  offer_accepted: "offer_accepted",
  candidate_hired: "candidate_hired",
  status_update: "status_update",
};

export function mapDatabaseActivity(activity: DatabaseActivity): ActivityItem {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    type: activityTypeMap[activity.type],
    snapshotDate: activity.snapshotDate,
    metadata: activity.metadata,
  };
}

export function mapDatabaseActivities(
  activities: DatabaseActivity[],
): ActivityItem[] {
  return activities.map(mapDatabaseActivity);
}

const activityIconMap: Record<ActivityType, LucideIcon> = {
  job_posted: FileText,
  application_received: FileText,
  interview_scheduled: Calendar,
  interview_completed: Calendar,
  offer_sent: FileText,
  offer_accepted: FileText,
  candidate_hired: FileText,
  status_update: Bell,
};

export function mapToActivity(item: ActivityItem): Activity {
  const Icon = activityIconMap[item.type];
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    description: item.description,
    icon: Icon,
    timestamp: item.snapshotDate,
    content: item.description,
    user: {
      id: (item.metadata?.userId as string) || "",
      name: (item.metadata?.userName as string) || "",
      avatar: item.metadata?.userAvatar as string,
    } as ActivityUser,
    action: item.title,
    target: (item.metadata?.targetId as string) || "",
    metadata: {
      jobTitle: item.metadata?.jobTitle as string,
      candidateName: item.metadata?.candidateName as string,
      interviewDate: item.metadata?.interviewDate as string,
      description: item.metadata?.description as string,
      liked: item.metadata?.liked as boolean,
      likes: item.metadata?.likes as number,
      comments: [],
    },
  };
}

export function mapToActivities(items: ActivityItem[]): Activity[] {
  return items.map(mapToActivity);
}
