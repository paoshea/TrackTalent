
import { useState, useEffect } from "react";
import type { Job } from "../types";
import { supabase } from "../lib/supabase";

export function useRecommendedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendedJobs() {
      try {
        setIsLoading(true);
        // Fetch jobs from Supabase that match the user's profile
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .limit(5)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setJobs(data || []);
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
