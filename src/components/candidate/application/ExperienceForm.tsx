import React from "react";
import { Plus } from "lucide-react";
import { ExperienceCard } from "./experience/ExperienceCard";
import type { ApplicationData, Experience } from "../../../types/candidate";

interface ExperienceFormProps {
  data: Partial<ApplicationData>;
  onChange: (data: Partial<ApplicationData>) => void;
  errors: Record<string, string>;
}

export function ExperienceForm({
  data,
  onChange,
  errors,
}: ExperienceFormProps) {
  const experiences = data.experiences || [];

  const addExperience = () => {
    onChange({
      experiences: [
        ...experiences,
        {
          company: "",
          title: "",
          startDate: "",
          current: false,
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    onChange({
      experiences: experiences.filter((_, i) => i !== index),
    });
  };

  const updateExperience = (index: number, updates: Partial<Experience>) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      ...updates,
    };
    onChange({ experiences: updatedExperiences });
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <ExperienceCard
          key={index}
          index={index}
          canDelete={index > 0}
          onDelete={() => removeExperience(index)}
          experience={exp}
          onUpdate={(updates) => updateExperience(index, updates)}
          errors={errors}
          isFirst={index === 0}
        />
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
      >
        <Plus className="h-4 w-4 mr-1" aria-hidden="true" />
        Add Another Experience
      </button>
    </div>
  );
}
