import { useState, useEffect } from "react";
import type { Job } from "types/jobs";
import { supabase } from "lib/supabase";
import { getRecommendedJobs } from "services/mockJobs";
import { mapJobResponse } from "utils/jobMapper";

export function useRecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendedJobs() {
      try {
        setIsLoading(true);
        
        if (import.meta.env.DEV) {
          // Use mock data in development
          const mockJobs = await getRecommendedJobs();
          setJobs(mockJobs);
        } else {
          // Fetch jobs from Supabase in production
          const { data, error: fetchError } = await supabase
            .from('jobs')
            .select(`
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
            `)
            .limit(5)
            .order('created_at', { ascending: false });

          if (fetchError) throw fetchError;
          const validJobs = (data || [])
            .map(mapJobResponse)
            .filter((job): job is Job => job !== null);
          setJobs(validJobs);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recommended jobs");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendedJobs();
  }, []);

  return { jobs, isLoading, error };
}
