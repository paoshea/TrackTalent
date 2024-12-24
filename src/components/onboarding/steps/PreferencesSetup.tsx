import { Check } from "lucide-react";
import type { PreferencesSetupProps } from "../../../types/onboarding";

const preferences = [
  {
    id: "remote",
    label: "Remote Work",
    description: "Open to remote positions",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description: "Mix of remote and office work",
  },
  {
    id: "onsite",
    label: "On-site",
    description: "Office-based positions",
  },
  {
    id: "fulltime",
    label: "Full-time",
    description: "Permanent positions",
  },
  {
    id: "contract",
    label: "Contract",
    description: "Fixed-term contracts",
  },
  {
    id: "parttime",
    label: "Part-time",
    description: "Flexible hours",
  },
  {
    id: "startup",
    label: "Startups",
    description: "Early-stage companies",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    description: "Large organizations",
  },
  {
    id: "international",
    label: "International",
    description: "Global opportunities",
  },
];

export function PreferencesSetup({
  selectedPreferences,
  onToggle,
  isLoading,
}: PreferencesSetupProps) {
  return (
    <div className="space-y-6" role="group" aria-label="Work preferences">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {preferences.map(({ id, label, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            disabled={isLoading}
            aria-pressed={selectedPreferences.includes(id)}
            className={`
              p-4 rounded-lg border-2 text-left transition-all relative
              ${
                selectedPreferences.includes(id)
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-200"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className="pr-8">
              <h3 className="font-medium text-gray-900">{label}</h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            {selectedPreferences.includes(id) && (
              <div className="absolute top-4 right-4">
                <Check className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
