import { useState, useEffect, useCallback } from "react";
import { applications as applicationsService } from "../services/applications";
import type { Application, ApplicationStatus } from "../types/applications";

interface UseApplicationsOptions {
  userId?: string;
  jobId?: string;
  status?: ApplicationStatus;
}

export function useApplications({
  userId,
  jobId,
  status,
}: UseApplicationsOptions = {}) {
  const [applicationList, setApplicationList] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    try {
      const data = await applicationsService.getAll({ userId, jobId, status });
      setApplicationList(data);
    } catch (err) {
      setError("Failed to load applications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, jobId, status]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  return {
    applications: applicationList,
    loading,
    error,
    refresh: loadApplications,
  };
}
