import { createContext, useState } from "react";
import type { JobFormData } from "../types/jobs";
import type { JobFormContextValue, JobFormErrors } from "../types/forms";

const initialFormData: JobFormData = {
  title: "",
  description: "",
  location: "",
  type: "full-time",
  requirements: [],
  skills: [],
  compensation: {
    salary: {
      min: 0,
      max: 0,
      currency: "USD",
      period: "yearly",
    }
  },
  benefits: [],
  department: "",
  experienceLevel: "mid",
  remote: {
    allowed: false,
  },
};

const initialContext: JobFormContextValue = {
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
  updateField: () => {},
  handleSubmit: async () => {},
  resetForm: () => {},
};

export const JobFormContext =
  createContext<JobFormContextValue>(initialContext);

interface JobFormProviderProps {
  children: React.ReactNode;
  onSubmit: (data: JobFormData) => Promise<void>;
}

export function JobFormProvider({ children, onSubmit }: JobFormProviderProps) {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [errors, setErrors] = useState<JobFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: JobFormErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
    }

    if (formData.requirements.length === 0) {
      newErrors.requirements = "At least one requirement is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    if (formData.compensation.salary.max < formData.compensation.salary.min) {
      newErrors.compensation = "Maximum salary cannot be less than minimum salary";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = <K extends keyof JobFormData>(
    field: K,
    value: JobFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const value: JobFormContextValue = {
    formData,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
    resetForm,
  };

  return (
    <JobFormContext.Provider value={value}>{children}</JobFormContext.Provider>
  );
}
