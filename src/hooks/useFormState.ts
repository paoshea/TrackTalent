import { useReducer, useCallback } from "react";
import type { FormState, FormAction } from "../types/form";

function formReducer<T>(
  state: FormState<T>,
  action: FormAction<T>,
): FormState<T> {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
      };

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
      };

    case "SET_ALL":
      return {
        ...state,
        ...action.data,
      };

    case "RESET":
      return {
        ...state,
        errors: {},
        touched: {},
        isSubmitting: false,
      };

    default:
      return state;
  }
}

export function useFormState<T extends Record<string, unknown>>(
  initialData: T,
) {
  const [state, dispatch] = useReducer(formReducer<T>, {
    data: initialData,
    errors: {},
    touched: {},
    isValid: true,
    isSubmitting: false,
  });

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      dispatch({ type: "SET_FIELD", field, value });
    },
    [],
  );

  const setError = useCallback((field: keyof T, error: string) => {
    dispatch({ type: "SET_ERROR", field, error });
  }, []);

  const setTouched = useCallback((field: keyof T, touched: boolean) => {
    dispatch({ type: "SET_TOUCHED", field, touched });
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", isSubmitting });
  }, []);

  const setAll = useCallback((data: Partial<FormState<T>>) => {
    dispatch({ type: "SET_ALL", data });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    state,
    setFieldValue,
    setError,
    setTouched,
    setSubmitting,
    setAll,
    reset,
  };
}
