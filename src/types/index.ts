export type UserRole =
  | "admin"
  | "beginner"
  | "competitor"
  | "seasoned"
  | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Metrics {
  activeJobs: number;
  totalCandidates: number;
  placementRate: number;
  averageTimeToHire: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  experienceLevel: "entry" | "mid" | "senior" | "executive";
  location: string;
  salary?: string;
  postedDate: string;
  status: "open" | "closed" | "draft";
}
