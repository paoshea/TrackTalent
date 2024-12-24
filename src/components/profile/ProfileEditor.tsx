import React from "react";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";
import { FormField } from "../shared/FormField";
import { useProfile } from "../../hooks/useProfile";
import type { ProfileUpdateData } from "../../types/profile";

export function ProfileEditor() {
  const { profile, update, updateAvatar, loading } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUpdateData>({
    defaultValues: profile || undefined,
  });

  const onSubmit = async (data: ProfileUpdateData) => {
    try {
      await update(data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await updateAvatar(file);
      } catch (error) {
        console.error("Failed to update avatar:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profile?.avatar_url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
            <Camera className="h-5 w-5 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-900">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Update your profile information and manage your account settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField label="Full Name" error={errors.full_name?.message} required>
          <input
            type="text"
            {...register("full_name", { required: "Full name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Professional Title"
          error={errors.title?.message}
          required
        >
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField label="Location" error={errors.location?.message} required>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField
          label="Years of Experience"
          error={errors.experience_years?.message}
          required
        >
          <input
            type="number"
            {...register("experience_years", {
              required: "Experience years is required",
              min: { value: 0, message: "Must be 0 or greater" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <FormField label="Bio" error={errors.bio?.message}>
        <textarea
          {...register("bio")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </FormField>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
