import { PlusCircle as Plus } from "lucide-react";
import type { Experience } from "../../../types/candidate";
import type { ApplicationData } from "../../../hooks/useApplicationSubmit";
import { ExperienceCard } from "../../../components/candidate/application/ExperienceCard";

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
  const experiences = data.experience?.relevantAreas || [];

  const addExperience = () => {
    const currentExperience = data.experience || {
      years: 0,
      relevantAreas: [],
      highlights: []
    };
    
    onChange({
      experience: {
        ...currentExperience,
        relevantAreas: [
          ...currentExperience.relevantAreas,
          {
            id: crypto.randomUUID(),
            company: "",
            position: "",
            startDate: "",
            current: false,
            description: "",
            skills: [],
            achievements: []
          },
        ],
      },
    });
  };

  const removeExperience = (index: number) => {
    const currentExperience = data.experience || {
      years: 0,
      relevantAreas: [],
      highlights: []
    };

    onChange({
      experience: {
        ...currentExperience,
        relevantAreas: currentExperience.relevantAreas.filter((_: Experience, i: number) => i !== index),
      },
    });
  };

  const updateExperience = (
    index: number,
    updates: Partial<Experience>
  ) => {
    const currentExperience = data.experience || {
      years: 0,
      relevantAreas: [],
      highlights: []
    };

    const updatedAreas = [...currentExperience.relevantAreas];
    updatedAreas[index] = {
      ...updatedAreas[index],
      ...updates,
    };

    onChange({
      experience: {
        ...currentExperience,
        relevantAreas: updatedAreas,
      },
    });
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp: Experience, index: number) => (
        <ExperienceCard
          key={index}
          index={index}
          canDelete={index > 0}
          onDelete={() => removeExperience(index)}
          experience={exp}
          onUpdate={(updates: Partial<Experience>) => updateExperience(index, updates)}
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
