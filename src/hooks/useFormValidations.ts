import { useState, useCallback } from "react";

/**
 * Advanced form validation hook for complex nested objects.
 * Use this hook when you need to validate forms with nested objects or complex validation rules.
 * For simple form validation without nested objects, use useFormValidation instead.
 */

export interface ValidationRule<T, D = unknown> {
  required?: boolean;
  validate?: (value: T, data?: D) => string;
}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : "";

type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? T[K] extends Record<string, unknown>
        ? PathValue<T[K], R>
        : never
      : never
    : never;

export type ValidationRules<T extends Record<string, unknown>> = {
  [P in Paths<T>]?: ValidationRule<PathValue<T, P>, T>;
};

type ValidationErrors<T> = {
  [P in Paths<T>]?: string;
};

function get<T extends Record<string, unknown>, P extends Paths<T>>(
  obj: T,
  path: P,
): PathValue<T, P> {
  return path
    .split(".")
    .reduce(
      (acc: Record<string, unknown>, part: string) =>
        (acc?.[part] as Record<string, unknown>) ?? {},
      obj as Record<string, unknown>,
    ) as PathValue<T, P>;
}

function validateField<T extends Record<string, unknown>, P extends Paths<T>>(
  path: P,
  value: PathValue<T, P>,
  rule: ValidationRule<PathValue<T, P>, T>,
  data?: T,
): string | null {
  // Handle required check
  if (rule.required) {
    if (Array.isArray(value) && value.length === 0) {
      return `${String(path)} is required`;
    }
    if (!value) {
      return `${String(path)} is required`;
    }
  }

  // Handle validation
  if (rule.validate) {
    return rule.validate(value, data) || null;
  }

  return null;
}

export function useFormValidations<T extends Record<string, unknown>>(
  rules: ValidationRules<T>,
) {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});

  const validateSingleField = useCallback(
    <P extends Paths<T>>(path: P, value: PathValue<T, P>, data?: T) => {
      const rule = rules[path];
      if (!rule) return null;

      const error = validateField(path, value, rule, data);

      if (error) {
        setErrors((prev) => ({
          ...prev,
          [path]: error,
        }));
        return error;
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[path];
        return newErrors;
      });
      return null;
    },
    [rules],
  );

  const validateForm = useCallback(
    (data: T) => {
      const newErrors: ValidationErrors<T> = {};
      let hasErrors = false;

      (Object.keys(rules) as Array<Paths<T>>).forEach((path) => {
        const value = get(data, path);
        const error = validateSingleField(path, value, data);
        if (error) {
          hasErrors = true;
          newErrors[path] = error;
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
