import type {
  FormState,
  FormAction,
  FormField,
  FormConfig,
  FormValue,
} from "../types/form";
import { transformFormData, getInitialValues } from "./formTransform";

export function formReducer<T extends Record<string, FormValue>>(
  state: FormState<T>,
  action: FormAction<T>,
): FormState<T> {
  switch (action.type) {
    case "SET_FIELD": {
      const newData = {
        ...state.data,
        [action.field]: action.value,
      } as T;

      return {
        ...state,
        data: newData,
        isDirty: true,
      };
    }

    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error,
        },
      };

    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: action.touched,
        },
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
        submitCount: state.submitCount ? state.submitCount + 1 : 1,
      };

    case "SET_ALL":
      return {
        ...state,
        ...action.data,
      };

    case "RESET": {
      const emptyErrors: Record<keyof T, string> = Object.keys(
        state.data,
      ).reduce(
        (acc, key) => ({ ...acc, [key]: "" }),
        {} as Record<keyof T, string>,
      );

      const emptyTouched: Record<keyof T, boolean> = Object.keys(
        state.data,
      ).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {} as Record<keyof T, boolean>,
      );

      return {
        ...state,
        data: (state.defaultValues || {}) as T,
        errors: emptyErrors,
        touched: emptyTouched,
        isValid: true,
        isSubmitting: false,
        isDirty: false,
        submitCount: 0,
      };
    }

    default:
      return state;
  }
}

export function getInitialFormState<T extends Record<string, FormValue>>(
  config: FormConfig<T>,
): FormState<T> {
  const initialValues = getInitialValues(config);
  const emptyErrors: Record<keyof T, string> = Object.keys(
    initialValues,
  ).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {} as Record<keyof T, string>,
  );

  const emptyTouched: Record<keyof T, boolean> = Object.keys(
    initialValues,
  ).reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {} as Record<keyof T, boolean>,
  );

  return {
    data: initialValues,
    defaultValues: initialValues,
    errors: emptyErrors,
    touched: emptyTouched,
    isValid: true,
    isSubmitting: false,
    isDirty: false,
    submitCount: 0,
  };
}

export function transformFormState<T extends Record<string, FormValue>>(
  state: FormState<T>,
  fields: Record<string, FormField>,
): FormState<T> {
  return {
    ...state,
    data: transformFormData(state.data, fields),
  };
}

export function isFormValid<T extends Record<string, FormValue>>(
  state: FormState<T>,
): boolean {
  return Object.keys(state.errors).length === 0;
}

export function isFieldTouched<T extends Record<string, FormValue>>(
  state: FormState<T>,
  field: keyof T,
): boolean {
  return !!state.touched[field];
}

export function getFieldError<T extends Record<string, FormValue>>(
  state: FormState<T>,
  field: keyof T,
): string | undefined {
  return state.errors[field];
}

export function getTouchedFields<T extends Record<string, FormValue>>(
  state: FormState<T>,
): Array<keyof T> {
  return Object.entries(state.touched)
    .filter(([_, touched]) => touched)
    .map(([field]) => field as keyof T);
}

export function getErrorFields<T extends Record<string, FormValue>>(
  state: FormState<T>,
): Array<keyof T> {
  return Object.keys(state.errors) as Array<keyof T>;
}

export function hasFieldChanged<T extends Record<string, FormValue>>(
  state: FormState<T>,
  field: keyof T,
): boolean {
  if (!state.defaultValues) return false;
  return state.data[field] !== state.defaultValues[field];
}

export function getChangedFields<T extends Record<string, FormValue>>(
  state: FormState<T>,
): Array<keyof T> {
  if (!state.defaultValues) return [];

  return (Object.keys(state.data) as Array<keyof T>).filter((key) => {
    if (!state.defaultValues) return false;
    return state.data[key] !== state.defaultValues[key];
  });
}
