import { useState, useCallback } from "react";
import { useFormValidation, type NestedValidationRules, type ValidationRule } from "./useFormValidation";
import { useFormPersistence } from "./useFormPersistence";
import type { JobFormData, JobCompensation, JobRemote } from "../types/jobs";

const INITIAL_DATA: JobFormData = {
  title: "",
  description: "",
  requirements: [],
  location: "",
  type: "full-time",
  compensation: {
    salary: {
      min: 0,
      max: 0,
      currency: "USD",
      period: "yearly",
    }
  },
  skills: [],
  benefits: [],
  department: "",
  experienceLevel: "entry",
  remote: {
    allowed: false,
  },
};

const validationRules = {
  title: {
    required: true,
    validate: (value: string) => {
      if (value.length < 3) return "Title must be at least 3 characters";
      if (value.length > 100) return "Title must be less than 100 characters";
      return "";
    },
  },
  description: {
    required: true,
    validate: (value: string) => {
      if (value.length < 50) return "Description must be at least 50 characters";
      if (value.length > 5000) return "Description must be less than 5000 characters";
      return "";
    },
  },
  requirements: {
    required: true,
    validate: (value: string[]) => {
      return value.length === 0 ? "At least one requirement is needed" : "";
    },
  },
  location: {
    required: true,
  },
  type: {
    required: true,
  },
  compensation: {
    required: true,
    validate: (value: JobCompensation) => {
      const { salary } = value;
      if (salary.min <= 0) return "Minimum salary must be greater than 0";
      if (salary.max <= 0) return "Maximum salary must be greater than 0";
      if (salary.min > salary.max) return "Minimum salary must be less than maximum";
      return "";
    },
  },
  skills: {
    required: true,
    validate: (value: string[]) => {
      return value.length === 0 ? "At least one skill is required" : "";
    },
  },
  benefits: {
    required: false,
  },
  department: {
    required: true,
  },
  experienceLevel: {
    required: true,
  },
  remote: {
    required: true,
    validate: (value: JobRemote) => {
      if (typeof value.allowed !== 'boolean') return "Remote work preference must be specified";
      return "";
    },
  },
} as const;

export function useJobForm(jobId?: string) {
  const [formData, setFormData] = useState<JobFormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, validateField, validateForm } =
    useFormValidation<JobFormData>({
      ...validationRules,
      compensation: {
        salary: {
          min: {
            required: true,
            validate: (value: unknown) => {
              const numValue = Number(value);
              return numValue > 0 ? "" : "Minimum salary must be greater than 0";
            }
          } as ValidationRule<unknown, JobFormData>,
          max: {
            required: true,
            validate: (value: unknown, data?: JobFormData) => {
              const numValue = Number(value);
              if (numValue <= 0) return "Maximum salary must be greater than 0";
              if (data?.compensation.salary.min && numValue < data.compensation.salary.min) {
                return "Maximum salary must be greater than minimum";
              }
              return "";
            }
          } as ValidationRule<unknown, JobFormData>,
          currency: {
            required: true,
            validate: (value: unknown) => {
              return typeof value === 'string' && value ? "" : "Currency is required";
            }
          } as ValidationRule<unknown, JobFormData>,
          period: {
            required: true,
            validate: (value: unknown) => {
              return typeof value === 'string' && ['hourly', 'monthly', 'yearly'].includes(value as string)
                ? ""
                : "Invalid period";
            }
          } as ValidationRule<unknown, JobFormData>
        }
      },
      remote: {
        allowed: {
          required: true,
          validate: (value: unknown) => {
            return typeof value === 'boolean' ? "" : "Remote work preference must be specified";
          }
        } as ValidationRule<unknown, JobFormData>,
        type: {
          required: false,
          validate: (value: unknown) => {
            if (!value) return "";
            return typeof value === 'string' && ['fully', 'hybrid', 'occasional'].includes(value)
              ? ""
              : "Invalid remote type";
          }
        } as ValidationRule<unknown, JobFormData>
      }
    });

  const { saveData, clearData } = useFormPersistence<JobFormData>(
    `job_form_${jobId || "new"}`,
    INITIAL_DATA,
    useCallback((savedData: JobFormData) => {
      setFormData(savedData);
    }, []),
  );

  const updateField = useCallback(
    <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };
        saveData(newData);
        validateField(field, value);
        return newData;
      });
    },
    [saveData, validateField],
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    setIsSubmitting(true);
    try {
      // Submit logic here
      clearData();
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, clearData]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_DATA);
    clearData();
  }, [clearData]);

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm,
  };
}
