export interface Skill {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  rating: number;
  endorsements?: number;
  verified?: boolean;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  lastUsed?: string;
  yearsOfExperience?: number;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    url?: string;
  }>;
  certifications?: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    url?: string;
  }>;
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
  order?: number;
  icon?: string;
}

export interface SkillAssessment {
  id: string;
  skillId: string;
  userId: string;
  score: number;
  completedAt: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
    correct: boolean;
  }>;
  timeSpent: number;
  passThreshold: number;
  passed: boolean;
}

export interface SkillEndorsement {
  id: string;
  skillId: string;
  endorserId: string;
  endorseeId: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  comment?: string;
  createdAt: string;
}

export interface SkillAssessmentProps {
  userId: string;
  categoryId?: string;
  onComplete?: (results: SkillAssessment) => void;
}

export interface SkillSummaryProps {
  categories: SkillCategory[];
  onSkillClick?: (skill: Skill) => void;
  showEndorsements?: boolean;
}

export interface UseSkillsResult {
  skills: Skill[];
  categories: SkillCategory[];
  isLoading: boolean;
  error: string | null;
  addSkill: (skill: Omit<Skill, "id">) => Promise<void>;
  updateSkill: (id: string, updates: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  endorseSkill: (
    skillId: string,
    level: SkillEndorsement["level"],
    comment?: string,
  ) => Promise<void>;
}
