import { useState, useCallback } from "react";
import type { ValidationRule, FormValue } from "../types/form";

export function useFieldValidation<T extends Record<string, FormValue>>(
  rules: ValidationRule<T>[],
) {
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>,
  );

  const validateField = useCallback(
    (field: keyof T, value: FormValue, formData?: T) => {
      const fieldRules = rules.filter((rule) => rule.field === field);
      const fieldErrors: string[] = [];

      fieldRules.forEach((rule) => {
        if (rule.type === "custom" && rule.validate) {
          if (!rule.validate(value, formData)) {
            fieldErrors.push(rule.message);
          }
        }

        if (rule.type === "required" && !value) {
          fieldErrors.push(rule.message);
        }

        if (rule.type === "minLength" && typeof value === "string") {
          if (value.length < rule.value) {
            fieldErrors.push(rule.message);
          }
        }

        if (rule.type === "maxLength" && typeof value === "string") {
          if (value.length > rule.value) {
            fieldErrors.push(rule.message);
          }
        }

        if (rule.type === "pattern" && typeof value === "string") {
          const regex =
            typeof rule.value === "string"
              ? new RegExp(rule.value)
              : rule.value;
          if (!regex.test(value)) {
            fieldErrors.push(rule.message);
          }
        }

        if (rule.dependsOn && formData) {
          const dependentValues = rule.dependsOn.map((dep) => formData[dep]);
          if (dependentValues.some((val) => !val)) {
            fieldErrors.push(rule.message);
          }
        }
      });

      if (fieldErrors.length > 0) {
        setErrors((prev) => ({
          ...prev,
          [field]: fieldErrors[0],
        }));
        return false;
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    },
    [rules],
  );

  const validateAllFields = useCallback(
    (formData: T) => {
      const allErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
      let isValid = true;

      rules.forEach((rule) => {
        const value = formData[rule.field];

        if (rule.type === "custom" && rule.validate) {
          if (!rule.validate(value, formData)) {
            allErrors[rule.field] = rule.message;
            isValid = false;
          }
        }

        if (rule.type === "required" && !value) {
          allErrors[rule.field] = rule.message;
          isValid = false;
        }

        if (rule.type === "minLength" && typeof value === "string") {
          if (value.length < rule.value) {
            allErrors[rule.field] = rule.message;
            isValid = false;
          }
        }

        if (rule.type === "maxLength" && typeof value === "string") {
          if (value.length > rule.value) {
            allErrors[rule.field] = rule.message;
            isValid = false;
          }
        }

        if (rule.type === "pattern" && typeof value === "string") {
          const regex =
            typeof rule.value === "string"
              ? new RegExp(rule.value)
              : rule.value;
          if (!regex.test(value)) {
            allErrors[rule.field] = rule.message;
            isValid = false;
          }
        }

        if (rule.dependsOn) {
          const dependentValues = rule.dependsOn.map((dep) => formData[dep]);
          if (dependentValues.some((val) => !val)) {
            allErrors[rule.field] = rule.message;
            isValid = false;
          }
        }
      });

      setErrors(allErrors);
      return isValid;
    },
    [rules],
  );

  const clearErrors = useCallback(() => {
    setErrors({} as Record<keyof T, string>);
  }, []);

  return {
    errors,
    validateField,
    validateAllFields,
    clearErrors,
  };
}
