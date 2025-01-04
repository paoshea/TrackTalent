import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Job, UseCustomerJobsOptions } from "../types/jobs";
import { mapJobResponse } from "../utils/jobMapper";

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
        const lastCreatedAt = data[data.length - 1]?.created_at;
        setNextCursor(lastCreatedAt || undefined);
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
      const lastCreatedAt = data[data.length - 1]?.created_at;
      setNextCursor(lastCreatedAt || undefined);
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
