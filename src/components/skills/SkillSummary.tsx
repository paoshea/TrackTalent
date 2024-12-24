import { useMemo } from "react";
import { SkillRating } from "./SkillRating";

interface Skill {
  id: string;
  name: string;
  rating: number;
  categoryId: string;
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

interface SkillSummaryProps {
  categories: SkillCategory[];
  maxSkills?: number;
  showCategories?: boolean;
  className?: string;
}

export function SkillSummary({
  categories,
  maxSkills = 6,
  showCategories = true,
  className = "",
}: SkillSummaryProps) {
  const topSkills = useMemo(() => {
    const allSkills = categories.flatMap((category) =>
      category.skills.map((skill) => ({
        ...skill,
        categoryName: category.name,
      })),
    );

    return allSkills.sort((a, b) => b.rating - a.rating).slice(0, maxSkills);
  }, [categories, maxSkills]);

  if (categories.length === 0) {
    return <div className="text-sm text-gray-500">No skills added yet.</div>;
  }

  if (showCategories) {
    return (
      <div className={className}>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id}>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                {category.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{skill.name}</span>
                    <SkillRating value={skill.rating} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topSkills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-600">{skill.name}</span>
              <span className="text-xs text-gray-400 block">
                {skill.categoryName}
              </span>
            </div>
            <SkillRating value={skill.rating} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
