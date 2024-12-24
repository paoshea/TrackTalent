import { useState, useEffect } from "react";
import type { JobSearchOptions, JobSearchResult } from "../types/jobs";
import { supabase } from "../lib/supabase";

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
        let query = supabase.from("jobs").select("*", { count: "exact" });

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

        const { data, error, count } = await query;

        if (error) throw error;

        // Transform data to match JobSearchResult type
        const searchResults: JobSearchResult[] = data.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          description: job.description,
          requirements: job.requirements,
          responsibilities: job.responsibilities,
          skills: job.skills,
          compensation: {
            salary: {
              min: job.salary_min,
              max: job.salary_max,
              currency: job.salary_currency,
              period: job.salary_period,
            },
          },
          benefits: job.benefits,
          department: job.department,
          experience: job.experience,
          education: job.education,
          remote: {
            allowed: job.remote_allowed,
            type: job.remote_type,
          },
          status: job.status,
          applicationDeadline: job.application_deadline,
          createdAt: job.created_at,
          updatedAt: job.updated_at,
          score: job.search_score || 0,
          matchedSkills: job.matched_skills || [],
          matchedKeywords: job.matched_keywords || [],
        }));

        setResults(searchResults);
        if (count !== null) {
          setTotalCount(count);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
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
