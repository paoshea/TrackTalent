import type { Job, JobType, SalaryPeriod, JobRemote, JobCompensation, JobSalary } from "../types/jobs";

type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";

interface SupabaseJob {
  id: string;
  company_id: string;
  title: string;
  description: string | null;
  location: string | null;
  type: string;
  experience_level: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  salary_period: SalaryPeriod | null;
  requirements: string[] | null;
  benefits: string[] | null;
  skills: string[] | null;
  department: string | null;
  status: "draft" | "published" | "closed";
  created_at: string;
  updated_at: string;
  published_at: string | null;
  closed_at: string | null;
  remote_allowed: boolean;
  remote_type: string | null;
  customer: {
    id: string;
    name: string;
    logo_url: string;
  };
  metrics: {
    applicant_count: number;
    new_applicants: number;
    in_review: number;
    shortlisted: number;
    interviews: number;
    offers: number;
    hires: number;
  } | null;
}

const isValidSalaryPeriod = (period: string | null): period is SalaryPeriod => {
  return period === "hourly" || period === "monthly" || period === "yearly";
};

const isValidJobType = (type: string): type is JobType => {
  return ["full-time", "part-time", "contract", "internship"].includes(type);
};

const isValidExperienceLevel = (level: string | null): level is ExperienceLevel => {
  return level === "entry" || level === "mid" || level === "senior" || level === "lead" || level === "executive";
};

export function mapJobResponse(job: unknown): Job | null {
  try {
    const supabaseJob = job as SupabaseJob;
    
    if (!isValidJobType(supabaseJob.type)) {
      console.error('Invalid job type:', supabaseJob.type);
      return null;
    }

    const salaryPeriod = isValidSalaryPeriod(supabaseJob.salary_period) 
      ? supabaseJob.salary_period 
      : "yearly";

    const salary: JobSalary = {
      min: supabaseJob.salary_min || 0,
      max: supabaseJob.salary_max || 0,
      currency: supabaseJob.salary_currency || "USD",
      period: salaryPeriod
    };

    const compensation: JobCompensation = {
      salary
    };

    const remote: JobRemote = {
      allowed: supabaseJob.remote_allowed,
      type: supabaseJob.remote_type as "fully" | "hybrid" | "occasional" | undefined
    };
    
    return {
      id: supabaseJob.id,
      companyId: supabaseJob.company_id,
      title: supabaseJob.title,
      description: supabaseJob.description || "",
      location: supabaseJob.location || "",
      type: supabaseJob.type as JobType,
      experienceLevel: isValidExperienceLevel(supabaseJob.experience_level) 
        ? supabaseJob.experience_level 
        : "entry",
      requirements: supabaseJob.requirements || [],
      benefits: supabaseJob.benefits || [],
      skills: supabaseJob.skills || [],
      department: supabaseJob.department || "",
      status: supabaseJob.status,
      createdAt: supabaseJob.created_at,
      updatedAt: supabaseJob.updated_at,
      publishedAt: supabaseJob.published_at || undefined,
      closedAt: supabaseJob.closed_at || undefined,
      company: {
        id: supabaseJob.customer.id,
        name: supabaseJob.customer.name,
        logo: supabaseJob.customer.logo_url
      },
      compensation,
      remote,
      salaryRange: salary,
      applicantCount: supabaseJob.metrics?.applicant_count || 0
    };
  } catch (error) {
    console.error('Error mapping job response:', error);
    return null;
  }
}
