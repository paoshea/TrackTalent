import { useState, useEffect } from "react";
import type { Job } from "../types";

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    description: "Looking for an experienced frontend developer...",
    requirements: ["5+ years React", "TypeScript", "Testing"],
    experienceLevel: "senior",
    location: "Remote",
    salary: "$120k - $150k",
    postedDate: "2024-03-15",
    status: "open",
  },
  {
    id: "2",
    title: "Junior Backend Developer",
    company: "StartupX",
    description: "Great opportunity for a junior developer...",
    requirements: ["Node.js", "Express", "MongoDB"],
    experienceLevel: "entry",
    location: "New York, NY",
    postedDate: "2024-03-14",
    status: "open",
  },
];

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { jobs, isLoading };
}
