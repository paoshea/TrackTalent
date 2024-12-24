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

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  endorsements: number;
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
