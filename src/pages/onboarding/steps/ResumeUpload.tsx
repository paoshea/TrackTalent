import { ResumeUploader } from "../../../components/profile/ResumeUploader";
import type { OnboardingStepProps } from "../../../types/onboarding";

export function ResumeUpload({ onNext, onBack }: Pick<OnboardingStepProps, 'onNext' | 'onBack'>) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Upload Your Resume</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload your resume to help us better match you with opportunities
        </p>
      </div>
      
      <ResumeUploader />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
