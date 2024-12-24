import type { OnboardingStepProps } from "../../../types/onboarding";
import { Button } from "../../../components/shared/Button";
import { Input } from "../../../components/shared/Input";

export function ProfileSetup({
  data,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
}: OnboardingStepProps): JSX.Element {
  const profile = data.profile || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  };

  const handleChange = (
    field: keyof NonNullable<typeof data.profile>,
    value: string,
  ) => {
    onUpdate({
      profile: {
        ...profile,
        [field]: value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="First Name"
          value={profile.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          required
        />

        <Input
          label="Last Name"
          value={profile.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          required
        />

        <Input
          label="Email"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
          type="email"
          required
        />

        <Input
          label="Phone"
          value={profile.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          type="tel"
        />

        <Input
          label="Location"
          value={profile.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="City, Country"
        />

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Tell us about yourself"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Next
        </Button>
      </div>
    </form>
  );
}
