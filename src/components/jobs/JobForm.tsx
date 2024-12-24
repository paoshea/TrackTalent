import React from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { FormField } from "../shared/FormField";
import type { JobFormData } from "../../types/jobs";

interface Props {
  onSubmit: (data: JobFormData) => Promise<void>;
  initialData?: Partial<JobFormData>;
  isSubmitting?: boolean;
}

export function JobForm({ onSubmit, initialData, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JobFormData>({
    defaultValues: initialData,
  });

  const requirements = watch("requirements", []);
  const skills = watch("skills", []);

  const addRequirement = () => {
    setValue("requirements", [...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    setValue(
      "requirements",
      requirements.filter((_, i) => i !== index),
    );
  };

  const addSkill = () => {
    setValue("skills", [...skills, ""]);
  };

  const removeSkill = (index: number) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Job Title" error={errors.title?.message} required>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </FormField>

          <FormField label="Location" error={errors.location?.message} required>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </FormField>

          <FormField label="Job Type" error={errors.type?.message} required>
            <select
              {...register("type", { required: "Job type is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </FormField>

          <FormField
            label="Experience Level"
            error={errors.experience_level?.message}
            required
          >
            <select
              {...register("experience_level", {
                required: "Experience level is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </FormField>
        </div>

        <div className="mt-6">
          <FormField
            label="Description"
            error={errors.description?.message}
            required
          >
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </FormField>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Requirements</h3>

        <div className="space-y-4">
          {requirements.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                {...register(`requirements.${index}`)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addRequirement}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Requirement
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Skills</h3>

        <div className="space-y-4">
          {skills.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                {...register(`skills.${index}`)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSkill}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Skill
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Job"}
        </button>
      </div>
    </form>
  );
}
