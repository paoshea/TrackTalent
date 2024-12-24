// import React from "react";
import { X } from "lucide-react";
import { FormField } from "../../../shared/FormField";
import type { Experience } from "../../../../types/candidate";

interface ExperienceCardProps {
  index: number;
  canDelete: boolean;
  onDelete: () => void;
  experience: Experience;
  onUpdate: (updates: Partial<Experience>) => void;
  errors: Record<string, string>;
  isFirst: boolean;
}

export function ExperienceCard({
  index,
  canDelete,
  onDelete,
  experience,
  onUpdate,
  errors,
  isFirst,
}: ExperienceCardProps) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow"
      role="group"
      aria-labelledby={`experience-${index}-title`}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 id={`experience-${index}-title`} className="text-lg font-medium">
          {isFirst ? "Most Recent Experience" : `Previous Experience ${index}`}
        </h4>
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Remove experience</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Company"
          required
          error={errors[`experiences.${index}.company`]}
        >
          <input
            type="text"
            value={experience.company}
            onChange={(e) => onUpdate({ company: e.target.value })}
            required
            aria-describedby={
              errors[`experiences.${index}.company`]
                ? `company-error-${index}`
                : undefined
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Position"
          required
          error={errors[`experiences.${index}.position`]}
        >
          <input
            type="text"
            value={experience.position}
            onChange={(e) => onUpdate({ position: e.target.value })}
            required
            aria-describedby={
              errors[`experiences.${index}.position`]
                ? `position-error-${index}`
                : undefined
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Start Date"
          required
          error={errors[`experiences.${index}.startDate`]}
        >
          <input
            type="date"
            value={experience.startDate}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
            required
            aria-describedby={
              errors[`experiences.${index}.startDate`]
                ? `startDate-error-${index}`
                : undefined
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="End Date"
          error={errors[`experiences.${index}.endDate`]}
        >
          <input
            type="date"
            value={experience.endDate || ""}
            onChange={(e) => {
              const endDate = e.target.value || undefined;
              onUpdate({
                endDate,
                current: !endDate,
              });
            }}
            min={experience.startDate}
            aria-describedby={
              errors[`experiences.${index}.endDate`]
                ? `endDate-error-${index}`
                : undefined
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <FormField
        label="Description"
        error={errors[`experiences.${index}.description`]}
      >
        <textarea
          value={experience.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          maxLength={1000}
          rows={4}
          aria-describedby={
            errors[`experiences.${index}.description`]
              ? `description-error-${index}`
              : undefined
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </FormField>
    </div>
  );
}
