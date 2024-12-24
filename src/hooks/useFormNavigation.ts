import { useState, useCallback } from "react";
import { isStepAccessible } from "../utils/formProgress";
import type { FormStep } from "../types/form";

export function useFormNavigation<T>(steps: FormStep<T>[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const canNavigateToStep = useCallback(
    (step: number) => {
      return isStepAccessible(step, currentStep, completedSteps, steps);
    },
    [currentStep, completedSteps, steps],
  );

  const navigateToStep = useCallback(
    (step: number) => {
      if (canNavigateToStep(step)) {
        setCurrentStep(step);
      }
    },
    [canNavigateToStep],
  );

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps((prev) => new Set([...prev, step]));
  }, []);

  return {
    currentStep,
    navigateToStep,
    markStepComplete,
    canNavigateToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}
