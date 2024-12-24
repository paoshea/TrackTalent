export type InteractionType = "like" | "comment" | "share" | "view" | "save";

export interface Interaction {
  id: string;
  type: InteractionType;
  userId: string;
  targetId: string;
  targetType: "status" | "job" | "application" | "profile";
  createdAt: string;
  metadata?: {
    content?: string;
    parentId?: string;
    replyTo?: string;
    attachments?: Array<{
      id: string;
      type: "image" | "file";
      url: string;
      name: string;
    }>;
  };
}

export interface Comment {
  id: string;
  activityId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    avatarUrl: string;
  };
}

export interface InteractionEvent {
  activityId: string;
  type: InteractionType;
  targetId: string;
  targetType: "status" | "job" | "application" | "profile";
  userId: string;
  metadata?: {
    content?: string;
    parentId?: string;
    replyTo?: string;
    attachments?: Array<{
      id: string;
      type: "image" | "file";
      url: string;
      name: string;
    }>;
  };
}

export interface InteractionStats {
  total: number;
  byType: Record<InteractionType, number>;
  byUser: Record<string, number>;
  trending: Array<{
    targetId: string;
    targetType: string;
    count: number;
  }>;
  timeline: Array<{
    timestamp: string;
    count: number;
  }>;
}

export interface InteractionFilter {
  type?: InteractionType[];
  targetId?: string;
  targetType?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

export interface InteractionUpdate {
  metadata?: InteractionEvent["metadata"];
}

export interface InteractionAnalytics {
  engagement: {
    total: number;
    unique: number;
    average: number;
    peak: {
      count: number;
      timestamp: string;
    };
  };
  distribution: {
    byType: Record<InteractionType, number>;
    byTime: {
      hourly: number[];
      daily: number[];
      weekly: number[];
    };
    byUser: Array<{
      userId: string;
      count: number;
      types: InteractionType[];
    }>;
  };
  trends: {
    growing: Array<{
      targetId: string;
      targetType: string;
      growth: number;
    }>;
    declining: Array<{
      targetId: string;
      targetType: string;
      decline: number;
    }>;
  };
}

export interface InteractionNotification {
  id: string;
  type: InteractionType;
  userId: string;
  targetId: string;
  targetType: string;
  timestamp: string;
  read: boolean;
  metadata?: Record<string, string | number | boolean | null>;
}
