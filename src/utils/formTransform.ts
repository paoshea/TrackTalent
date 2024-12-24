import type { FormField, FormConfig, FormValue } from "../types/form";

export function transformFormData<T extends Record<string, FormValue>>(
  data: T,
  fields: Record<string, FormField<T>>,
): T {
  const transformed: Record<string, FormValue> = {};

  Object.entries(data).forEach(([key, value]) => {
    const field = fields[key];
    if (!field) {
      transformed[key] = value as FormValue;
      return;
    }

    if (field.transform) {
      transformed[key] = field.transform(value as FormValue);
    } else if (field.type === "number" && typeof value === "string") {
      transformed[key] = value === "" ? null : Number(value);
    } else if (field.type === "checkbox" && typeof value === "string") {
      transformed[key] = value === "true";
    } else if (
      field.type === "select" &&
      field.multiple &&
      !Array.isArray(value)
    ) {
      transformed[key] = value ? [String(value)] : [];
    } else {
      transformed[key] = value as FormValue;
    }
  });

  return transformed as T;
}

export function formatFormData<T extends Record<string, FormValue>>(
  data: T,
  fields: Record<string, FormField<T>>,
): Record<string, string> {
  const formatted: Record<string, string> = {};

  Object.entries(data).forEach(([key, value]) => {
    const field = fields[key];
    if (!field) {
      formatted[key] = String(value);
      return;
    }

    if (field.format) {
      formatted[key] = field.format(value as FormValue);
    } else if (field.type === "number") {
      formatted[key] = value === null ? "" : String(value);
    } else if (field.type === "checkbox") {
      formatted[key] = String(value);
    } else if (field.type === "select" && field.multiple) {
      formatted[key] = Array.isArray(value) ? value.map(String).join(",") : "";
    } else {
      formatted[key] =
        value === null || value === undefined ? "" : String(value);
    }
  });

  return formatted;
}

export function parseFormData<T extends Record<string, FormValue>>(
  data: Record<string, string>,
  fields: Record<string, FormField<T>>,
): T {
  const parsed: Record<string, FormValue> = {};

  Object.entries(data).forEach(([key, value]) => {
    const field = fields[key];
    if (!field) {
      parsed[key] = value;
      return;
    }

    if (field.parse) {
      parsed[key] = field.parse(value);
    } else if (field.type === "number") {
      parsed[key] = value === "" ? null : Number(value);
    } else if (field.type === "checkbox") {
      parsed[key] = value === "true";
    } else if (field.type === "select" && field.multiple) {
      parsed[key] = value ? value.split(",").map(String) : [];
    } else {
      parsed[key] = value;
    }
  });

  return parsed as T;
}

export function getInitialValues<T extends Record<string, FormValue>>(
  config: FormConfig<T>,
): T {
  const initial: Record<string, FormValue> = { ...config.initialValues };

  Object.entries(config.fields).forEach(([key, field]) => {
    if (initial[key] === undefined && field.defaultValue !== undefined) {
      initial[key] = field.defaultValue;
    }
  });

  return initial as T;
}

export function getDependentFields<T extends Record<string, FormValue>>(
  field: keyof T,
  fields: Record<keyof T, FormField<T>>,
): Array<keyof T> {
  const dependentFields: Array<keyof T> = [];

  (Object.entries(fields) as Array<[keyof T, FormField<T>]>).forEach(
    ([key, fieldConfig]) => {
      if (fieldConfig.dependencies?.includes(field)) {
        dependentFields.push(key);
      }
    },
  );

  return dependentFields;
}

export function getFieldDependencies<T extends Record<string, FormValue>>(
  field: keyof T,
  fields: Record<keyof T, FormField<T>>,
): Array<keyof T> {
  return fields[field]?.dependencies || [];
}
