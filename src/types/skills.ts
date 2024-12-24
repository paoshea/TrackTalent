export interface Skill {
  id: string;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience?: number;
  endorsements?: number;
  description?: string;
  keywords?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  skills: Skill[];
  parentId?: string;
}

export interface SkillAssessment {
  skillId: string;
  userId: string;
  level: Skill["level"];
  score?: number;
  feedback?: string;
  assessedAt: string;
  assessedBy?: string;
  validUntil?: string;
}

export interface SkillEndorsement {
  skillId: string;
  userId: string;
  endorserId: string;
  relationship?: string;
  comment?: string;
  createdAt: string;
}

export interface SkillRequirement {
  skillId: string;
  level: Skill["level"];
  required: boolean;
  weight?: number;
  description?: string;
}
