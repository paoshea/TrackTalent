import type { ReactNode } from "react";
import type {
  OnboardingStepProps,
  OnboardingStep as OnboardingStepType,
} from "../../types/onboarding";

interface ExtendedOnboardingStepProps
  extends Omit<OnboardingStepProps, "onNext"> {
  step: OnboardingStepType;
  stepNumber: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious?: () => void;
  onSkip?: () => void;
  children: ReactNode;
}

export function OnboardingStep({
  step,
  stepNumber,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  children,
}: ExtendedOnboardingStepProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{step.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{step.description}</p>
        </div>
        <div className="text-sm text-gray-500">
          Step {stepNumber} of {totalSteps}
        </div>
      </div>

      <div className="py-4">{children}</div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          {stepNumber > 1 && onPrevious && (
            <button
              type="button"
              onClick={onPrevious}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Previous
            </button>
          )}
        </div>
        <div className="flex gap-3">
          {onSkip && stepNumber < totalSteps && (
            <button
              type="button"
              onClick={onSkip}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Skip
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {stepNumber === totalSteps ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
