import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { ProfileData } from "../types/onboarding";
import type { UserRole } from "../types/auth";

export function useOnboardingData() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>("candidate");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileSubmit = async (data: ProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("profiles").upsert({
        ...data,
        id: (await supabase.auth.getUser()).data.user?.id,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setProfileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = async (role: UserRole) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      setSelectedRole(role);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceToggle = async (preference: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newPreferences = selectedPreferences.includes(preference)
        ? selectedPreferences.filter((p) => p !== preference)
        : [...selectedPreferences, preference];

      const { error } = await supabase
        .from("profiles")
        .update({ preferences: newPreferences })
        .eq("id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
      setSelectedPreferences(newPreferences);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update preferences",
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileData,
    selectedRole,
    selectedPreferences,
    handleProfileSubmit,
    handleRoleSelect,
    handlePreferenceToggle,
    isLoading,
    error,
  };
}
