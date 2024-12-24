import type { JobFormData } from "../types/jobs";
import type { FormValue } from "../types/form";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validate?: (value: FormValue) => boolean | string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const jobFormValidation: ValidationRules = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
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
  isRemote: {
    required: true,
  },
  "salaryRange.min": {
    required: true,
    min: 0,
    validate: (value: FormValue) => {
      if (typeof value !== "number") return "Must be a number";
      const form = window.document.querySelector("form");
      const maxSalary = form?.querySelector<HTMLInputElement>(
        '[name="salaryRange.max"]',
      )?.value;
      return (
        !maxSalary ||
        value <= Number(maxSalary) ||
        "Minimum must be less than maximum"
      );
    },
  },
  "salaryRange.max": {
    required: true,
    min: 0,
    validate: (value: FormValue) => {
      if (typeof value !== "number") return "Must be a number";
      const form = window.document.querySelector("form");
      const minSalary = form?.querySelector<HTMLInputElement>(
        '[name="salaryRange.min"]',
      )?.value;
      return (
        !minSalary ||
        value >= Number(minSalary) ||
        "Maximum must be greater than minimum"
      );
    },
  },
  "salaryRange.currency": {
    required: true,
  },
  "salaryRange.frequency": {
    required: true,
  },
  description: {
    required: true,
    minLength: 100,
  },
  requirements: {
    required: true,
    validate: (value: FormValue) => {
      if (!Array.isArray(value)) return "Must be an array";
      return value.length > 0 || "At least one requirement is required";
    },
  },
  responsibilities: {
    required: true,
    validate: (value: FormValue) => {
      if (!Array.isArray(value)) return "Must be an array";
      return value.length > 0 || "At least one responsibility is required";
    },
  },
  skills: {
    required: true,
    validate: (value: FormValue) => {
      if (!Array.isArray(value)) return "Must be an array";
      return value.length > 0 || "At least one skill is required";
    },
  },
  "experience.level": {
    required: true,
  },
  "experience.years": {
    required: true,
    min: 0,
  },
  "education.level": {
    required: true,
  },
  "education.field": {
    required: true,
    minLength: 2,
  },
};

export const validateField = (
  value: FormValue,
  rules?: ValidationRule,
): string | null => {
  if (!rules) return null;

  if (
    rules.required &&
    (!value || (Array.isArray(value) && value.length === 0))
  ) {
    return "This field is required";
  }

  if (typeof value === "string") {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return "Invalid format";
    }
  }

  if (typeof value === "number") {
    if (rules.min !== undefined && value < rules.min) {
      return `Must be at least ${rules.min}`;
    }

    if (rules.max !== undefined && value > rules.max) {
      return `Must be no more than ${rules.max}`;
    }
  }

  if (rules.validate) {
    const result = rules.validate(value);
    if (typeof result === "string") return result;
    if (!result) return "Invalid value";
  }

  return null;
};

const getNestedValue = <T extends Record<string, unknown>>(
  obj: T,
  path: string,
): FormValue => {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      const value = (current as Record<string, unknown>)[key];
      if (value === undefined) return null;
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null ||
        (Array.isArray(value) &&
          value.every(
            (item) => typeof item === "string" || typeof item === "number",
          ))
      ) {
        return value as FormValue;
      }
    }
    return null;
  }, obj as unknown) as FormValue;
};

export const validateForm = (
  data: Partial<JobFormData>,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(jobFormValidation).forEach(([fieldPath, rules]) => {
    const value = getNestedValue(data, fieldPath);
    const error = validateField(value, rules);
    if (error) {
      errors[fieldPath] = error;
    }
  });

  return errors;
};
