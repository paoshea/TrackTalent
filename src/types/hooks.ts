export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  created_at: string;
  description?: string;
  salary_range?: string;
  requirements?: string[];
}

export interface ActivityMetadata {
  jobTitle?: string;
  companyName?: string;
  interviewDate?: string;
  interviewType?: string;
  offerDetails?: {
    salary?: string;
    startDate?: string;
    position?: string;
  };
  statusFrom?: string;
  statusTo?: string;
}

export interface Activity {
  id: string;
  type: 'application' | 'interview' | 'offer' | 'status_change';
  message: string;
  created_at: string;
  user_id?: string;
  job_id?: string;
  metadata?: ActivityMetadata;
}

export interface UseCustomerJobsOptions {
  customerId: string;
  status?: string[];
  limit?: number;
}

export interface UseCustomerJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export interface UseDashboardMetricsResult {
  metrics: {
    activeJobs: { value: number; change: number };
    applications: { value: number; change: number };
    interviews: { value: number; change: number };
    responseRate: { value: number; change: number };
  };
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface UseRecentActivityResult {
  activities: Activity[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}
