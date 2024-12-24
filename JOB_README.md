# Form Validation System Documentation

## Goal
Create a robust form validation system that can handle:
1. Nested object validation (e.g., compensation.salary.min)
2. Array validation (e.g., requirements array)
3. Conditional validation (e.g., remote.type required when remote.allowed is true)
4. Type-safe validation rules that preserve field types

## Challenges

### 1. Type Inference Issues in JobForm.tsx
```typescript
// Error in JobForm.tsx:
Argument of type '{
  title: ValidationRule<string, JobFormData>;
  // ...
  "remote.allowed": ValidationRule<boolean, JobFormData>;
}' is not assignable to parameter of type 'ValidationRules<JobFormData>'
```

The issue stems from trying to validate nested properties using dot notation ("remote.allowed") while the type system expects the nested structure to match the original data structure.

### 2. Type Compatibility in useJobForm.ts
```typescript
// Error in useJobForm.ts:
Type '(value: string) => string' is not assignable to type '(value: unknown) => string'
```

The validation rules are losing their type information, causing TypeScript to fall back to `unknown` types for validation function parameters.

### 3. Unused DeepPartial Type
The `DeepPartial` type was initially added for handling partial form data but isn't being used in the current implementation.

## Attempted Solutions

### 1. Index Signature Approach
```typescript
type ValidationRules<T> = {
  [K in keyof T]: ValidationRule<T[K], T>;
} & Record<string, ValidationRule<unknown, T>>;
```
This approach tried to allow both typed fields and string indices but led to type conflicts.

### 2. Mapped Type with Deep Validation
```typescript
type DeepValidationType<T, D> = T extends Array<infer U>
  ? ValidationRule<T, D>
  : T extends Record<string, unknown>
  ? ValidationRule<T, D>
  : ValidationRule<T, D>;
```
This attempted to handle nested types but didn't preserve field-level type information.

### 3. Validation Rule Factory
```typescript
type ValidationRuleFor<T, K extends keyof T> = ValidationRule<T[K], T>;
```
This approach tried to preserve field types but didn't handle nested paths.

## Best Solution

1. Split validation into two hooks:
   - `useFormValidation.ts` - For simple form validation
   - `useFormValidations.ts` - For complex nested validation

2. Use a flattened validation structure:
```typescript
interface JobFormValidation {
  title: ValidationRule<string, JobFormData>;
  description: ValidationRule<string, JobFormData>;
  'compensation.salary': ValidationRule<JobSalary, JobFormData>;
  'remote.allowed': ValidationRule<boolean, JobFormData>;
  'remote.type': ValidationRule<RemoteType | undefined, JobFormData>;
}
```

3. Update the validation types:
```typescript
export type ValidationRules<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? ValidationRule<T[K], T>
    : T[K] extends Record<string, unknown>
    ? ValidationRule<T[K], T>
    : ValidationRule<T[K], T>;
};
```

4. Add type helpers for nested paths:
```typescript
type NestedPaths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? K | `${K}.${NestedPaths<T[K]>}`
    : K;
}[keyof T];

type NestedValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? NestedValue<T[K], R>
    : never
  : never;
```

This solution:
- Preserves type information for all fields
- Handles nested object validation
- Supports array validation
- Maintains type safety for validation functions
- Provides clear error messages for validation rule mismatches

## Implementation Notes

1. Remove unused `DeepPartial` type
2. Use flattened validation structure in components
3. Add type helpers for nested path access
4. Keep separate hooks for different validation needs
5. Use const assertions with satisfies operator for better type inference

## Usage Example

