import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { 
  Job, 
  JobType, 
  UseCustomerJobsOptions, 
  SalaryPeriod,
  JobFormData,
  JobRemote,
  JobCompensation,
  JobSalary
} from "../types/jobs";

interface JobMetrics {
  applicant_count: number;
  new_applicants: number;
  in_review: number;
  shortlisted: number;
  interviews: number;
  offers: number;
  hires: number;
}

interface SupabaseJob {
  id: string;
  company_id: string;
  title: string;
  description: string | null;
  location: string | null;
  type: string;
  experience_level: JobFormData["experienceLevel"];
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
  metrics: JobMetrics | null;
}

interface UseCustomerJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

const isValidSalaryPeriod = (period: string | null): period is SalaryPeriod => {
  return period === "hourly" || period === "monthly" || period === "yearly";
};

const isValidJobType = (type: string): type is JobType => {
  return ["full-time", "part-time", "contract", "internship"].includes(type);
};

function mapJobResponse(job: unknown): Job | null {
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
      experienceLevel: supabaseJob.experience_level,
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

export function useCustomerJobs(
  options: UseCustomerJobsOptions & { customerId: string },
): UseCustomerJobsResult {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase
          .from("jobs")
          .select(
            `
            *,
            customer:customers(id, name, logo_url),
            metrics:job_metrics(
              applicant_count,
              new_applicants,
              in_review,
              shortlisted,
              interviews,
              offers,
              hires
            )
          `,
          )
          .eq("company_id", options.customerId)
          .order(options.sortBy || "created_at", {
            ascending: options.sortOrder === "asc",
          });

        if (options.status?.length) {
          query = query.in("status", options.status);
        }

        if (options.department) {
          query = query.eq("department", options.department);
        }

        if (options.location) {
          query = query.eq("location", options.location);
        }

        if (options.type) {
          query = query.eq("type", options.type);
        }

        if (options.search) {
          query = query.or(
            `title.ilike.%${options.search}%,description.ilike.%${options.search}%,department.ilike.%${options.search}%,location.ilike.%${options.search}%`
          );
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        if (options.offset) {
          query = query.range(
            options.offset,
            options.offset + (options.limit || 10) - 1,
          );
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (!data) {
          setJobs([]);
          setHasMore(false);
          return;
        }

        const validJobs = data
          .map(mapJobResponse)
          .filter((job): job is Job => job !== null);

        setJobs(validJobs);
        setHasMore(data.length === (options.limit || 10));
        setNextCursor(data[data.length - 1]?.created_at);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to load jobs");
        setError(error.message);
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [
    options.customerId,
    options.status,
    options.department,
    options.location,
    options.type,
    options.search,
    options.sortBy,
    options.sortOrder,
    options.limit,
    options.offset,
  ]);

  const loadMore = async () => {
    if (!nextCursor || !hasMore) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("jobs")
        .select(
          `
          *,
          customer:customers(id, name, logo_url),
          metrics:job_metrics(
            applicant_count,
            new_applicants,
            in_review,
            shortlisted,
            interviews,
            offers,
            hires
          )
        `,
        )
        .eq("company_id", options.customerId)
        .lt("created_at", nextCursor)
        .order(options.sortBy || "created_at", {
          ascending: options.sortOrder === "asc",
        })
        .limit(options.limit || 10);

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      if (!data) {
        setHasMore(false);
        return;
      }

      const validJobs = data
        .map(mapJobResponse)
        .filter((job): job is Job => job !== null);

      setJobs((prev) => [...prev, ...validJobs]);
      setHasMore(data.length === (options.limit || 10));
      setNextCursor(data[data.length - 1]?.created_at);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load more jobs");
      setError(error.message);
      console.error("Error loading more jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    jobs,
    isLoading,
    error,
    hasMore,
    loadMore,
  };
}
