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
    {
      name: 'JavaScript',
      level: 'intermediate',
      verified: true,
      verifiedDate: '2023-12-15',
      verifiedBy: 'TechCorp Academy',
      nextLevel: {
        name: 'advanced',
        requiredHours: 120,
        completedHours: 85
      }
    },
    {
      name: 'React',
      level: 'beginner',
      verified: true,
      verifiedDate: '2024-01-10',
      verifiedBy: 'TechCorp Academy',
      nextLevel: {
        name: 'intermediate',
        requiredHours: 80,
        completedHours: 45
      }
    },
    {
      name: 'Node.js',
      level: 'beginner',
      verified: true,
      verifiedDate: '2024-01-05',
      verifiedBy: 'TechCorp Academy',
      nextLevel: {
        name: 'intermediate',
        requiredHours: 80,
        completedHours: 30
      }
    }
  ],
  assessmentProgress: {
    completed: 3,
    inProgress: 2,
    upcoming: 1
  },
  certifications: [
    {
      name: 'Frontend Development',
      provider: 'TechCorp Academy',
      status: 'in-progress',
      progress: 65,
      estimatedCompletion: '2024-03-15'
    }
  ]
});

export const useCareerProgress = () => ({
  currentPath: {
    role: 'Apprentice Developer',
    company: 'TechCorp',
    startDate: '2024-01-01',
    mentor: 'Sarah Johnson',
    nextMilestone: 'Junior Developer'
  },
  progression: {
    current: {
      role: 'Apprentice Developer',
      requiredSkills: ['JavaScript', 'React', 'Git'],
      completedSkills: ['JavaScript', 'Git'],
      timeInRole: '3 months'
    },
    next: {
      role: 'Junior Developer',
      requiredSkills: ['React', 'Node.js', 'TypeScript'],
      timeline: '9 months',
      salary: '$65,000 - $80,000'
    },
    future: {
      role: 'Mid-level Developer',
      timeline: '24 months',
      salary: '$85,000 - $110,000'
    }
  },
  goals: [
    {
      title: 'Complete React Certification',
      type: 'certification',
      progress: 65,
      deadline: '2024-06-01',
      mentor: 'Sarah Johnson',
      nextMeeting: '2024-02-20'
    },
    {
      title: 'Build Portfolio Project',
      type: 'project',
      progress: 40,
      deadline: '2024-08-01',
      mentor: 'David Wilson',
      nextMeeting: '2024-02-22'
    },
    {
      title: 'Node.js Fundamentals',
      type: 'skill',
      progress: 60,
      deadline: '2024-07-01',
      mentor: 'Michael Chen',
      nextMeeting: '2024-02-25'
    }
  ],
  mentorship: {
    mentor: {
      name: 'Sarah Johnson',
      role: 'Tech Lead',
      company: 'TechCorp',
      expertise: ['React', 'System Design', 'Career Development']
    },
    nextSession: {
      date: '2024-02-20',
      topic: 'React Advanced Patterns',
      preparation: ['Complete practice exercises', 'Review documentation']
    },
    recentFeedback: {
      date: '2024-02-10',
      strengths: ['Quick learner', 'Strong problem-solving'],
      areasForImprovement: ['Code organization', 'Testing practices']
    }
  }
});

export const useApplicantTracking = () => ({
  stages: [
    { 
      name: 'Applied',
      count: 45,
      verifiedCount: 38,
      averageScore: 85,
      topSkills: ['JavaScript', 'React', 'Node.js']
    },
    { 
      name: 'Screening',
      count: 30,
      verifiedCount: 28,
      averageScore: 88,
      topSkills: ['System Design', 'API Development', 'TypeScript']
    },
    { 
      name: 'Interview',
      count: 15,
      verifiedCount: 15,
      averageScore: 92,
      topSkills: ['Problem Solving', 'Communication', 'Team Leadership']
    },
    { 
      name: 'Offer',
      count: 5,
      verifiedCount: 5,
      averageScore: 95,
      topSkills: ['Full Stack Development', 'Project Management', 'Architecture']
    }
  ],
  verificationMetrics: {
    totalCandidates: 95,
    verifiedCandidates: 86,
    verificationRate: 90,
    averageVerificationScore: 88,
    skillMatchRate: 92,
    retentionRate: 95
  },
  talentPool: {
    total: 250,
    verified: 225,
    byLevel: {
      entry: 80,
      intermediate: 120,
      senior: 50
    },
    bySkill: [
      { name: 'JavaScript', count: 150, verifiedCount: 135 },
      { name: 'React', count: 100, verifiedCount: 90 },
      { name: 'Node.js', count: 80, verifiedCount: 72 }
    ],
    growth: {
      monthly: 15,
      verifiedGrowth: 12
    }
  }
});

export const useClientManagement = () => ({
  clients: [
    { 
      name: 'Tech Corp',
      activeJobs: 8,
      totalHires: 12,
      verifiedHires: 11,
      retentionRate: 95,
      averageTimeToHire: 15,
      skillMatchRate: 92,
      satisfactionScore: 4.8
    },
    { 
      name: 'Innovation Inc',
      activeJobs: 5,
      totalHires: 7,
      verifiedHires: 7,
      retentionRate: 92,
      averageTimeToHire: 12,
      skillMatchRate: 94,
      satisfactionScore: 4.9
    },
    { 
      name: 'Design Studio',
      activeJobs: 3,
      totalHires: 4,
      verifiedHires: 4,
      retentionRate: 100,
      averageTimeToHire: 10,
      skillMatchRate: 96,
      satisfactionScore: 5.0
    }
  ],
  verificationStats: {
    totalPlacements: 23,
    verifiedPlacements: 22,
    averageRetention: 94,
    averageTimeToHire: 14,
    averageSkillMatch: 93,
    averageSatisfaction: 4.9
  }
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
