import type { JobFormData } from "./jobs";

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
