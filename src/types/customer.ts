export interface CustomerJob {
  id: string;
  title: string;
  applicants: number;
  postedDate: string;
  status: "active" | "paused" | "closed";
}

export interface JobFormData {
  title: string;
  department: string;
  location: "remote" | "hybrid" | "onsite";
  requirements: string[];
  salaryFrom: number;
  salaryTo: number;
  benefits: string;
}
