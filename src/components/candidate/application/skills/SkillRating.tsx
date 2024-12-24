import { skillLevels } from "../../../../types/skills";
import type { SkillLevel, SkillRatingState } from "../../../../types/skills";

interface SkillRatingProps {
  skill: SkillRatingState;
  onChange: (level: SkillLevel) => void;
}

export function SkillRating({ skill, onChange }: SkillRatingProps) {
  const ratingId = `skill-rating-${skill.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={ratingId} className="text-sm font-medium text-gray-700">
          {skill.name}
        </label>
        <span className="text-sm text-gray-500" aria-live="polite">
          {skill.level}
        </span>
      </div>
      <input
        id={ratingId}
        type="range"
        min="1"
        max="5"
        value={skillLevels.indexOf(skill.level) + 1}
        onChange={(e) => {
          const index = parseInt(e.target.value, 10) - 1;
          onChange(skillLevels[index]);
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={skillLevels.indexOf(skill.level) + 1}
        aria-valuetext={skill.level}
      />
    </div>
  );
}
