export type ApplicationStatus = 
  | "draft"
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "interview_scheduled"
  | "interview_completed"
  | "offer_pending"
  | "offer_extended"
  | "offer_accepted"
  | "offer_declined"
  | "rejected"
  | "withdrawn"
  | "accepted";

export interface Company {
  id: string;
  name: string;
  logo: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  job: Job;
  nextStep: string | null;
  nextStepDate: string | null;
  feedback: string | null;
}
