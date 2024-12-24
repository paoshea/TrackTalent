import { Plus, X } from "lucide-react";
import { SkillRating } from "./skills/SkillRating";
import { FormField } from "../../shared/FormField";
import type { ApplicationData } from "../../../hooks/useApplicationSubmit";
import type { SkillRatingState } from "../../../types/skills";
import {
  formatSkillForSubmission,
  parseSkillFromString,
} from "../../../types/skills";

interface SkillsAssessmentProps {
  data: Partial<ApplicationData>;
  onChange: (data: Partial<ApplicationData>) => void;
  errors: Record<string, string>;
}

export function SkillsAssessment({
  data,
  onChange,
  errors,
}: SkillsAssessmentProps) {
  // Convert string[] to SkillRatingState[]
  const skillStates = (data.skills || []).map(parseSkillFromString);

  const addSkill = () => {
    onChange({
      skills: [
        ...(data.skills || []),
        formatSkillForSubmission({
          name: "",
          level: "beginner",
          yearsOfExperience: 0,
        }),
      ],
    });
  };

  const removeSkill = (index: number) => {
    onChange({
      skills: skillStates
        .filter((_: SkillRatingState, i: number) => i !== index)
        .map(formatSkillForSubmission),
    });
  };

  const updateSkill = (index: number, updates: Partial<SkillRatingState>) => {
    const updatedSkills = skillStates.map((skill, i) =>
      i === index ? { ...skill, ...updates } : skill,
    );
    onChange({
      skills: updatedSkills.map(formatSkillForSubmission),
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Rate your proficiency in the following skills from 1 (Beginner) to 5
        (Expert)
      </p>

      {skillStates.map((skill: SkillRatingState, index: number) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow mb-4">
          <div className="flex justify-between items-start mb-4">
            <FormField
              label="Skill Name"
              required
              error={errors[`skills.${index}.name`]}
              className="flex-1 mr-4"
            >
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, { name: e.target.value })}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormField>
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-gray-400 hover:text-gray-500"
              aria-label={`Remove ${skill.name || "skill"}`}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <SkillRating
              skill={skill}
              onChange={(level) => updateSkill(index, { level })}
            />

            <FormField
              label="Years of Experience"
              error={errors[`skills.${index}.yearsOfExperience`]}
            >
              <input
                type="number"
                min="0"
                step="0.5"
                value={skill.yearsOfExperience}
                onChange={(e) =>
                  updateSkill(index, {
                    yearsOfExperience: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormField>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
      >
        <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
        Add Skill
      </button>
    </div>
  );
}
