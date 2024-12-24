export type JobType = "full-time" | "part-time" | "contract" | "internship";

export type RemoteType = "fully" | "hybrid" | "occasional";

export type SalaryPeriod = "hourly" | "monthly" | "yearly";

export interface JobSalary extends Record<string, unknown> {
  min: number;
  max: number;
  currency: string;
  period: SalaryPeriod;
}

export interface JobCompensation extends Record<string, unknown> {
  salary: JobSalary;
}

export interface JobRemote extends Record<string, unknown> {
  allowed: boolean;
  type?: RemoteType;
}

export interface JobFormData extends Record<string, unknown> {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  compensation: JobCompensation;
  skills: string[];
  benefits: string[];
  department: string;
  experienceLevel: "entry" | "mid" | "senior" | "lead" | "executive";
  remote: JobRemote;
}

export type JobFormErrors = {
  [K in keyof JobFormData]?: string;
};

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

export interface Job extends JobFormData {
  id: string;
  companyId: string;
  company: Company;
  status: "draft" | "published" | "closed";
  applicantCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  salaryRange: JobSalary;
}

export type JobFilters = JobFilter;

export interface UseCustomerJobsOptions {
  status?: string[];
  department?: string;
  location?: string;
  type?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface JobSearchOptions {
  query?: string;
  filters?: {
    type?: string[];
    location?: string[];
    department?: string[];
    experienceLevel?: string[];
    remote?: boolean;
    status?: string[];
    skills?: string[];
    salary?: {
      min?: number;
      max?: number;
    };
  };
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  page?: number;
  limit?: number;
}

export interface JobSearchResult {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  compensation: JobCompensation;
  benefits: string[];
  department: string;
  experience: {
    level: string;
    years?: {
      min: number;
      max?: number;
    };
  };
  education: {
    level: string;
    field?: string;
  };
  remote: JobRemote;
  status: string;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
  score: number;
  matchedSkills: string[];
  matchedKeywords: string[];
}

export interface JobFilter {
  type?: JobFormData["type"][];
  experienceLevel?: JobFormData["experienceLevel"][];
  remote?: boolean;
  location?: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  skills?: string[];
  department?: string;
}

export interface JobSearchParams extends JobFilter {
  query?: string;
  page?: number;
  limit?: number;
  sort?: "relevance" | "date" | "salary";
  order?: "asc" | "desc";
}

export interface JobStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  averageApplicationsPerJob: number;
  topSkills: Array<{
    name: string;
    count: number;
  }>;
  locationDistribution: Array<{
    location: string;
    count: number;
  }>;
}
