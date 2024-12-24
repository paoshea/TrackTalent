import { useState } from "react";
import { useFormValidation, type ValidationRule } from "../../../hooks/useFormValidation";
import type { JobFormData } from "../../../types/jobs";
import { JobBasicInfo } from "./JobBasicInfo";
import { JobRequirements } from "./JobRequirements";
import { JobCompensation as JobCompensationComponent } from "./JobCompensation";

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const validationRules = {
  title: {
    required: true,
    validate: (value: string) => {
      if (value.length < 3) return "Title must be at least 3 characters";
      if (value.length > 100) return "Title must be less than 100 characters";
      return "";
    },
  } as ValidationRule<string, JobFormData>,

  description: {
    required: true,
    validate: (value: string) => {
      if (value.length < 50) return "Description must be at least 50 characters";
      if (value.length > 5000) return "Description must be less than 5000 characters";
      return "";
    },
  } as ValidationRule<string, JobFormData>,

  department: {
    required: true,
    validate: (value: string) => {
      return !value ? "Department is required" : "";
    },
  } as ValidationRule<string, JobFormData>,

  location: {
    required: true,
    validate: (value: string) => {
      return !value ? "Location is required" : "";
    },
  } as ValidationRule<string, JobFormData>,

  type: {
    required: true,
    validate: (value: JobFormData["type"]) => {
      return !value ? "Job type is required" : "";
    },
  } as ValidationRule<JobFormData["type"], JobFormData>,

  requirements: {
    required: true,
    validate: (value: string[]) => {
      return value.length === 0 ? "At least one requirement is required" : "";
    },
  } as ValidationRule<string[], JobFormData>,

  skills: {
    required: true,
    validate: (value: string[]) => {
      return value.length === 0 ? "At least one skill is required" : "";
    },
  } as ValidationRule<string[], JobFormData>,

  experienceLevel: {
    required: true,
    validate: (value: JobFormData["experienceLevel"]) => {
      return !value ? "Experience level is required" : "";
    },
  } as ValidationRule<JobFormData["experienceLevel"], JobFormData>,


  "compensation.salary.min": {
    required: true,
    validate: (value: number) => {
      return value <= 0 ? "Minimum salary must be greater than 0" : "";
    },
  } as ValidationRule<number, JobFormData>,

  "compensation.salary.max": {
    required: true,
    validate: (value: number, data?: JobFormData) => {
      if (value <= 0) return "Maximum salary must be greater than 0";
      if (data?.compensation.salary.min && value < data.compensation.salary.min) {
        return "Maximum salary must be greater than minimum";
      }
      return "";
    },
  } as ValidationRule<number, JobFormData>,

  "compensation.salary.currency": {
    required: true,
    validate: (value: string) => {
      return !value ? "Currency is required" : "";
    },
  } as ValidationRule<string, JobFormData>,

  "compensation.salary.period": {
    required: true,
    validate: (value: string) => {
      return !value ? "Salary period is required" : "";
    },
  } as ValidationRule<string, JobFormData>,

  benefits: {
    required: false,
    validate: (_value: string[]) => "",
  } as ValidationRule<string[], JobFormData>,


  "remote.allowed": {
    required: true,
    validate: (value: boolean) => {
      return typeof value !== 'boolean' ? "Remote work preference must be specified" : "";
    },
  } as ValidationRule<boolean, JobFormData>,
};

export function JobForm({ initialData, onSubmit, isSubmitting }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    department: initialData?.department || "",
    location: initialData?.location || "",
    type: initialData?.type || "full-time",
    requirements: initialData?.requirements || [],
    skills: initialData?.skills || [],
    compensation: initialData?.compensation || {
      salary: {
        min: 0,
        max: 0,
        currency: "USD",
        period: "yearly",
      },
    },
    benefits: initialData?.benefits || [],
    experienceLevel: initialData?.experienceLevel || "mid",
    remote: initialData?.remote || {
      allowed: false,
    },
  });

  const { errors, validateField, validateForm } = useFormValidation<JobFormData>(validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(formData);
  };

  const handleFieldChange = <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <JobBasicInfo
        data={formData}
        onChange={handleFieldChange}
        errors={errors as Record<string, string>}
      />

      <JobRequirements
        data={formData}
        onChange={handleFieldChange}
        errors={errors as Record<string, string>}
      />

      <JobCompensationComponent
        data={formData}
        onChange={handleFieldChange}
        errors={errors as Record<string, string>}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Job"}
        </button>
      </div>
    </form>
  );
}
