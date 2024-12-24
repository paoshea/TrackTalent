export const skillLevels = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;
export type SkillLevel = (typeof skillLevels)[number];

export interface SkillRatingState {
  name: string;
  level: SkillLevel;
  yearsOfExperience?: number;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
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

export function formatSkillForSubmission(skill: SkillRatingState): string {
  return `${skill.name}|${skill.level}|${skill.yearsOfExperience || 0}`;
}

export function parseSkillFromString(skillStr: string): SkillRatingState {
  const [name = "", level = "beginner", yearsStr = "0"] = skillStr.split("|");
  const years = parseInt(yearsStr, 10);

  return {
    name: name.trim(),
    level: (level.trim() || "beginner") as SkillLevel,
    yearsOfExperience: isNaN(years) ? 0 : years,
  };
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
