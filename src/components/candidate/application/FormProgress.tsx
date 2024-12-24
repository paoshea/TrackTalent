import { getStepProgress } from "../../../utils/formHelpers";
import type { ApplicationData } from "../../../types/candidate";
import type { ApplicationFormStep } from "../../../types/candidate";

interface FormProgressProps {
  data: Partial<ApplicationData>;
  currentStep: ApplicationFormStep;
}

export function FormProgress({ data, currentStep }: FormProgressProps) {
  const progress = getStepProgress(currentStep, data);

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span id="progress-label">Application Progress</span>
        <span aria-hidden="true">{progress}%</span>
      </div>
      <div
        className="w-full bg-gray-200 rounded-full h-2"
        role="progressbar"
        aria-labelledby="progress-label"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <span className="sr-only">{progress}% complete</span>
      </div>
    </div>
  );
}
