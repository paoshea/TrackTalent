import type { ValidationRule, FormValue } from "../types/form";

type ValidatableValue = FormValue | undefined;

export function validateRequired(value: ValidatableValue): boolean {
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === "boolean") {
    return true;
  }
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value != null;
}

export function validateEmail(value: string | null | undefined): boolean {
  if (!value) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateMinLength(
  value: string | null | undefined,
  minLength: number,
): boolean {
  if (!value) return true;
  return value.length >= minLength;
}

export function validateMaxLength(
  value: string | null | undefined,
  maxLength: number,
): boolean {
  if (!value) return true;
  return value.length <= maxLength;
}

export function validatePattern(
  value: string | null | undefined,
  pattern: string | RegExp,
): boolean {
  if (!value) return true;
  const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;
  return regex.test(value);
}

export function validateUrl(value: string | null | undefined): boolean {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function validateNumber(value: ValidatableValue): boolean {
  if (value === "" || value == null) return true;
  return !isNaN(Number(value));
}

export function validateMinValue(
  value: number | null | undefined,
  min: number,
): boolean {
  if (value === undefined || value === null) return true;
  return value >= min;
}

export function validateMaxValue(
  value: number | null | undefined,
  max: number,
): boolean {
  if (value === undefined || value === null) return true;
  return value <= max;
}

export function validateDate(value: string | null | undefined): boolean {
  if (!value) return true;
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function validateDateRange(
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): boolean {
  if (!startDate || !endDate) return true;
  return new Date(startDate) <= new Date(endDate);
}

export function validateArrayLength(
  value: Array<string | number> | null | undefined,
  min?: number,
  max?: number,
): boolean {
  if (!Array.isArray(value)) return false;
  if (min !== undefined && value.length < min) return false;
  if (max !== undefined && value.length > max) return false;
  return true;
}

export function validatePhone(value: string | null | undefined): boolean {
  if (!value) return true;
  return /^\+?[\d\s-()]+$/.test(value);
}

export function validatePassword(value: string | null | undefined): boolean {
  if (!value) return true;
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    value,
  );
}

export function applyValidationRules<T extends Record<string, FormValue>>(
  value: ValidatableValue,
  rules: ValidationRule<T>[],
  formData?: T,
): string {
  for (const rule of rules) {
    let isValid = true;

    switch (rule.type) {
      case "required":
        isValid = validateRequired(value);
        break;
      case "minLength":
        isValid =
          typeof value === "string" && validateMinLength(value, rule.value);
        break;
      case "maxLength":
        isValid =
          typeof value === "string" && validateMaxLength(value, rule.value);
        break;
      case "pattern":
        isValid =
          typeof value === "string" && validatePattern(value, rule.value);
        break;
      case "custom":
        isValid = rule.validate ? rule.validate(value, formData) : true;
        break;
    }

    if (!isValid) {
      return rule.message;
    }
  }

  return "";
}
