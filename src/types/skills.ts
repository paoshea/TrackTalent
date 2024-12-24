export interface SkillRatingState {
  name: string;
  rating: number;
  yearsOfExperience: number;
}

export const skillLevels = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

export function formatSkillForSubmission(skill: SkillRatingState): string {
  const level = skillLevels[skill.rating - 1];
  return `${skill.name} (${level}, ${skill.yearsOfExperience} years)`;
}

export function parseSkillFromString(skillString: string): SkillRatingState {
  const match = skillString.match(/^(.+) \((\w+), (\d+(?:\.\d+)?) years\)$/);
  if (!match) {
    return {
      name: skillString,
      rating: 1,
      yearsOfExperience: 0
    };
  }

  const [, name, level, years] = match;
  const rating = skillLevels.indexOf(level) + 1;

  return {
    name,
    rating: rating > 0 ? rating : 1,
    yearsOfExperience: parseFloat(years)
  };
}
