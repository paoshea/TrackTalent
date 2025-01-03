import type { 
  UseCustomerJobsOptions, 
  UseCustomerJobsResult, 
  UseDashboardMetricsResult, 
  UseRecentActivityResult 
} from '../types/hooks';

// Mock data types
interface Job {
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

interface ActivityMetadata {
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

interface Activity {
  id: string;
  type: 'application' | 'interview' | 'offer' | 'status_change';
  message: string;
  created_at: string;
  user_id?: string;
  job_id?: string;
  metadata?: ActivityMetadata;
}

// Sample mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    status: 'active',
    created_at: new Date().toISOString(),
    description: 'Looking for an experienced software engineer to join our team.',
    salary_range: '$120k - $180k',
    requirements: ['5+ years experience', 'React', 'Node.js']
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovation Inc',
    location: 'New York, NY',
    status: 'active',
    created_at: new Date().toISOString(),
    description: 'Lead product development for our flagship product.',
    salary_range: '$130k - $170k',
    requirements: ['3+ years PM experience', 'Tech background', 'MBA preferred']
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Remote',
    status: 'active',
    created_at: new Date().toISOString(),
    description: 'Create beautiful and intuitive user experiences.',
    salary_range: '$90k - $140k',
    requirements: ['Portfolio required', 'Figma expertise', '3+ years experience']
  }
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'application',
    message: 'Applied to Senior Software Engineer position at Tech Corp',
    created_at: new Date().toISOString(),
    job_id: '1',
    metadata: {
      jobTitle: 'Senior Software Engineer',
      companyName: 'Tech Corp'
    }
  },
  {
    id: '2',
    type: 'interview',
    message: 'Interview scheduled with Product Manager at Innovation Inc',
    created_at: new Date().toISOString(),
    job_id: '2',
    metadata: {
      jobTitle: 'Product Manager',
      companyName: 'Innovation Inc',
      interviewDate: new Date().toISOString(),
      interviewType: 'Technical'
    }
  },
  {
    id: '3',
    type: 'offer',
    message: 'Received offer for UX Designer position at Design Studio',
    created_at: new Date().toISOString(),
    job_id: '3',
    metadata: {
      jobTitle: 'UX Designer',
      companyName: 'Design Studio',
      offerDetails: {
        salary: '$90k - $140k',
        startDate: new Date().toISOString(),
        position: 'Senior UX Designer'
      }
    }
  }
];

// Mock metrics for different roles
const mockMetrics = {
  candidate: {
    activeJobs: { value: 15, change: 5 },
    applications: { value: 8, change: 2 },
    interviews: { value: 3, change: 1 },
    responseRate: { value: 75, change: 15 }
  },
  employer: {
    activeJobs: { value: 12, change: 3 },
    applications: { value: 45, change: 10 },
    interviews: { value: 15, change: 5 },
    responseRate: { value: 85, change: 10 }
  },
  partner: {
    activeJobs: { value: 50, change: 12 },
    applications: { value: 180, change: 30 },
    interviews: { value: 60, change: 15 },
    responseRate: { value: 90, change: 5 }
  }
};

// Mock hook implementations with role-specific data
export const useCustomerJobs = (_options: UseCustomerJobsOptions & { customerId: string; status?: string[] }): UseCustomerJobsResult => ({
  jobs: mockJobs,
  isLoading: false,
  error: null,
  hasMore: false,
  loadMore: async () => {}
});

export const useDashboardMetrics = (role: 'candidate' | 'employer' | 'partner' = 'candidate'): UseDashboardMetricsResult => ({
  metrics: mockMetrics[role],
  isLoading: false,
  error: null,
  refetch: async () => {}
});

export const useRecentActivity = (): UseRecentActivityResult => ({
  activities: mockActivities,
  isLoading: false,
  error: null,
  hasMore: false,
  loadMore: async () => {},
  refresh: async () => {}
});

// Additional mock data for specific features
export const useSkillAssessments = () => ({
  skills: [
    { name: 'React', level: 'Expert', verified: true },
    { name: 'Node.js', level: 'Advanced', verified: true },
    { name: 'TypeScript', level: 'Intermediate', verified: false }
  ]
});

export const useCareerProgress = () => ({
  goals: [
    { title: 'Learn GraphQL', progress: 75, deadline: '2024-06-01' },
    { title: 'Complete AWS Certification', progress: 40, deadline: '2024-08-01' },
    { title: 'Contribute to Open Source', progress: 60, deadline: '2024-07-01' }
  ]
});

export const useApplicantTracking = () => ({
  stages: [
    { name: 'Applied', count: 45 },
    { name: 'Screening', count: 30 },
    { name: 'Interview', count: 15 },
    { name: 'Offer', count: 5 }
  ]
});

export const useClientManagement = () => ({
  clients: [
    { name: 'Tech Corp', activeJobs: 8, totalHires: 12 },
    { name: 'Innovation Inc', activeJobs: 5, totalHires: 7 },
    { name: 'Design Studio', activeJobs: 3, totalHires: 4 }
  ]
});

export const useRevenueAnalytics = () => ({
  monthly: [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 58000 }
  ],
  totalRevenue: 155000,
  growth: 15
});
