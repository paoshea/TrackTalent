import { useState } from "react";
import type { CompanyData } from "../types/company";

type ValidatableValue =
  | string
  | number
  | boolean
  | null
  | Array<string | number>;

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validate?: (value: ValidatableValue) => boolean | string;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

type NestedKeyOf<T> = {
  [K in keyof T & (string | number)]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T & (string | number)];

export const companyValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  industry: {
    required: true,
  },
  size: {
    required: true,
  },
  website: {
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  },
  description: {
    required: true,
    minLength: 50,
    maxLength: 1000,
  },
  location: {
    required: true,
  },
  "socialLinks.linkedin": {
    pattern: /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.*$/i,
  },
  "socialLinks.twitter": {
    pattern: /^https:\/\/twitter\.com\/[^/]+\/?$/i,
  },
  "socialLinks.facebook": {
    pattern: /^https:\/\/facebook\.com\/[^/]+\/?$/i,
  },
};

const getNestedValue = (
  obj: Record<string, unknown>,
  path: string,
): ValidatableValue => {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      const value = (current as Record<string, unknown>)[key];
      if (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        (Array.isArray(value) &&
          value.every(
            (item) => typeof item === "string" || typeof item === "number",
          ))
      ) {
        return value as ValidatableValue;
      }
    }
    return null;
  }, obj as unknown) as ValidatableValue;
};

export function useCompanyFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: NestedKeyOf<CompanyData>,
    value: ValidatableValue,
  ): string | null => {
    const rules = companyValidationRules[field];
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

  const validateForm = (data: Partial<CompanyData>): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    Object.entries(companyValidationRules).forEach(([field]) => {
      const value = getNestedValue(data as Record<string, unknown>, field);
      const error = validateField(field as NestedKeyOf<CompanyData>, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  return {
    errors,
    validateField: (
      field: NestedKeyOf<CompanyData>,
      value: ValidatableValue,
    ) => {
      const error = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error || "",
      }));
    },
    validateForm,
  };
}
