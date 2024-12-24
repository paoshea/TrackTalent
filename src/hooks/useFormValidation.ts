import { useState, useCallback } from "react";

/**
 * Simple form validation hook for basic form fields.
 * Use this hook when you need to validate simple form fields without nested objects.
 * For complex nested object validation, use useFormValidations instead.
 */

export interface ValidationRule<T, D = unknown> {
  required?: boolean;
  validate?: (value: T, data?: D) => string;
}

export type ValidationRules<T extends Record<string, unknown>> = {
  [K in keyof T]: ValidationRule<T[K], T>;
};

type ValidationErrors = Record<string, string>;

function validateField<T extends Record<string, unknown>, K extends keyof T>(
  field: K,
  value: T[K],
  rule: ValidationRule<T[K], T>,
  data?: T,
): string | null {
  // Handle required check
  if (rule.required) {
    if (Array.isArray(value) && value.length === 0) {
      return `${String(field)} is required`;
    }
    if (!value) {
      return `${String(field)} is required`;
    }
  }

  // Handle validation
  if (rule.validate) {
    return rule.validate(value, data) || null;
  }

  return null;
}

export function useFormValidation<T extends Record<string, unknown>>(
  rules: ValidationRules<T>,
) {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateSingleField = useCallback(
    <K extends keyof T>(field: K, value: T[K], data?: T) => {
      const rule = rules[field];
      const error = validateField(field, value, rule, data);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          [field as string]: error,
        }));
        return error;
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
      return null;
    },
    [rules],
  );

  const validateForm = useCallback(
    (data: T) => {
      const newErrors: ValidationErrors = {};
      let hasErrors = false;

      Object.keys(rules).forEach((field) => {
        const key = field as keyof T;
        const error = validateSingleField(key, data[key], data);
        if (error) {
          hasErrors = true;
          newErrors[field] = error;
        }
      });

      setErrors(newErrors);
      return hasErrors ? newErrors : {};
    },
    [rules, validateSingleField],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField: validateSingleField,
    validateForm,
    clearErrors,
  };
}
