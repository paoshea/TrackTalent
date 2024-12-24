import {
  useFormValidation,
  type NestedValidationRules,
} from "./useFormValidation";
import type { JobFormData } from "../types/jobs";

export function useJobPreferencesValidation() {
  const rules: NestedValidationRules<JobFormData> = {
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
        if (value.length < 50)
          return "Description must be at least 50 characters";
        if (value.length > 5000)
          return "Description must be less than 5000 characters";
        return "";
      },
    },
    department: {
      required: true,
    },
    location: {
      required: true,
    },
    type: {
      required: true,
    },
    requirements: {
      required: true,
      validate: (value: string[]) => {
        if (!value.length) return "At least one requirement is required";
        return "";
      },
    },
    skills: {
      required: true,
      validate: (value: string[]) => {
        if (!value.length) return "At least one skill is required";
        return "";
      },
    },
    benefits: {
      required: true,
      validate: (value: string[]) => {
        if (!value.length) return "At least one benefit is required";
        return "";
      },
    },
    compensation: {
      salary: {
        min: {
          required: true,
          validate: (value: number, data?: JobFormData) => {
            if (value < 0) return "Minimum salary cannot be negative";
            if (
              data?.compensation?.salary?.max &&
              value > data.compensation.salary.max
            ) {
              return "Minimum salary must be less than maximum";
            }
            return "";
          },
        },
        max: {
          required: true,
          validate: (value: number, data?: JobFormData) => {
            if (value < 0) return "Maximum salary cannot be negative";
            if (
              data?.compensation?.salary?.min &&
              value < data.compensation.salary.min
            ) {
              return "Maximum salary must be greater than minimum";
            }
            return "";
          },
        },
        currency: {
          required: true,
        },
        period: {
          required: true,
        },
      },
    },
    experienceLevel: {
      required: true,
    },
    remote: {
      allowed: {
        required: true,
      },
      type: {
        validate: (value: string | undefined, data?: JobFormData) => {
          if (data?.remote?.allowed && !value) {
            return "Remote type is required when remote is allowed";
          }
          return "";
        },
      },
    },
  };

  return useFormValidation<JobFormData>(rules);
}
