import type { JobFormData } from "./jobs";
import type { ApplicationData } from "./applications";

export interface ApplicationFormStep {
  id: keyof ApplicationData;
  label: string;
  description?: string;
  isOptional?: boolean;
}

export type JobFormErrors = Partial<Record<keyof JobFormData, string>>;

export interface JobFormContextValue {
  formData: JobFormData;
  errors: JobFormErrors;
  isSubmitting: boolean;
  updateField: <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}
