import { useState, useCallback, useRef } from "react";
import type {
  OnboardingData,
  OnboardingStepType,
  OnboardingConfig,
} from "../types/onboarding";

export function useOnboarding(config: OnboardingConfig) {
  const [data, setData] = useState<OnboardingData>({
    currentStep: config.steps[0],
    completedSteps: [],
    ...config.initialData,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use refs to track current state in callbacks
  const dataRef = useRef(data);
  dataRef.current = data;

  const currentStepIndex = config.steps.indexOf(data.currentStep);
  const isLastStep = currentStepIndex === config.steps.length - 1;

  const validateCurrentStep = useCallback(() => {
    const currentData = dataRef.current;
    if (!config.validation?.[currentData.currentStep]) return true;

    const stepErrors = config.validation[currentData.currentStep]!(currentData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }, [config.validation]);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData((prev) => ({
      ...prev,
      ...updates,
    }));
    setErrors({});
  }, []);

  const goToNextStep = useCallback(async () => {
    if (!validateCurrentStep()) return;

    const currentData = dataRef.current;
    const currentIndex = config.steps.indexOf(currentData.currentStep);
    const nextStepIndex = currentIndex + 1;

    if (nextStepIndex < config.steps.length) {
      setData((prev) => ({
        ...prev,
        currentStep: config.steps[nextStepIndex],
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }));
    }
  }, [config.steps, validateCurrentStep]);

  const goToPreviousStep = useCallback(() => {
    const currentData = dataRef.current;
    const currentIndex = config.steps.indexOf(currentData.currentStep);

    if (currentIndex > 0) {
      setData((prev) => ({
        ...prev,
        currentStep: config.steps[currentIndex - 1],
      }));
    }
  }, [config.steps]);

  const goToStep = useCallback(
    (step: OnboardingStepType) => {
      const stepIndex = config.steps.indexOf(step);
      if (stepIndex >= 0) {
        setData((prev) => ({
          ...prev,
          currentStep: step,
        }));
      }
    },
    [config.steps],
  );

  const completeOnboarding = useCallback(async () => {
    if (!validateCurrentStep()) return;

    try {
      setIsSubmitting(true);
      await config.onComplete(dataRef.current);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Failed to complete onboarding",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [config, validateCurrentStep]);

  return {
    data,
    currentStep: data.currentStep,
    completedSteps: data.completedSteps,
    isValid: validateCurrentStep(),
    isSubmitting,
    isLastStep,
    errors,
    updateData,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    completeOnboarding,
  };
}
