import type { ApplicationData } from "../types/applications";
import type { ValidationRule } from "../types/form";

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  current?: boolean;
}

interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  rating?: number;
  description?: string;
}

export function validateApplicationData(
  data: ApplicationData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.jobId) {
    errors.jobId = "Job ID is required";
  }

  if (!data.resume) {
    errors.resume = "Resume is required";
  }

  return errors;
}

export function validateExperience(experiences: Experience[]): boolean {
  if (!Array.isArray(experiences) || experiences.length === 0) {
    return false;
  }

  return experiences.every((exp) => {
    return exp.title && exp.company && exp.startDate && exp.description;
  });
}

export function validateSkills(skills: Skill[]): boolean {
  if (!Array.isArray(skills) || skills.length === 0) {
    return false;
  }

  return skills.every((skill) => {
    return (
      skill.name &&
      skill.level &&
      ["beginner", "intermediate", "advanced", "expert"].includes(skill.level)
    );
  });
}

export function validateRules<T>(
  value: unknown,
  rules: ValidationRule<T>[],
  formData: T,
): string[] {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case "required":
        if (!value) {
          errors.push(rule.message);
        }
        break;

      case "minLength":
        if (typeof value === "string" && value.length < rule.value) {
          errors.push(rule.message);
        }
        break;

      case "maxLength":
        if (typeof value === "string" && value.length > rule.value) {
          errors.push(rule.message);
        }
        break;

      case "pattern":
        if (typeof value === "string" && !new RegExp(rule.value).test(value)) {
          errors.push(rule.message);
        }
        break;

      case "custom":
        if (!rule.validate(value, formData)) {
          errors.push(rule.message);
        }
        break;
    }
  }

  return errors;
}
