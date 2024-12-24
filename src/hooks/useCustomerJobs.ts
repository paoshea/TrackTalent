import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Job, UseCustomerJobsOptions } from "../types/jobs";

interface UseCustomerJobsResult {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
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
            customer:customers(id, name),
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
          .eq("customerId", options.customerId)
          .order(options.sortBy || "createdAt", {
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
          query = query.or(`
            title.ilike.%${options.search}%,
            description.ilike.%${options.search}%,
            department.ilike.%${options.search}%,
            location.ilike.%${options.search}%
          `);
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

        if (fetchError) throw fetchError;

        const formattedJobs = data.map((job) => ({
          ...job,
          applicantCount: job.metrics?.applicant_count || 0,
          newApplicants: job.metrics?.new_applicants || 0,
          inReview: job.metrics?.in_review || 0,
          shortlisted: job.metrics?.shortlisted || 0,
          interviews: job.metrics?.interviews || 0,
          offers: job.metrics?.offers || 0,
          hires: job.metrics?.hires || 0,
        })) as Job[];

        setJobs(formattedJobs);
        setHasMore(data.length === (options.limit || 10));
        setNextCursor(data[data.length - 1]?.created_at);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load jobs");
        console.error("Error fetching jobs:", err);
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
          customer:customers(id, name),
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
        .eq("customerId", options.customerId)
        .lt("created_at", nextCursor)
        .order(options.sortBy || "createdAt", {
          ascending: options.sortOrder === "asc",
        })
        .limit(options.limit || 10);

      if (fetchError) throw fetchError;

      const formattedJobs = data.map((job) => ({
        ...job,
        applicantCount: job.metrics?.applicant_count || 0,
        newApplicants: job.metrics?.new_applicants || 0,
        inReview: job.metrics?.in_review || 0,
        shortlisted: job.metrics?.shortlisted || 0,
        interviews: job.metrics?.interviews || 0,
        offers: job.metrics?.offers || 0,
        hires: job.metrics?.hires || 0,
      })) as Job[];

      setJobs((prev) => [...prev, ...formattedJobs]);
      setHasMore(data.length === (options.limit || 10));
      setNextCursor(data[data.length - 1]?.created_at);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more jobs");
      console.error("Error loading more jobs:", err);
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
