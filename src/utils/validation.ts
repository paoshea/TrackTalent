import type { ApplicationData } from "../types/applications";

export function validatePersonalInfo(
  data: ApplicationData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.coverLetter) {
    errors.coverLetter = "Cover letter is required";
  }

  if (!data.resume) {
    errors.resume = "Resume is required";
  }

  if (!data.answers || Object.keys(data.answers).length === 0) {
    errors.answers = "Application answers are required";
  }

  if (!data.skills || data.skills.length === 0) {
    errors.skills = "At least one skill is required";
  }

  if (!data.experience || data.experience.length === 0) {
    errors.experience = "At least one experience entry is required";
  }

  if (!data.education || data.education.length === 0) {
    errors.education = "At least one education entry is required";
  }

  return errors;
}

export function validateExperience(
  experiences: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  experiences?.forEach((exp, index) => {
    if (!exp.title) {
      errors[`experiences.${index}.title`] = "Job title is required";
    }
    if (!exp.company) {
      errors[`experiences.${index}.company`] = "Company name is required";
    }
    if (!exp.startDate) {
      errors[`experiences.${index}.startDate`] = "Start date is required";
    }
    if (!exp.current && !exp.endDate) {
      errors[`experiences.${index}.endDate`] =
        "End date is required for past positions";
    }
    if (!exp.description) {
      errors[`experiences.${index}.description`] = "Description is required";
    }
  });

  return errors;
}

export function validateEducation(
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  education?.forEach((edu, index) => {
    if (!edu.institution) {
      errors[`education.${index}.institution`] = "Institution name is required";
    }
    if (!edu.degree) {
      errors[`education.${index}.degree`] = "Degree is required";
    }
    if (!edu.field) {
      errors[`education.${index}.field`] = "Field of study is required";
    }
    if (!edu.startDate) {
      errors[`education.${index}.startDate`] = "Start date is required";
    }
    if (!edu.current && !edu.endDate) {
      errors[`education.${index}.endDate`] =
        "End date is required for completed education";
    }
  });

  return errors;
}

export function validateSkills(
  skills: string[],
): Record<string, string> {
  const errors: Record<string, string> = {};

  skills?.forEach((skill, index) => {
    if (!skill || !skill.trim()) {
      errors[`skills.${index}`] = "Skill name is required";
    }
  });

  return errors;
}

export function validateAllSections(
  data: ApplicationData,
): Record<string, string> {
  return {
    ...validatePersonalInfo(data),
    ...validateExperience(data.experience || []),
    ...validateEducation(data.education || []),
    ...validateSkills(data.skills || [])
  };
}
