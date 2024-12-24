import { useState } from "react";
import { useJobForm } from "../../../hooks/useJobForm";
import { useJobPreferencesValidation } from "../../../hooks/useJobPreferencesValidation";
import type { JobFormData } from "../../../types/jobs";
import { JobBasicInfo } from "./JobBasicInfo";
import { JobRequirements } from "./JobRequirements";
import { JobCompensation as JobCompensationComponent } from "./JobCompensation";

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => Promise<void>;
  isSubmitting?: boolean;
}

// Type for simple fields (no nesting)
type SimpleFields = Pick<
  JobFormData,
  | "title"
  | "description"
  | "department"
  | "location"
  | "type"
  | "requirements"
  | "skills"
  | "benefits"
  | "experienceLevel"
>;

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

  const {
    errors: simpleErrors,
    validateField: validateSimpleField,
    validateForm: validateSimpleForm,
  } = useJobForm();

  const {
    errors: nestedErrors,
    validateField: validateNestedField,
    validateForm: validateNestedForm,
  } = useJobPreferencesValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const simpleValidationErrors = validateSimpleForm(formData);
    const nestedValidationErrors = validateNestedForm({
      compensation: formData.compensation,
      remote: formData.remote,
    });

    if (
      Object.keys(simpleValidationErrors).length > 0 ||
      Object.keys(nestedValidationErrors).length > 0
    )
      return;

    await onSubmit(formData);
  };

  const handleFieldChange = <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Handle simple field validation
    if (
      [
        "title",
        "description",
        "department",
        "location",
        "type",
        "requirements",
        "skills",
        "benefits",
        "experienceLevel",
      ].includes(field as string)
    ) {
      validateSimpleField(
        field as keyof SimpleFields,
        value as SimpleFields[keyof SimpleFields],
      );
    }

    // Handle nested field validation
    if (field === "compensation") {
      validateNestedField(
        "compensation.salary",
        (value as JobFormData["compensation"]).salary,
      );
    } else if (field === "remote") {
      validateNestedField(
        "remote.allowed",
        (value as JobFormData["remote"]).allowed,
      );
      validateNestedField("remote.type", (value as JobFormData["remote"]).type);
    }
  };

  // Combine errors from both validation systems
  const errors: Record<string, string> = {
    ...Object.entries(simpleErrors).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value || "",
      }),
      {} as Record<string, string>,
    ),
    ...Object.entries(nestedErrors).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value || "",
      }),
      {} as Record<string, string>,
    ),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <JobBasicInfo
        data={formData}
        onChange={handleFieldChange}
        errors={errors}
      />

      <JobRequirements
        data={formData}
        onChange={handleFieldChange}
        errors={errors}
      />

      <JobCompensationComponent
        data={formData}
        onChange={handleFieldChange}
        errors={errors}
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
