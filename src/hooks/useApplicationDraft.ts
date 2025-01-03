import { useState, useCallback, useEffect } from "react";
import {
  saveApplicationDraft,
  getApplicationDraft,
  clearApplicationDraft,
} from "../utils/storage";
import type { ApplicationData } from "../types/applications";

interface DraftValidation {
  isValid: boolean;
  errors: Partial<Record<keyof ApplicationData, string>>;
}

export function useApplicationDraft(applicationId: string) {
  const [draft, setDraft] = useState<Partial<ApplicationData> | null>(null);
  const [validation, setValidation] = useState<DraftValidation>({
    isValid: false,
    errors: {},
  });

  useEffect(() => {
    const savedDraft = getApplicationDraft(applicationId);
    if (savedDraft) {
      setDraft(savedDraft);
      validateDraft(savedDraft);
    }
  }, [applicationId]);

  const validateDraft = (data: Partial<ApplicationData>): DraftValidation => {
    const errors: Partial<Record<keyof ApplicationData, string>> = {};

    // Required fields
    if (!data.coverLetter?.trim()) {
      errors.coverLetter = 'Cover letter is required';
    }

    if (!data.skills || data.skills.length === 0) {
      errors.skills = 'At least one skill is required';
    }

    if (!data.experience || data.experience.length === 0) {
      errors.experience = 'Experience details are required';
    } else {
      // Validate each experience entry
      const hasInvalidExperience = data.experience.some(exp => 
        !exp.company || !exp.title || !exp.startDate || !exp.description
      );
      if (hasInvalidExperience) {
        errors.experience = 'All experience fields must be completed';
      }
    }

    if (!data.education || data.education.length === 0) {
      errors.education = 'Education details are required';
    } else {
      // Validate each education entry
      const hasInvalidEducation = data.education.some(edu =>
        !edu.institution || !edu.degree || !edu.field || !edu.startDate
      );
      if (hasInvalidEducation) {
        errors.education = 'All education fields must be completed';
      }
    }

    // Optional references validation
    if (data.references?.length) {
      const hasInvalidReferences = data.references.some(ref =>
        !ref.name || !ref.title || !ref.company || !ref.email
      );
      if (hasInvalidReferences) {
        errors.references = 'All reference fields except phone must be completed';
      }
    }

    const isValid = Object.keys(errors).length === 0;
    const validation = { isValid, errors };
    setValidation(validation);
    return validation;
  };

  const saveDraft = useCallback(
    (data: Partial<ApplicationData>) => {
      const validation = validateDraft(data);
      if (validation.isValid || Object.keys(data).length === 0) {
        saveApplicationDraft(applicationId, data);
        setDraft(data);
      }
    },
    [applicationId],
  );

  const clearDraft = useCallback(() => {
    clearApplicationDraft(applicationId);
    setDraft(null);
    setValidation({ isValid: false, errors: {} });
  }, [applicationId]);

  return {
    draft,
    validation,
    saveDraft,
    clearDraft,
    validateDraft,
  };
}
