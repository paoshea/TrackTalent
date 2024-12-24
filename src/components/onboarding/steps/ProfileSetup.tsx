import { useForm } from "react-hook-form";
import { FormField } from "../../shared/FormField";
import type { ProfileData, ProfileSetupProps } from "../../../types/onboarding";

export function ProfileSetup({
  onUpdate,
  isSubmitting,
  initialData,
}: ProfileSetupProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      location: initialData?.location || "",
    },
  });

  const handleFormSubmit = handleSubmit(async (formData: ProfileData) => {
    onUpdate({ profile: formData });
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <FormField label="First Name" error={errors.firstName?.message} required>
        <input
          type="text"
          {...register("firstName", { required: "First name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Last Name" error={errors.lastName?.message} required>
        <input
          type="text"
          {...register("lastName", { required: "Last name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message} required>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Phone" error={errors.phone?.message} required>
        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^\+?[\d\s-]+$/,
              message: "Invalid phone number",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Location" error={errors.location?.message} required>
        <input
          type="text"
          {...register("location", { required: "Location is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </FormField>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}
