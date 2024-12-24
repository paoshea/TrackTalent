import type {
  ApplicationData,
  ApplicationFormStep,
  Experience,
  Skill,
} from "../types/candidate";

export function getStepProgress(
  step: ApplicationFormStep,
  data: Partial<ApplicationData>,
): number {
  switch (step) {
    case "personal-info": {
      if (!data.personalInfo) return 0;
      const requiredFields = ["firstName", "lastName", "email"];
      const completedFields = requiredFields.filter(
        (field) => data.personalInfo?.[field as keyof typeof data.personalInfo],
      );
      return (completedFields.length / requiredFields.length) * 100;
    }

    case "experience": {
      if (!data.experience?.relevantAreas.length) return 0;
      const requiredExpFields = [
        "position",
        "company",
        "startDate",
        "description",
      ];
      const completedExp = data.experience.relevantAreas.filter(
        (exp: Experience) =>
          requiredExpFields.every((field) => exp[field as keyof typeof exp]),
      );
      return (completedExp.length / data.experience.relevantAreas.length) * 100;
    }

    case "skills": {
      if (!data.skills?.length) return 0;
      const validSkills = data.skills.filter(
        (skill: Skill) =>
          skill.name && skill.level && skill.rating >= 1 && skill.rating <= 5,
      );
      return (validSkills.length / data.skills.length) * 100;
    }

    case "questions": {
      if (!data.questions || !Object.keys(data.questions).length) return 0;
      const answeredQuestions = Object.values(data.questions).filter(Boolean);
      return (
        (answeredQuestions.length / Object.keys(data.questions).length) * 100
      );
    }

    case "review": {
      const steps: ApplicationFormStep[] = [
        "personal-info",
        "experience",
        "skills",
        "questions",
      ];
      const totalProgress = steps
        .map((s) => getStepProgress(s, data))
        .reduce((sum, progress) => sum + progress, 0);
      return totalProgress / steps.length;
    }

    default:
      return 0;
  }
}
