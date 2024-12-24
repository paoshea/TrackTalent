import { Plus, X } from "lucide-react";
import { SkillRating } from "./skills/SkillRating";
import { FormField } from "../../shared/FormField";
import type { ApplicationData, Skill } from "../../../types/candidate";

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
  const skills = data.skills || [];

  const addSkill = () => {
    onChange({
      skills: [
        ...skills,
        {
          name: "",
          rating: 1,
          yearsOfExperience: 0,
        },
      ],
    });
  };

  const removeSkill = (index: number) => {
    onChange({
      skills: skills.filter((_, i) => i !== index),
    });
  };

  const updateSkill = (index: number, updates: Partial<Skill>) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      ...updates,
    };
    onChange({ skills: updatedSkills });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Rate your proficiency in the following skills from 1 (Beginner) to 5
        (Expert)
      </p>

      {skills.map((skill, index) => (
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
              onChange={(rating) => updateSkill(index, { rating })}
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
