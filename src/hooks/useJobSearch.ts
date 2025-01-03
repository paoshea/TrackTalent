import { useState, useEffect } from "react";
import type { JobSearchOptions, JobSearchResult, JobType, SalaryPeriod, RemoteType } from "../types/jobs";
import { supabase } from "../lib/supabase";
import type { Json } from "../types/supabase";

interface SupabaseCompany {
  id: string;
  name: string;
  logo_url: string;
}

interface RawSupabaseJob {
  id: string;
  company_id: string;
  title: string;
  description: string | null;
  location: string | null;
  type: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  salary_period: string | null;
  requirements: Json | null;
  responsibilities: Json | null;
  skills: Json | null;
  benefits: Json | null;
  department: string | null;
  remote_allowed: boolean;
  remote_type: string | null;
  status: string;
  application_deadline: string | null;
  created_at: string;
  updated_at: string;
  metadata: Json;
  company: SupabaseCompany[];
}

function isValidJobType(type: string): type is JobType {
  return ["full-time", "part-time", "contract", "internship"].includes(type);
}

function isValidSalaryPeriod(period: string | null): period is SalaryPeriod {
  return period === "hourly" || period === "monthly" || period === "yearly";
}

function isValidRemoteType(type: string | null): type is RemoteType {
  return type === "fully" || type === "hybrid" || type === "occasional";
}

function parseJsonArray(json: Json | null): string[] {
  if (Array.isArray(json)) {
    return json.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function isRawSupabaseJob(data: unknown): data is RawSupabaseJob {
  const job = data as RawSupabaseJob;
  return (
    typeof job === 'object' &&
    job !== null &&
    typeof job.id === 'string' &&
    typeof job.title === 'string' &&
    Array.isArray(job.company) &&
    job.company.length > 0 &&
    typeof job.company[0].id === 'string' &&
    typeof job.company[0].name === 'string'
  );
}

function validateAndMapJob(data: unknown): JobSearchResult | null {
  if (!isRawSupabaseJob(data)) {
    console.error('Invalid job data structure:', data);
    return null;
  }

  try {
    const job = data;
    const company = job.company[0];
    const jobType = isValidJobType(job.type) ? job.type : "full-time";
    const salaryPeriod = isValidSalaryPeriod(job.salary_period) ? job.salary_period : "yearly";
    const remoteType = isValidRemoteType(job.remote_type) ? job.remote_type : undefined;

    return {
      id: job.id,
      title: job.title,
      company: company.name,
      location: job.location || "",
      type: jobType,
      description: job.description || "",
      requirements: parseJsonArray(job.requirements),
      responsibilities: parseJsonArray(job.responsibilities),
      skills: parseJsonArray(job.skills),
      compensation: {
        salary: {
          min: job.salary_min || 0,
          max: job.salary_max || 0,
          currency: job.salary_currency || "USD",
          period: salaryPeriod
        }
      },
      benefits: parseJsonArray(job.benefits),
      department: job.department || "",
      experience: {
        level: job.experience_level,
        years: {
          min: 0
        }
      },
      education: {
        level: "none"
      },
      remote: {
        allowed: job.remote_allowed,
        type: remoteType
      },
      status: job.status,
      applicationDeadline: job.application_deadline || undefined,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
      score: 0,
      matchedSkills: [],
      matchedKeywords: []
    };
  } catch (error) {
    console.error('Error mapping job response:', error);
    return null;
  }
}

export function useJobSearch(options: JobSearchOptions = {}) {
  const [results, setResults] = useState<JobSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("jobs")
          .select(`
            *,
            company:companies (
              id,
              name,
              logo_url
            )
          `, { count: "exact" });

        // Apply filters
        if (options.filters) {
          const {
            type,
            location,
            department,
            experienceLevel,
            remote,
            status,
            skills,
            salary,
          } = options.filters;

          if (type?.length) {
            query = query.in("type", type);
          }

          if (location?.length) {
            query = query.in("location", location);
          }

          if (department?.length) {
            query = query.in("department", department);
          }

          if (experienceLevel?.length) {
            query = query.in("experience_level", experienceLevel);
          }

          if (remote !== undefined) {
            query = query.eq("remote_allowed", remote);
          }

          if (status?.length) {
            query = query.in("status", status);
          }

          if (skills?.length) {
            query = query.contains("skills", skills);
          }

          if (salary) {
            if (salary.min) {
              query = query.gte("salary_min", salary.min);
            }
            if (salary.max) {
              query = query.lte("salary_max", salary.max);
            }
          }
        }

        // Apply search query
        if (options.query) {
          query = query.or(
            `title.ilike.%${options.query}%,description.ilike.%${options.query}%`,
          );
        }

        // Apply sorting
        if (options.sort) {
          query = query.order(options.sort.field, {
            ascending: options.sort.direction === "asc",
          });
        } else {
          query = query.order("created_at", { ascending: false });
        }

        // Apply pagination
        if (options.page !== undefined && options.limit) {
          const start = options.page * options.limit;
          query = query.range(start, start + options.limit - 1);
        }

        const { data, error: fetchError, count } = await query;

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (!data) {
          setResults([]);
          setTotalCount(0);
          return;
        }

        const searchResults = data
          .map(validateAndMapJob)
          .filter((result): result is JobSearchResult => result !== null);

        setResults(searchResults);
        if (count !== null) {
          setTotalCount(count);
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : "Failed to fetch jobs";
        setError(error);
        console.error("Job search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [options]);

  return {
    results,
    isLoading,
    error,
    totalCount,
  };
}
