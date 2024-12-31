import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getMockApplications } from "../services/mockApplications";
import type { Application } from "../types/applications";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        
        if (import.meta.env.DEV) {
          // Use mock data in development
          const mockData = await getMockApplications();
          setApplications(mockData);
        } else {
          // Fetch applications from Supabase in production
          const { data, error: fetchError } = await supabase
            .from('applications')
            .select(`
              *,
              job:jobs (
                id,
                title,
                company:companies (
                  id,
                  name,
                  logo
                )
              )
            `)
            .order('applied_at', { ascending: false });

          if (fetchError) throw fetchError;
          setApplications(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  return { applications, loading, error };
}
