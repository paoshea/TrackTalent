import { useState, useEffect } from "react";
import type { Job } from "../types/jobs";
import { supabase } from "../lib/supabase";
import { getRecommendedJobs } from "../services/mockJobs";

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
            .select('*')
            .limit(5)
            .order('created_at', { ascending: false });

          if (fetchError) throw fetchError;
          setJobs(data || []);
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
