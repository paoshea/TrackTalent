import type { LucideIcon } from "lucide-react";

export interface DashboardMetrics {
  jobs: {
    total: number;
    active: number;
    trend: number;
  };
  applications: {
    total: number;
    pending: number;
    trend: number;
  };
  interviews: {
    total: number;
    scheduled: number;
    completed: number;
    byOutcome: {
      offered: number;
      rejected: number;
      pending: number;
    };
    trend: number;
  };
  timeToHire: {
    average: number;
    trend: number;
  };
  activeJobsChange: number;
  totalCandidates: number;
  candidatesChange: number;
  placementRate: number;
  placementRateChange: number;
  timeToFill: number;
  timeToFillChange: number;
  connections: number;
  jobViews: number;
  savedJobs: number;
  matchScore: number;
  profileViews: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  icon: LucideIcon;
  timestamp: string;
  content?: string;
  metadata?: {
    jobTitle?: string;
    candidateName?: string;
    interviewDate?: string;
    comments?: Array<{
      id: string;
      content: string;
      userName: string;
      timestamp: string;
    }>;
  };
}

export type ActivityType =
  | "job_posted"
  | "application_received"
  | "interview_scheduled"
  | "interview_completed"
  | "offer_sent"
  | "offer_accepted"
  | "candidate_hired"
  | "status_update";

export interface ActivityItem extends Activity {}

export interface DashboardFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  jobTypes?: string[];
  departments?: string[];
  locations?: string[];
}

export interface DashboardConfig {
  metrics: {
    enabled: boolean;
    refreshInterval?: number;
  };
  activity: {
    enabled: boolean;
    limit?: number;
  };
  jobs: {
    enabled: boolean;
    limit?: number;
  };
  candidates: {
    enabled: boolean;
    limit?: number;
  };
}

export interface DashboardState {
  filters: DashboardFilters;
  config: DashboardConfig;
  selectedView: "overview" | "jobs" | "candidates" | "analytics";
}

export interface DashboardAction {
  type: "SET_FILTERS" | "SET_CONFIG" | "SET_VIEW";
  payload: Partial<DashboardState>;
}
