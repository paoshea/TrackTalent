import type { ApplicationFormStep } from "../../../../types/forms";

interface StepIndicatorProps {
  steps: ApplicationFormStep[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav
      className="flex justify-between items-center mb-8"
      aria-label="Progress"
    >
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center"
          aria-current={index === currentStep ? "step" : undefined}
        >
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center font-medium
              ${
                index === currentStep
                  ? "bg-indigo-600 text-white"
                  : index < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }
              ${index <= currentStep ? "cursor-default" : "cursor-not-allowed"}
            `}
          >
            <span className="sr-only">{`Step ${index + 1}:`}</span>
            <span aria-hidden="true">{index + 1}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-2 ${
                index < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </nav>
  );
}
