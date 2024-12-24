import { createContext, useContext, useReducer, Reducer } from "react";
import type { FormContextValue, FormAction, FormState } from "../types/form";
import type { OnboardingData } from "../types/onboarding";

const initialFormData: OnboardingData = {
  currentStep: "role-selection",
  completedSteps: [],
  preferences: {
    jobTypes: [],
    locations: [],
    remotePreference: "remote",
    industries: [],
    skills: [],
  },
};

const initialState: FormState<OnboardingData> = {
  data: initialFormData,
  errors: {},
  touched: {},
  isValid: true,
  isSubmitting: false,
};

const defaultContext: FormContextValue<OnboardingData> = {
  formData: initialFormData,
  setFieldValue: () => {},
  errors: {},
  touched: {},
  isValid: false,
  isSubmitting: false,
  handleSubmit: async () => {},
  resetForm: () => {},
};

const FormContext =
  createContext<FormContextValue<OnboardingData>>(defaultContext);

const formReducer: Reducer<
  FormState<OnboardingData>,
  FormAction<OnboardingData>
> = (state, action) => {
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
      return initialState;
    default:
      return state;
  }
};

export function FormProvider({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (data: OnboardingData) => Promise<void>;
}) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setFieldValue = <K extends keyof OnboardingData>(
    field: K,
    value: OnboardingData[K],
  ) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });
    try {
      await onSubmit(state.data);
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET" });
  };

  const value: FormContextValue<OnboardingData> = {
    formData: state.data,
    setFieldValue,
    errors: state.errors,
    touched: state.touched,
    isValid: Object.keys(state.errors).length === 0,
    isSubmitting: state.isSubmitting,
    handleSubmit,
    resetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
