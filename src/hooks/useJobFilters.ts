import { useState, useCallback } from "react";

interface JobFilters {
  query: string;
  experienceLevel: string;
  location: string;
  jobType: string;
  showFilters: boolean;
}

const initialFilters: JobFilters = {
  query: "",
  experienceLevel: "",
  location: "",
  jobType: "",
  showFilters: false,
};

export function useJobFilters() {
  const [filters, setFilters] = useState<JobFilters>(initialFilters);

  const updateFilters = useCallback((updates: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}