```typescript
const rules = {
  title: {
    required: true,
    validate: (value: string) => {
      if (value.length < 3) return "Title must be at least 3 characters";
      return "";
    },
  },
  'compensation.salary': {
    required: true,
    validate: (value: JobSalary) => {
      if (value.min > value.max) return "Min salary must be less than max";
      return "";
    },
  },
} satisfies ValidationRules<JobFormData>;




Record of Green status

// src/hooks/useFormValidations.ts

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
    ? `${K}${'' extends P ? '' : '.'}${P}`
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
  : '';

type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : never;

export type ValidationRules<T extends Record<string, unknown>> = {
  [P in Paths<T>]?: ValidationRule<PathValue<T, P>, T>;
};

type ValidationErrors<T> = Partial<Record<Paths<T>, string>>;

function get<T extends Record<string, unknown>, P extends Paths<T>>(
  obj: T,
  path: P,
): PathValue<T, P> {
  return path.split('.').reduce((acc: any, part: string) => acc?.[part], obj);
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
    ? `${K}${'' extends P ? '' : '.'}${P}`
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
  : '';

type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : never;

type ValidateFunction<T, P extends string> = (
  value: PathValue<T, P>,
  data?: T,
) => string;

export type ValidationRules<T extends Record<string, unknown>> = {
  [P in Paths<T>]?: {
    required?: boolean;
    validate?: ValidateFunction<T, P>;
  };
};

type ValidationErrors<T> = {
  [P in Paths<T>]?: string;
};

function get<T extends Record<string, unknown>, P extends Paths<T>>(
  obj: T,
  path: P,
): PathValue<T, P> {
  return path.split('.').reduce((acc: any, part: string) => acc?.[part], obj);
}

function validateField<T extends Record<string, unknown>, P extends Paths<T>>(
  path: P,
  value: PathValue<T, P>,
  rule: ValidationRules<T>[P],
  data?: T,
): string | null {
  // Handle required check
  if (rule?.required) {
    if (Array.isArray(value) && value.length === 0) {
      return `${String(path)} is required`;
    }
    if (!value) {
      return `${String(path)} is required`;
    }
  }

  // Handle validation
  if (rule?.validate) {
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


yellow
// src/hooks/useJobPreferencesValidation.ts

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


//JobForm.tsx

import { useState } from "react";
import { useJobForm } from "../../../hooks/useJobForm";
import { useJobPreferencesValidation } from "../../../hooks/useJobPreferencesValidation";
import type { JobFormData } from "../../../types/jobs";
import { JobBasicInfo } from "./JobBasicInfo";
import { JobRequirements } from "./JobRequirements";
import { JobCompensation as JobCompensationComponent } from "./JobCompensation";

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => Promise<void>;
  isSubmitting?: boolean;
}

// Type for simple fields (no nesting)
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

export function JobForm({ initialData, onSubmit, isSubmitting }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    department: initialData?.department || "",
    location: initialData?.location || "",
    type: initialData?.type || "full-time",
    requirements: initialData?.requirements || [],
    skills: initialData?.skills || [],
    compensation: initialData?.compensation || {
      salary: {
        min: 0,
        max: 0,
        currency: "USD",
        period: "yearly",
      },
    },
    benefits: initialData?.benefits || [],
    experienceLevel: initialData?.experienceLevel || "mid",
    remote: initialData?.remote || {
      allowed: false,
    },
  });

  const {
    errors: simpleErrors,
    validateField: validateSimpleField,
    validateForm: validateSimpleForm,
  } = useJobForm();

  const {
    errors: nestedErrors,
    validateField: validateNestedField,
    validateForm: validateNestedForm,
  } = useJobPreferencesValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const simpleValidationErrors = validateSimpleForm(formData);
    const nestedValidationErrors = validateNestedForm({
      compensation: formData.compensation,
      remote: formData.remote,
    });

    if (
      Object.keys(simpleValidationErrors).length > 0 ||
      Object.keys(nestedValidationErrors).length > 0
    )
      return;

    await onSubmit(formData);
  };

  const handleFieldChange = <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Handle simple field validation
    if (
      [
        "title",
        "description",
        "department",
        "location",
        "type",
        "requirements",
        "skills",
        "benefits",
        "experienceLevel",
      ].includes(field as string)
    ) {
      validateSimpleField(field as keyof SimpleFields, value as SimpleFields[keyof SimpleFields]);
    }

    // Handle nested field validation
    if (field === "compensation") {
      validateNestedField(
        "compensation.salary",
        (value as JobFormData["compensation"]).salary,
      );
    } else if (field === "remote") {
      validateNestedField(
        "remote.allowed",
        (value as JobFormData["remote"]).allowed,
      );
      validateNestedField(
        "remote.type",
        (value as JobFormData["remote"]).type,
      );
    }
  };

  // Combine errors from both validation systems
  const errors: Record<string, string> = {
    ...Object.entries(simpleErrors).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value || "",
      }),
      {} as Record<string, string>,
    ),
    ...Object.entries(nestedErrors).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value || "",
      }),
      {} as Record<string, string>,
    ),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <JobBasicInfo
        data={formData}
        onChange={handleFieldChange}
        errors={errors}
      />

      <JobRequirements
        data={formData}
        onChange={handleFieldChange}
        errors={errors}
      />

      <JobCompensationComponent
        data={formData}
        onChange={handleFieldChange}
        errors={errors}
      />

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Job"}
        </button>
      </div>
    </form>
  );
}

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


- SUMMARY FINDINGS
