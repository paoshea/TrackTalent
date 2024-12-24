export type StatusType = 
  | "update"
  | "achievement"
  | "milestone"
  | "announcement"
  | "alert";

export interface StatusMetrics {
  likes: number;
  comments: number;
  shares: number;
  views: number;
  engagementRate: number;
}

export interface CreateStatusParams {
  userId: string;
  content: StatusContent;
  visibility?: Status["visibility"];
  metadata?: Status["metadata"];
}

export interface StatusMention {
  id: string;
  type: "user" | "company" | "job";
  name: string;
  range: [number, number];
}

export interface StatusHashtag {
  tag: string;
  range: [number, number];
}

export type StatusContent = {
  text: string;
  mentions?: StatusMention[];
  hashtags?: StatusHashtag[];
  links?: Array<{
    url: string;
    title?: string;
  }>;
};

export interface Status {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: StatusType;
  content: StatusContent;
  metadata?: {
    jobTitle?: string;
    candidateName?: string;
    interviewDate?: string;
    location?: string;
    company?: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  shares: number;
  hasLiked?: boolean;
  hasShared?: boolean;
  visibility: "public" | "team" | "private";
  pinned?: boolean;
}

export interface StatusFilter {
  type?: StatusType[];
  userId?: string;
  startDate?: string;
  endDate?: string;
  visibility?: Status["visibility"];
  pinned?: boolean;
}

export interface StatusUpdate {
  type: StatusType;
  content: StatusContent;
  metadata?: Status["metadata"];
  visibility?: Status["visibility"];
  pinned?: boolean;
}

export interface StatusComment {
  id: string;
  statusId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  hasLiked?: boolean;
}

export interface StatusNotification {
  id: string;
  statusId: string;
  userId: string;
  type: "like" | "comment" | "mention" | "share";
  read: boolean;
  createdAt: string;
  metadata?: {
    commentId?: string;
    commentText?: string;
    userName?: string;
    userAvatar?: string;
  };
}

export interface StatusStats {
  total: number;
  byType: Record<StatusType, number>;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  trending: {
    daily: Status[];
    weekly: Status[];
    monthly: Status[];
  };
}
