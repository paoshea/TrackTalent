import type { Skill } from "../../../../types/candidate";

interface SkillRatingProps {
  skill: Skill;
  onChange: (rating: number) => void;
}

export function SkillRating({ skill, onChange }: SkillRatingProps) {
  const ratings = ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"];
  const ratingId = `skill-rating-${skill.name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor={ratingId} className="text-sm font-medium text-gray-700">
          {skill.name}
        </label>
        <span className="text-sm text-gray-500" aria-live="polite">
          {ratings[skill.rating - 1]}
        </span>
      </div>
      <input
        id={ratingId}
        type="range"
        min="1"
        max="5"
        value={skill.rating}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={skill.rating}
        aria-valuetext={ratings[skill.rating - 1]}
      />
    </div>
  );
}
