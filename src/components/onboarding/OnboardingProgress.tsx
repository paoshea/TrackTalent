import { useMemo } from "react";
import type {
  OnboardingStepType,
  OnboardingProgressProps,
} from "../../types/onboarding";

export function OnboardingProgress({
  currentStep,
  completedSteps,
  totalSteps,
  onStepClick,
}: OnboardingProgressProps) {
  const progress = useMemo(() => {
    return Math.round((completedSteps.length / totalSteps) * 100);
  }, [completedSteps.length, totalSteps]);

  const getStepStatus = (
    step: OnboardingStepType,
  ): "completed" | "current" | "upcoming" => {
    if (completedSteps.includes(step)) return "completed";
    if (step === currentStep) return "current";
    return "upcoming";
  };

  const getStepClasses = (
    status: "completed" | "current" | "upcoming",
  ): string => {
    const baseClasses =
      "relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-blue-600 text-white`;
      case "current":
        return `${baseClasses} bg-blue-100 text-blue-600 border-2 border-blue-600`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-500`;
    }
  };

  const getConnectorClasses = (index: number): string => {
    const baseClasses = "absolute top-4 w-full h-0.5 -ml-4";
    if (index === 0) return "";
    return completedSteps.length > index
      ? `${baseClasses} bg-blue-600`
      : `${baseClasses} bg-gray-200`;
  };

  const steps: OnboardingStepType[] = [
    "role-selection",
    "profile-setup",
    "preferences-setup",
    "team-setup",
    "company-info",
  ];

  const renderStep = (step: OnboardingStepType, index: number): JSX.Element => {
    const status = getStepStatus(step);
    const isClickable = status === "completed" || status === "current";

    return (
      <div key={`step-${index}`} className="relative flex-1">
        {index > 0 && <div className={getConnectorClasses(index)} />}
        <button
          type="button"
          onClick={() => isClickable && onStepClick?.(step)}
          disabled={!isClickable}
          className={`${getStepClasses(status)} ${
            isClickable
              ? "cursor-pointer hover:bg-opacity-80"
              : "cursor-not-allowed"
          }`}
          aria-current={status === "current" ? "step" : undefined}
        >
          {index + 1}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => renderStep(step, index))}
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-900">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="overflow-hidden bg-gray-200 rounded-full h-2">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
