// src/hooks/useJobForm.ts

import { useFormValidation, type ValidationRules } from "./useFormValidation";
import type { JobFormData } from "../types/jobs";

/**
 * Custom hook for validating job form data.
 * Uses useFormValidation for simple field validation.
 * For nested object validation (like compensation and remote settings),
 * use useJobPreferencesValidation instead.
 */
export function useJobForm() {
  // Pick only the top-level fields for simple validation
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

  const rules: ValidationRules<SimpleFields> = {
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
      required: false,
      validate: (_value: string[]) => "",
    },
    experienceLevel: {
      required: true,
    },
  };

  return useFormValidation<SimpleFields>(rules);
}
