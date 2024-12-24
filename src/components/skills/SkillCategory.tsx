import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SkillRating } from "./SkillRating";

interface Skill {
  id: string;
  name: string;
  rating: number;
  description?: string;
}

interface SkillCategoryProps {
  name: string;
  skills: Skill[];
  onRatingChange?: (skillId: string, rating: number) => void;
  isEditable?: boolean;
  defaultExpanded?: boolean;
  className?: string;
}

export function SkillCategory({
  name,
  skills,
  onRatingChange,
  isEditable = false,
  defaultExpanded = false,
  className = "",
}: SkillCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`border rounded-lg shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t">
          <ul className="divide-y divide-gray-200" role="list">
            {skills.map((skill) => (
              <li key={skill.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {skill.name}
                    </h4>
                    {skill.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {skill.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    <SkillRating
                      value={skill.rating}
                      onChange={
                        isEditable && onRatingChange
                          ? (rating) => onRatingChange(skill.id, rating)
                          : undefined
                      }
                      disabled={!isEditable}
                      size="sm"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
