import { useCallback } from "react";
import { validatePersonalInfo, validateExperience } from "../utils/validation";
import type { FormStep, FormValue } from "../types/form";
import type { ApplicationData } from "../types/applications";

interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface MultiStepValidationResult {
  isValid: boolean;
  errors: Record<string, Record<string, string>>;
}

type ValidatableData = Record<string, FormValue> & Partial<ApplicationData>;

export function useStepValidation<T extends ValidatableData>() {
  const validateStep = useCallback(
    (step: FormStep<T>, data: T): StepValidationResult => {
      const errors: Record<string, string> = {};

      switch (step.id) {
        case "personal-info":
          if ("resume" in data) {
            Object.assign(
              errors,
              validatePersonalInfo(data as ApplicationData),
            );
          }
          break;

        case "experience":
          if ("experience" in data && Array.isArray(data.experience)) {
            Object.assign(errors, validateExperience(data.experience));
          }
          break;

        default:
          // Custom validation rules from step config
          step.validationRules?.forEach((rule) => {
            const value = data[rule.field];
            if (
              rule.type === "custom" &&
              rule.validate &&
              !rule.validate(value, data)
            ) {
              errors[rule.field as string] = rule.message;
            } else if (rule.type === "required" && !value) {
              errors[rule.field as string] = rule.message;
            } else if (
              rule.type === "minLength" &&
              typeof value === "string" &&
              value.length < rule.value
            ) {
              errors[rule.field as string] = rule.message;
            } else if (
              rule.type === "maxLength" &&
              typeof value === "string" &&
              value.length > rule.value
            ) {
              errors[rule.field as string] = rule.message;
            } else if (rule.type === "pattern" && typeof value === "string") {
              const regex =
                typeof rule.value === "string"
                  ? new RegExp(rule.value)
                  : rule.value;
              if (!regex.test(value)) {
                errors[rule.field as string] = rule.message;
              }
            }
          });
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      };
    },
    [],
  );

  const validateAllSteps = useCallback(
    (steps: Array<FormStep<T>>, data: T): MultiStepValidationResult => {
      const allErrors: Record<string, Record<string, string>> = {};
      let isValid = true;

      steps.forEach((step) => {
        const { errors } = validateStep(step, data);
        if (Object.keys(errors).length > 0) {
          allErrors[step.id] = errors;
          isValid = false;
        }
      });

      return {
        isValid,
        errors: allErrors,
      };
    },
    [validateStep],
  );

  return {
    validateStep,
    validateAllSteps,
  };
}
