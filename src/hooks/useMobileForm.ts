import { useState, useCallback, useRef, useEffect } from 'react';

interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

interface FieldValidation {
  [key: string]: ValidationRule[];
}

interface FormConfig<T> {
  validations?: FieldValidation;
  onSubmit?: (data: T) => Promise<void>;
  initialData?: T;
}

type FormDataValue = string | number | boolean;

// Make all properties of T assignable to FormDataValue
type ValidFormData<T> = {
  [K in keyof T]: T[K] extends FormDataValue ? T[K] : never;
};

export const useMobileForm = <T extends ValidFormData<T>>(config: FormConfig<T> = {}) => {
  const { validations = {}, onSubmit, initialData = {} } = config;
  const [formData, setFormData] = useState<T>(initialData as T);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  // Track active input for scroll management
  const activeInput = useRef<HTMLInputElement | null>(null);

  // Validate a single field
  const validateField = useCallback((name: string, value: string) => {
    if (!validations[name]) return '';

    for (const rule of validations[name]) {
      if (!rule.validate(value)) {
        return rule.message;
      }
    }

    return '';
  }, [validations]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(validations).forEach(fieldName => {
      const value = String(formData[fieldName as keyof T] || '');
      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField, validations]);

  // Handle field change
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value } as T));

    // Only validate if field has been touched
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [touchedFields, validateField]);

  // Handle field blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
    } catch (error) {
      // Handle submission error
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle keyboard appearance
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement) {
        activeInput.current = e.target;
        // Add a small delay to ensure the keyboard is shown
        setTimeout(() => {
          activeInput.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    };

    const handleBlur = () => {
      activeInput.current = null;
    };

    // Listen for focus events on the form
    const form = formRef.current;
    if (form) {
      form.addEventListener('focusin', handleFocus);
      form.addEventListener('focusout', handleBlur);
    }

    return () => {
      if (form) {
        form.removeEventListener('focusin', handleFocus);
        form.removeEventListener('focusout', handleBlur);
      }
    };
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    formRef,
    handleChange,
    handleBlur,
    handleSubmit,
    setFormData,
    validateForm,
    validateField,
  };
};

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    validate: (value: string) => value.trim() !== '',
    message,
  }),
  email: (message = 'Please enter a valid email'): ValidationRule => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule => ({
    validate: (value: string) => value.length >= length,
    message,
  }),
  maxLength: (length: number, message = `Must be no more than ${length} characters`): ValidationRule => ({
    validate: (value: string) => value.length <= length,
    message,
  }),
  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validate: (value: string) => regex.test(value),
    message,
  }),
};
