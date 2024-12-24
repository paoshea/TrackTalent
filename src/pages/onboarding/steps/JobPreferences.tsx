import { useCallback, useMemo } from "react";
import type { OnboardingStepProps, JobType } from "../../../types/onboarding";
import { JOB_TYPES } from "../../../types/onboarding";
import { Button } from "../../../components/shared/Button";
import { Select } from "../../../components/shared/Select";
import { Input } from "../../../components/shared/Input";

type RemotePreference = "remote" | "hybrid" | "onsite";

interface PreferencesData {
  jobTypes: JobType[];
  locations: string[];
  remotePreference: RemotePreference;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  industries: string[];
  skills: string[];
}

const defaultPreferences: PreferencesData = {
  jobTypes: [JOB_TYPES[0]],
  locations: [],
  remotePreference: "remote",
  salaryRange: {
    min: 0,
    max: 0,
    currency: "USD",
  },
  industries: [],
  skills: [],
};

export function JobPreferences({
  data,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
}: OnboardingStepProps) {
  const preferences = useMemo(() => {
    if (!data.preferences) return defaultPreferences;

    return {
      ...defaultPreferences,
      ...data.preferences,
      salaryRange: {
        ...defaultPreferences.salaryRange,
        ...data.preferences.salaryRange,
      },
    };
  }, [data.preferences]);

  const handleChange = useCallback(
    (field: keyof PreferencesData, value: unknown) => {
      onUpdate({
        preferences: {
          ...preferences,
          [field]: value,
        },
      });
    },
    [preferences, onUpdate],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Job Preferences</h2>
        <p className="mt-1 text-sm text-gray-500">
          Let&apos;s understand what you&apos;re looking for in your next role
        </p>
      </div>

      <div className="space-y-4">
        <Select<JobType>
          label="Job Type"
          value={preferences.jobTypes[0]}
          onChange={(value) => handleChange("jobTypes", [value])}
          options={JOB_TYPES.map((type) => ({
            label: type,
            value: type,
          }))}
          required
        />

        <Select<RemotePreference>
          label="Work Location"
          value={preferences.remotePreference}
          onChange={(value) => handleChange("remotePreference", value)}
          options={[
            { label: "Remote Only", value: "remote" },
            { label: "Hybrid", value: "hybrid" },
            { label: "On-site", value: "onsite" },
          ]}
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Minimum Salary"
            type="number"
            value={preferences.salaryRange.min.toString()}
            onChange={(e) =>
              handleChange("salaryRange", {
                ...preferences.salaryRange,
                min: parseInt(e.target.value) || 0,
              })
            }
            min="0"
          />

          <Input
            label="Maximum Salary"
            type="number"
            value={preferences.salaryRange.max.toString()}
            onChange={(e) =>
              handleChange("salaryRange", {
                ...preferences.salaryRange,
                max: parseInt(e.target.value) || 0,
              })
            }
            min="0"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          disabled={isSubmitting}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
