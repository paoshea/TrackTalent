import { useState, useEffect } from "react";
import { getProfile, updateProfile, uploadAvatar } from "../services/profile";
import { useAuth } from "./useAuth";
import type { Profile, ProfileUpdateData } from "../types/profile";

export function useProfile(userId?: string) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return;

    const loadProfile = async () => {
      try {
        const data = await getProfile(targetUserId);
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, userId]);

  const update = async (updates: ProfileUpdateData) => {
    if (!user) return;

    try {
      const updated = await updateProfile(user.id, updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError("Failed to update profile");
      throw err;
    }
  };

  const updateAvatar = async (file: File) => {
    if (!user) return;

    try {
      const url = await uploadAvatar(user.id, file);
      setProfile((prev) => (prev ? { ...prev, avatar_url: url } : null));
      return url;
    } catch (err) {
      setError("Failed to upload avatar");
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    update,
    updateAvatar,
  };
}
