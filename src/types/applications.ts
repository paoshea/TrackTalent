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
  location: string;
  company: Company;
}

export interface TimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ApplicationMetadata {
  resume_url?: string;
  cover_letter?: string;
  timeline?: TimelineEvent[];
  answers?: Record<string, string>;
  skills?: string[];
  experience?: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  references?: Array<{
    name: string;
    title: string;
    company: string;
    email: string;
    phone?: string;
  }>;
  [key: string]: unknown;
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
  metadata?: ApplicationMetadata;
}

export interface ApplicationData {
  coverLetter: string;
  resume?: File;
  resumeUrl?: string;
  answers: Record<string, string>;
  skills: string[];
  experience: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  references?: Array<{
    name: string;
    title: string;
    company: string;
    email: string;
    phone?: string;
  }>;
}
