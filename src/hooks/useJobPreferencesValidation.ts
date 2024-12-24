import { useFormValidations, type ValidationRules } from "./useFormValidations";
import type { JobSalary, RemoteType } from "../types/jobs";

/**
 * Custom hook for validating job preferences form data.
 * Uses useFormValidations because it deals with nested objects
 * like compensation and remote work settings.
 */
export function useJobPreferencesValidation() {
  // Only include nested fields that require validation
  type NestedFields = {
    compensation: { salary: JobSalary };
    remote: { allowed: boolean; type?: RemoteType };
  };

  const rules: ValidationRules<NestedFields> = {
    "compensation.salary": {
      required: true,
      validate: (value: JobSalary) => {
        if (!value) return "Salary is required";
        if (value.min < 0) return "Minimum salary cannot be negative";
        if (value.max < 0) return "Maximum salary cannot be negative";
        if (value.min > value.max)
          return "Minimum salary must be less than maximum";
        if (!value.currency) return "Currency is required";
        if (!value.period) return "Period is required";
        return "";
      },
    },
    "remote.allowed": {
      required: true,
    },
    "remote.type": {
      validate: (value: RemoteType | undefined, data) => {
        if (data?.remote?.allowed && !value) {
          return "Remote type is required when remote is allowed";
        }
        return "";
      },
    },
  };

  return useFormValidations<NestedFields>(rules);
}
