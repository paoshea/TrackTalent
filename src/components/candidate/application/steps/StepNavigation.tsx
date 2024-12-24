interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
}: StepNavigationProps) {
  return (
    <div
      className="flex justify-between pt-6"
      role="group"
      aria-label="Form navigation"
    >
      {currentStep > 0 && (
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Go to previous step"
        >
          Previous
        </button>
      )}
      <button
        type={currentStep === totalSteps - 1 ? "submit" : "button"}
        onClick={currentStep === totalSteps - 1 ? undefined : onNext}
        className="ml-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        aria-label={
          currentStep === totalSteps - 1
            ? "Submit application"
            : "Go to next step"
        }
        disabled={currentStep === totalSteps - 1 && !onNext}
      >
        {currentStep === totalSteps - 1 ? "Submit Application" : "Next"}
      </button>
    </div>
  );
}
