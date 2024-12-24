import { useState } from "react";
import type { Skill, SkillCategory } from "../types/skills";

const mockFrontendSkills: Skill[] = [
  {
    id: "1",
    name: "React",
    level: "intermediate",
    yearsOfExperience: 2,
    endorsements: 4,
    category: "frontend",
  },
  {
    id: "2",
    name: "TypeScript",
    level: "intermediate",
    yearsOfExperience: 3,
    endorsements: 4,
    category: "frontend",
  },
  {
    id: "3",
    name: "CSS/Tailwind",
    level: "intermediate",
    yearsOfExperience: 2,
    endorsements: 4,
    category: "frontend",
  },
  {
    id: "4",
    name: "Testing",
    level: "intermediate",
    yearsOfExperience: 1,
    endorsements: 3,
    category: "frontend",
  },
];

const mockBackendSkills: Skill[] = [
  {
    id: "5",
    name: "Node.js",
    level: "intermediate",
    yearsOfExperience: 2,
    endorsements: 4,
    category: "backend",
  },
  {
    id: "6",
    name: "Databases",
    level: "intermediate",
    yearsOfExperience: 2,
    endorsements: 3,
    category: "backend",
  },
  {
    id: "7",
    name: "API Design",
    level: "intermediate",
    yearsOfExperience: 3,
    endorsements: 4,
    category: "backend",
  },
  {
    id: "8",
    name: "Security",
    level: "intermediate",
    yearsOfExperience: 1,
    endorsements: 3,
    category: "backend",
  },
];

const initialCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    skills: mockFrontendSkills,
    description: "Frontend development skills",
  },
  {
    id: "backend",
    name: "Backend Development",
    skills: mockBackendSkills,
    description: "Backend development skills",
  },
];

export function useSkillAssessment(_userId: string) {
  const [categories, setCategories] =
    useState<SkillCategory[]>(initialCategories);
  const [error, setError] = useState<string | null>(null);

  const updateSkillLevel = (
    categoryId: string,
    skillId: string,
    level: Skill["level"],
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              skills: category.skills.map((skill: Skill) =>
                skill.id === skillId ? { ...skill, level } : skill,
              ),
            }
          : category,
      ),
    );
  };

  const addSkill = async (
    categoryId: string,
    skill: Omit<Skill, "id">,
  ) => {
    try {
      // In a real app, this would make an API call
      const newSkill: Skill = {
        ...skill,
        id: Math.random().toString(36).substr(2, 9),
        category: categoryId,
        endorsements: 0,
      };

      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: [...category.skills, newSkill],
              }
            : category,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add skill");
    }
  };

  const removeSkill = async (categoryId: string, skillId: string) => {
    try {
      // In a real app, this would make an API call
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: category.skills.filter((skill: Skill) => skill.id !== skillId),
              }
            : category,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove skill");
    }
  };

  return {
    categories,
    error,
    updateSkillLevel,
    addSkill,
    removeSkill,
  };
}
