import { useState, useCallback } from "react";
import type { FormStep } from "../types/form";

export function useFormSteps<T>(steps: FormStep<T>[], onComplete: () => void) {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setCurrentStep(step);
      }
    },
    [steps.length],
  );

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  return {
    currentStep,
    goToStep,
    handleNext,
    handlePrev,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
  };
}
