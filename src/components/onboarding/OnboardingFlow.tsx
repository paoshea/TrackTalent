import { useState } from "react";
import { useFormContext } from "../../contexts/FormContext";
import { StepContent } from "./StepContent";
import type { OnboardingStep } from "../../types/onboarding";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps: OnboardingStep[] = [
  {
    id: "profile",
    title: "Profile Setup",
    description: "Set up your personal profile",
    isComplete: false,
  },
  {
    id: "company",
    title: "Company Information",
    description: "Tell us about your company",
    isComplete: false,
  },
  {
    id: "preferences",
    title: "Job Preferences",
    description: "Define your hiring preferences",
    isComplete: false,
  },
  {
    id: "team",
    title: "Team Setup",
    description: "Add your team members",
    isOptional: true,
    isComplete: false,
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepsState, setStepsState] = useState<OnboardingStep[]>(steps);
  const { formData: data } = useFormContext();

  const handleNext = () => {
    setStepsState((prev) =>
      prev.map((step, index) =>
        index === currentStepIndex ? { ...step, isComplete: true } : step,
      ),
    );

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (stepsState[currentStepIndex].isOptional) {
      handleNext();
    }
  };

  const handleUpdate = (newData: Partial<typeof data>) => {
    // This would be handled by FormContext in a real implementation
    console.log("Updating data:", newData);
  };

  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            />
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-900">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <StepContent
          step={stepsState[currentStepIndex]}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
          isFirstStep={currentStepIndex === 0}
          isLastStep={currentStepIndex === steps.length - 1}
          data={data}
          onUpdate={handleUpdate}
          isSubmitting={false}
        />
      </div>
    </div>
  );
}
