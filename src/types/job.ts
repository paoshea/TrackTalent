export interface Job {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  companyId: string;
  company: {
    id: string;
    name: string;
    logo: string;
  };
  compensation: {
    salary: {
      min: number;
      max: number;
      currency: string;
      period: string;
    };
  };
  skills: string[];
  status: 'open' | 'closed' | 'draft';
  applicantCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  requirements: string[];
  benefits: string[];
  department?: string;
  experienceLevel: string;
}

export interface JobFilters {
  location: string[];
  jobType: string;
  salary: {
    min?: number;
    max?: number;
  };
  skills: string[];
}
