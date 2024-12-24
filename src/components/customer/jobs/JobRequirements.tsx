import { useState } from "react";
import { X, Plus } from "lucide-react";
import type { JobFormData } from "../../../types/jobs";

interface JobRequirementsProps {
  data: Pick<JobFormData, "requirements" | "skills" | "experienceLevel">;
  onChange: <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => void;
  errors: Record<string, string>;
}

const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "executive", label: "Executive" },
] as const;

export function JobRequirements({
  data,
  onChange,
  errors,
}: JobRequirementsProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onChange("skills", [...data.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    onChange(
      "skills",
      data.skills.filter((_, i) => i !== index),
    );
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      onChange("requirements", [...data.requirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    onChange(
      "requirements",
      data.requirements.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Requirements</h3>
        <p className="mt-1 text-sm text-gray-500">
          Define the requirements for this position
        </p>
      </div>

      <div>
        <label
          htmlFor="experienceLevel"
          className="block text-sm font-medium text-gray-700"
        >
          Experience Level
        </label>
        <div className="mt-1">
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={data.experienceLevel}
            onChange={(e) =>
              onChange(
                "experienceLevel",
                e.target.value as JobFormData["experienceLevel"],
              )
            }
            className={`
              block w-full rounded-md shadow-sm sm:text-sm
              ${
                errors.experienceLevel
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              }
            `}
          >
            {experienceLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.experienceLevel && (
            <p className="mt-2 text-sm text-red-600">
              {errors.experienceLevel}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddRequirement()}
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add a requirement..."
            />
            <button
              type="button"
              onClick={handleAddRequirement}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.requirements.map((requirement, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {requirement}
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          {errors.requirements && (
            <p className="mt-2 text-sm text-red-600">{errors.requirements}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Required Skills
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
              className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Add a skill..."
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-1 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          {errors.skills && (
            <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
          )}
        </div>
      </div>
    </div>
  );
}
