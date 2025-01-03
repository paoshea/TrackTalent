import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { ProfileData } from "../types/onboarding";
import type { UserRole } from "../types/auth";
import type { Database } from "../types/database";

const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MAX_UPLOAD_SIZE = Number(import.meta.env.VITE_MAX_UPLOAD_SIZE) || 5242880;
const APP_ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT || 'development';

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles'];

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
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Not authenticated');

      // Validate file uploads against MAX_UPLOAD_SIZE
      if (data.resume && data.resume.size > MAX_UPLOAD_SIZE) {
        throw new Error(`File size exceeds maximum limit of ${MAX_UPLOAD_SIZE / 1024 / 1024}MB`);
      }

      // Prepare profile data
      const profile = {
        id: user.id,
        email: data.email,
        full_name: `${data.firstName} ${data.lastName}`,
        avatar_url: data.avatar || null,
        updated_at: new Date().toISOString(),
        environment: APP_ENVIRONMENT,
        skills: data.skills || null,
        experience: data.experience as Record<string, unknown>[] || null,
        education: data.education as Record<string, unknown>[] || null
      } satisfies Profile['Insert'];

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert(profile);

      if (updateError) throw updateError;

      // Handle file upload to configured storage bucket
      if (data.resume) {
        const filePath = `resumes/${user.id}/${data.resume.name}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, data.resume, {
            upsert: true
          });
        
        if (uploadError) throw uploadError;

        // Get public URL for resume
        const { data: { publicUrl } } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(filePath);

        // Update profile with resume URL
        const resumeUpdate = {
          resume_url: publicUrl,
          updated_at: new Date().toISOString()
        } satisfies Profile['Update'];

        const { error: resumeUpdateError } = await supabase
          .from("profiles")
          .update(resumeUpdate)
          .eq("id", user.id);

        if (resumeUpdateError) throw resumeUpdateError;
      }

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
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Not authenticated');

      const update = {
        role: role as Profile['Row']['role'],
        environment: APP_ENVIRONMENT,
        updated_at: new Date().toISOString()
      } satisfies Profile['Update'];

      const { error: updateError } = await supabase
        .from("profiles")
        .update(update)
        .eq("id", user.id);

      if (updateError) throw updateError;
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
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Not authenticated');

      const newPreferences = selectedPreferences.includes(preference)
        ? selectedPreferences.filter((p) => p !== preference)
        : [...selectedPreferences, preference];

      const update = {
        preferences: newPreferences,
        environment: APP_ENVIRONMENT,
        updated_at: new Date().toISOString()
      } satisfies Profile['Update'];

      const { error: updateError } = await supabase
        .from("profiles")
        .update(update)
        .eq("id", user.id);

      if (updateError) throw updateError;
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
