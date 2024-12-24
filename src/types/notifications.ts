export type NotificationType =
  | "application_status"
  | "interview_scheduled"
  | "message_received"
  | "job_match"
  | "profile_view"
  | "skill_endorsed"
  | "job_alert"
  | "system_alert";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
  metadata?: {
    jobId?: string;
    applicationId?: string;
    interviewId?: string;
    messageId?: string;
    senderId?: string;
    skillId?: string;
    url?: string;
  };
  priority?: "low" | "medium" | "high";
  expiresAt?: string;
  actions?: Array<{
    label: string;
    url: string;
    type: "primary" | "secondary";
  }>;
}

export interface NotificationPreferences {
  email: {
    enabled: boolean;
    types: NotificationType[];
    frequency: "immediate" | "daily" | "weekly";
  };
  push: {
    enabled: boolean;
    types: NotificationType[];
  };
  inApp: {
    enabled: boolean;
    types: NotificationType[];
  };
}

export interface NotificationFilter {
  type?: NotificationType[];
  read?: boolean;
  startDate?: string;
  endDate?: string;
  priority?: Notification["priority"];
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NonNullable<Notification["priority"]>, number>;
}

export interface NotificationUpdate {
  read?: boolean;
  readAt?: string;
  metadata?: Notification["metadata"];
}

export interface NotificationSubscription {
  id: string;
  userId: string;
  type: NotificationType;
  filters?: {
    jobTypes?: string[];
    locations?: string[];
    salary?: {
      min?: number;
      max?: number;
    };
    skills?: string[];
  };
  frequency: "immediate" | "daily" | "weekly";
  channels: ("email" | "push" | "inApp")[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}
