export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  portfolio?: string;
  bio?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: number;
  achievements: string[];
}

export type ApplicationFormStep = 
  | "personal-info"
  | "experience"
  | "skills"
  | "questions"
  | "review";

export interface ApplicationData {
  jobId: string;
  personalInfo: PersonalInfo;
  coverLetter: string;
  resumeUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  references?: {
    name: string;
    position: string;
    company: string;
    email: string;
    phone?: string;
    relationship: string;
  }[];
  additionalInfo?: string;
  availability?: {
    startDate: string;
    noticePeriod?: string;
    preferredSchedule?: string[];
  };
  expectedSalary?: {
    amount: number;
    currency: string;
    frequency: "yearly" | "monthly" | "hourly";
  };
  questions?: Record<string, string>;
  skills: Skill[];
  experience?: {
    years: number;
    relevantAreas: Experience[];
    highlights: string[];
  };
  education?: {
    level: string;
    field: string;
    institution: string;
    graduationYear: number;
    gpa?: number;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }[];
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  endorsements: number;
  rating: number; // 1-5 rating for skill assessment
}

export interface CandidateProfile {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: {
    name: string;
    level: "basic" | "conversational" | "fluent" | "native";
  }[];
  certifications: {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }[];
  preferences: {
    jobTypes: ("full-time" | "part-time" | "contract" | "internship")[];
    locations: string[];
    remoteWork: boolean;
    salaryExpectation?: {
      min: number;
      max: number;
      currency: string;
    };
    industries?: string[];
  };
  createdAt: string;
  updatedAt: string;
}
