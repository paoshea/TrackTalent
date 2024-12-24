import { useCallback } from "react";
import type { OnboardingStepProps } from "../../../types/onboarding";
import { Button } from "../../../components/shared/Button";
import { Select } from "../../../components/shared/Select";
import { Input } from "../../../components/shared/Input";

export function PreferencesSetup({
  data,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
}: OnboardingStepProps) {
  const handleChange = useCallback(
    (field: string, value: unknown) => {
      onUpdate({
        preferences: {
          ...data.preferences,
          [field]: value,
        },
      });
    },
    [data.preferences, onUpdate],
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Set Your Preferences
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Let&apos;s customize your experience based on your needs
        </p>
      </div>

      <div className="space-y-4">
        <Select
          label="Communication Frequency"
          value={data.preferences?.communicationFrequency || "weekly"}
          onChange={(value) => handleChange("communicationFrequency", value)}
          options={[
            { label: "Daily Updates", value: "daily" },
            { label: "Weekly Summary", value: "weekly" },
            { label: "Monthly Report", value: "monthly" },
          ]}
        />

        <Select
          label="Notification Method"
          value={data.preferences?.notificationMethod || "email"}
          onChange={(value) => handleChange("notificationMethod", value)}
          options={[
            { label: "Email", value: "email" },
            { label: "In-app", value: "in-app" },
            { label: "Both", value: "both" },
          ]}
        />

        <Input
          label="Time Zone"
          type="text"
          value={data.preferences?.timezone || ""}
          onChange={(e) => handleChange("timezone", e.target.value)}
          placeholder="e.g., America/New_York"
        />
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
