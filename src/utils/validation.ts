import type { ApplicationData } from "../types/applications";

export function validatePersonalInfo(
  data: ApplicationData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.resume) {
    errors.resume = "Resume is required";
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
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
  }>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  education?.forEach((edu, index) => {
    if (!edu.school) {
      errors[`education.${index}.school`] = "School name is required";
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

export function validateSkillAssessment(
  skills: Array<{
    name: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
    yearsOfExperience?: number;
  }>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  skills?.forEach((skill, index) => {
    if (!skill.name) {
      errors[`skills.${index}.name`] = "Skill name is required";
    }
    if (!skill.level) {
      errors[`skills.${index}.level`] = "Proficiency level is required";
    }
    if (skill.yearsOfExperience && skill.yearsOfExperience < 0) {
      errors[`skills.${index}.yearsOfExperience`] =
        "Years of experience must be positive";
    }
  });

  return errors;
}

export function validateCertifications(
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
  }>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  certifications?.forEach((cert, index) => {
    if (!cert.name) {
      errors[`certifications.${index}.name`] = "Certification name is required";
    }
    if (!cert.issuer) {
      errors[`certifications.${index}.issuer`] =
        "Issuing organization is required";
    }
    if (!cert.issueDate) {
      errors[`certifications.${index}.issueDate`] = "Issue date is required";
    }
  });

  return errors;
}

export function validateAllSections(
  data: ApplicationData,
): Record<string, string> {
  return {
    ...validatePersonalInfo(data),
    ...validateExperience(data.experiences || []),
    ...validateEducation(data.education || []),
    ...validateSkillAssessment(data.skills || []),
    ...validateCertifications(data.certifications || []),
  };
}
