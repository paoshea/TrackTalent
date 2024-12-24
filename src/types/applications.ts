import type { JobFormData } from "./jobs";

export type ApplicationEventType =
  | "application_created"
  | "status_updated"
  | "interview_scheduled"
  | "interview_completed"
  | "offer_extended"
  | "offer_accepted"
  | "offer_declined"
  | "application_withdrawn"
  | "note_added"
  | "document_uploaded";

export interface ApplicationEvent {
  id: string;
  type: ApplicationEventType;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

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

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  candidateId: string;
  status: ApplicationStatus;
  resume: {
    url: string;
    name: string;
    uploadedAt: string;
  };
  coverLetter?: string;
  answers?: Record<string, string>;
  screeningResults?: {
    score: number;
    feedback: string;
    passedAt?: string;
  };
  interviews?: Array<{
    id: string;
    scheduledAt: string;
    duration: number;
    type: "phone" | "video" | "onsite";
    interviewers: string[];
    feedback?: {
      rating: number;
      comments: string;
      strengths: string[];
      weaknesses: string[];
    };
  }>;
  timeline?: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
  }>;
  offer?: {
    salary: {
      amount: number;
      currency: string;
      period: "hour" | "month" | "year";
    };
    startDate: string;
    benefits: string[];
    expiresAt: string;
    acceptedAt?: string;
    declinedAt?: string;
  };
  metadata?: {
    source?: string;
    referredBy?: string;
    customFields?: Record<string, string | number | boolean | null>;
  };
  notes?: string[];
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  linkedIn?: string;
  portfolio?: string;
  summary?: string;
}

export interface ApplicationData {
  personalInfo?: PersonalInfo;
  jobId: string;
  resume: File;
  coverLetter?: string;
  answers?: Record<string, string>;
  source?: string;
  referral?: {
    name: string;
    email: string;
    relationship: string;
  };
  experiences?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }>;
  skills?: Array<{
    name: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
    yearsOfExperience?: number;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
}

export interface ApplicationFilter {
  status?: ApplicationStatus[];
  jobType?: JobFormData["type"][];
  dateRange?: {
    start: string;
    end: string;
  };
  source?: string[];
}

export interface ApplicationStats {
  total: number;
  byStatus: Record<ApplicationStatus, number>;
  averageTimeToHire: number;
  offerAcceptanceRate: number;
  sourceEffectiveness: Record<
    string,
    {
      applications: number;
      hires: number;
      conversionRate: number;
    }
  >;
}

export interface ApplicationUpdate {
  status?: ApplicationStatus;
  screeningResults?: Application["screeningResults"];
  interviews?: Application["interviews"];
  offer?: Application["offer"];
  notes?: string[];
  metadata?: Application["metadata"];
}
