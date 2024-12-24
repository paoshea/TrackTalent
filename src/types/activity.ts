export type ActivityType =
  | "message_received"
  | "interview_scheduled"
  | "application_submitted"
  | "status_updated"
  | "job_posted"
  | "candidate_shortlisted"
  | "application_updated"
  | "interview_completed"
  | "offer_extended"
  | "offer_accepted"
  | "offer_declined"
  | "status_posted"
  | "status_liked"
  | "status_shared"
  | "comment_added"
  | "profile_updated"
  | "job_updated"
  | "job_closed";

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  message: string;
  icon?: React.ReactNode;
  timestamp: string;
  content?: string;
  interactions?: ActivityInteraction[];
  metadata?: Record<string, unknown>;
}

export interface ActivityFeedOptions {
  userId?: string;
  type?: ActivityType;
  limit?: number;
  before?: string;
  after?: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  userId: string;
  userName: string;
  userAvatar?: string;
  targetId: string;
  targetType:
    | "application"
    | "interview"
    | "offer"
    | "status"
    | "job"
    | "profile";
  action: string;
  timestamp: string;
  content?: string;
  metadata?: {
    title?: string;
    description?: string;
    company?: string;
    location?: string;
    status?: string;
    date?: string;
    url?: string;
    [key: string]: string | undefined;
  };
}

export interface ActivityFilter {
  types?: ActivityType[];
  userId?: string;
  targetId?: string;
  targetType?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export interface ActivityGroup {
  date: string;
  items: ActivityItem[];
}

export interface UseActivityFeedResult {
  activities: ActivityGroup[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  filter: (filters: ActivityFilter) => void;
  refresh: () => Promise<void>;
}

export interface ActivityFeedProps {
  userId?: string;
  filter?: ActivityFilter;
  onItemClick?: (activity: ActivityItem) => void;
  maxItems?: number;
  showLoadMore?: boolean;
  groupByDate?: boolean;
  renderItem?: (activity: ActivityItem) => React.ReactNode;
  emptyState?: React.ReactNode;
}

export interface ActivityItemProps {
  activity: ActivityItem;
  onClick?: (activity: ActivityItem) => void;
}

export interface ActivityFiltersProps {
  filters: ActivityFilter;
  onChange: (filters: ActivityFilter) => void;
  availableTypes?: ActivityType[];
  showDateRange?: boolean;
  showTypes?: boolean;
  showTargetTypes?: boolean;
}

export interface ActivityInteraction {
  id: string;
  activityId: string;
  userId: string;
  type: "like" | "comment" | "share";
  content?: string;
  timestamp: string;
}

export interface UseActivityInteractionsResult {
  interactions: ActivityInteraction[];
  isLoading: boolean;
  error: string | null;
  like: (activityId: string) => Promise<void>;
  unlike: (activityId: string) => Promise<void>;
  comment: (activityId: string, content: string) => Promise<void>;
  deleteComment: (interactionId: string) => Promise<void>;
  share: (activityId: string) => Promise<void>;
}

export interface ActivityStats {
  total: number;
  byType: Record<ActivityType, number>;
  interactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  trending: {
    daily: Activity[];
    weekly: Activity[];
    monthly: Activity[];
  };
}

export interface InteractionEvent {
  activityId: string;
  userId: string;
  type: "like" | "comment" | "share";
  content?: string;
  metadata?: Record<string, unknown>;
}
