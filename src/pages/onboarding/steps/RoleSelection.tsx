import type { OnboardingStepProps } from "../../../types/onboarding";

export function RoleSelection({
  data,
  onUpdate,
  onNext,
  isSubmitting,
}: OnboardingStepProps): JSX.Element {
  const handleRoleSelect = (role: "candidate" | "employer") => {
    onUpdate({ role });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Select Your Role</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to use TalentTrack
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleRoleSelect("candidate")}
          disabled={isSubmitting}
          className={`relative rounded-lg border p-4 flex flex-col items-center space-y-4 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            data.role === "candidate"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100">
            {/* Icon */}
            <span className="text-2xl">👤</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Job Seeker</h3>
            <p className="mt-1 text-sm text-gray-500">
              Find your next opportunity and showcase your talents
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleRoleSelect("employer")}
          disabled={isSubmitting}
          className={`relative rounded-lg border p-4 flex flex-col items-center space-y-4 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            data.role === "employer"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100">
            {/* Icon */}
            <span className="text-2xl">🏢</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Employer</h3>
            <p className="mt-1 text-sm text-gray-500">
              Find and hire top talent for your organization
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
