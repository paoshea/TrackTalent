import type { Job } from "../types";

export function filterJobs(
  jobs: Job[],
  filters: {
    query: string;
    experienceLevel: string;
    location: string;
    jobType: string;
  },
): Job[] {
  return jobs.filter((job) => {
    const matchesQuery =
      !filters.query ||
      job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.query.toLowerCase());

    const matchesExperience =
      !filters.experienceLevel ||
      job.experienceLevel === filters.experienceLevel;

    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesQuery && matchesExperience && matchesLocation;
  });
}
