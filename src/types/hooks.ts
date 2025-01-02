export interface UseCustomerJobsOptions {
  customerId: string;
  status?: string[];
  limit?: number;
}

export interface UseCustomerJobsResult {
  jobs: any[];
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
  activities: any[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}
