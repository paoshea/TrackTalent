export type ValidationRuleType =
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "custom";

export type FormValue =
  | string
  | number
  | boolean
  | null
  | Array<string | number>;

export interface BaseValidationRule<T> {
  field: keyof T;
  type: ValidationRuleType;
  message: string;
  dependsOn?: Array<keyof T>;
}

export interface RequiredRule<T> extends BaseValidationRule<T> {
  type: "required";
}

export interface MinLengthRule<T> extends BaseValidationRule<T> {
  type: "minLength";
  value: number;
}

export interface MaxLengthRule<T> extends BaseValidationRule<T> {
  type: "maxLength";
  value: number;
}

export interface PatternRule<T> extends BaseValidationRule<T> {
  type: "pattern";
  value: RegExp | string;
}

export interface CustomRule<T> extends BaseValidationRule<T> {
  type: "custom";
  validate: (value: unknown, formData: T | undefined) => boolean;
}

export type ValidationRule<T> =
  | RequiredRule<T>
  | MinLengthRule<T>
  | MaxLengthRule<T>
  | PatternRule<T>
  | CustomRule<T>;

export interface FormField<T = unknown> {
  name: keyof T;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "radio"
    | "textarea";
  label: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: FormValue;
  options?: Array<{
    label: string;
    value: string | number | boolean;
  }>;
  validationRules?: ValidationRule<T>[];
  dependencies?: Array<keyof T>;
  transform?: (value: FormValue) => FormValue;
  format?: (value: FormValue) => string;
  parse?: (value: string) => FormValue;
  disabled?: boolean;
  hidden?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  rows?: number;
  cols?: number;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helperClassName?: string;
}

export interface FormContextValue<T> {
  formData: T;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  isDirty?: boolean;
  submitCount?: number;
  defaultValues?: Partial<T>;
}

export type FormAction<T> =
  | { type: "SET_FIELD"; field: keyof T; value: T[keyof T] }
  | { type: "SET_ERROR"; field: keyof T; error: string }
  | { type: "SET_TOUCHED"; field: keyof T; touched: boolean }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "SET_ALL"; data: Partial<FormState<T>> }
  | { type: "RESET" };

export interface FormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  revalidateOnChange?: boolean;
  touchOnChange?: boolean;
  touchOnBlur?: boolean;
  clearErrorOnChange?: boolean;
  clearErrorOnBlur?: boolean;
}

export interface FormStep<T> {
  id: string;
  title: string;
  description?: string;
  fields: Array<keyof T>;
  validationRules?: ValidationRule<T>[];
  isOptional?: boolean;
  dependsOn?: Array<keyof T>;
  component: React.ComponentType;
  onEnter?: () => void;
  onLeave?: () => void;
  canSkip?: boolean;
  skipCondition?: (data: T) => boolean;
}

export interface FormProgress {
  currentStep: number;
  completedSteps: string[];
  totalSteps: number;
  isStepValid: boolean;
  canProceed: boolean;
  percentComplete: number;
  visitedSteps?: string[];
  skippedSteps?: string[];
  errors?: Record<string, string[]>;
}

export interface FormError<T> {
  field: keyof T;
  message: string;
  type?: ValidationRuleType;
  meta?: Record<string, unknown>;
}

export interface FormConfig<T> {
  initialValues: T;
  validationRules: ValidationRule<T>[];
  fields: Record<keyof T, FormField<T>>;
  onSubmit: (values: T) => Promise<void>;
  options?: FormValidationOptions;
  transformers?: Record<keyof T, (value: FormValue) => FormValue>;
  formatters?: Record<keyof T, (value: FormValue) => string>;
  parsers?: Record<keyof T, (value: string) => FormValue>;
  dependencies?: Record<keyof T, Array<keyof T>>;
  validators?: Record<keyof T, ValidationRule<T>[]>;
}
