import { useState, useCallback } from "react";

export interface ValidationRule<T, D = unknown> {
  required?: boolean;
  validate?: (value: T, data?: D) => string;
}

type DeepValidationRule<T, P> = T extends Array<infer U>
  ? ValidationRule<T, P>
  : T extends Record<string, any>
  ? { [K in keyof T]: DeepValidationRule<T[K], P> }
  : ValidationRule<T, P>;

export type NestedValidationRules<T> = {
  [K in keyof T]: T[K] extends Array<any>
    ? ValidationRule<T[K], T>
    : T[K] extends Record<string, any>
    ? DeepValidationRule<T[K], T>
    : ValidationRule<T[K], T>;
};

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

function isValidationRule<T, D>(
  rule: ValidationRule<T, D> | Record<string, any>
): rule is ValidationRule<T, D> {
  return 'required' in rule || 'validate' in rule;
}

export function useFormValidation<T extends Record<string, any>>(rules: NestedValidationRules<T>) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});

  const validateField = useCallback(
    <K extends keyof T>(field: K, value: T[K], data?: T) => {
      const rule = rules[field];
      if (!rule || typeof rule !== 'object') return null;

      if (isValidationRule(rule)) {
        if (rule.required && (!value || (Array.isArray(value) && !value.length))) {
          const error = `${String(field)} is required`;
          setErrors((prev) => ({
            ...prev,
            [field]: error,
          }));
          return error;
        }

        if (rule.validate) {
          const error = rule.validate(value, data);
          if (error) {
            setErrors((prev) => ({
              ...prev,
              [field]: error,
            }));
          } else {
            setErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors[field];
              return newErrors;
            });
          }
          return error;
        }
      }

      return null;
    },
    [rules],
  );

  const validateForm = useCallback(
    (data: T) => {
      const newErrors: ValidationErrors<T> = {};
      let hasErrors = false;

      const validateNestedRules = (
        nestedRules: DeepValidationRule<any, T> | ValidationRule<any, T>,
        nestedData: any,
        prefix = ""
      ): boolean => {
        let hasNestedErrors = false;

        if (!nestedRules || typeof nestedRules !== 'object') {
          return false;
        }

        if (isValidationRule(nestedRules)) {
          if (nestedRules.required && (!nestedData || (Array.isArray(nestedData) && !nestedData.length))) {
            newErrors[prefix as keyof T] = `${prefix} is required`;
            return true;
          }

          if (nestedRules.validate) {
            const error = nestedRules.validate(nestedData, data);
            if (error) {
              newErrors[prefix as keyof T] = error;
              return true;
            }
          }
          return false;
        }

        // This is a nested object
        Object.entries(nestedRules).forEach(([key, rule]) => {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          const value = nestedData?.[key];

          const nestedHasErrors = validateNestedRules(
            rule as DeepValidationRule<any, T> | ValidationRule<any, T>,
            value,
            fullKey
          );
          if (nestedHasErrors) {
            hasNestedErrors = true;
          }
        });

        return hasNestedErrors;
      };

      Object.entries(rules).forEach(([field, rule]) => {
        const value = data[field];
        const hasFieldErrors = validateNestedRules(rule, value, field);
        if (hasFieldErrors) {
          hasErrors = true;
        }
      });

      setErrors(newErrors);
      return hasErrors ? newErrors : {};
    },
    [rules],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
  };
}
