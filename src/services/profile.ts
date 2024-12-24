import { supabase } from "../lib/supabase";
import type { Profile, ProfileUpdateData } from "../types/profile";

export interface User {
  id: string;
  name: string;
  email: string;
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  role?: string;
  skills?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export async function searchUsers(query: string): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        name,
        email,
        title,
        avatar,
        bio,
        location,
        company,
        role,
        skills,
        social
      `,
      )
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(5);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Failed to search users");
  }
}

function transformUserToProfile(user: User): Profile {
  return {
    id: user.id,
    user_id: user.id,
    full_name: user.name,
    title: user.title || "",
    bio: user.bio || "",
    location: user.location || "",
    avatar_url: user.avatar,
    skills: (user.skills || []).map((skillName) => ({
      id: `${user.id}-${skillName}`,
      name: skillName,
      category: "default",
      level: "beginner",
      endorsements: 0,
      yearsOfExperience: 0,
    })),
    experience_years: 0,
    education: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function transformProfileToUser(profile: ProfileUpdateData): Partial<User> {
  return {
    name: profile.full_name,
    title: profile.title,
    bio: profile.bio,
    location: profile.location,
    avatar: profile.avatar_url,
    skills: profile.skills?.map((skill) => skill.name),
  };
}

export async function getProfile(userId: string): Promise<Profile> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        name,
        email,
        title,
        avatar,
        bio,
        location,
        company,
        role,
        skills,
        social
      `,
      )
      .eq("id", userId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Profile not found");

    return transformUserToProfile(data);
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export async function updateProfile(
  userId: string,
  profile: ProfileUpdateData,
): Promise<Profile> {
  try {
    const userUpdate = transformProfileToUser(profile);
    const { data, error } = await supabase
      .from("profiles")
      .update(userUpdate)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Profile not found");

    return transformUserToProfile(data);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}

export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await updateProfile(userId, { avatar_url: publicUrl });

    return publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw new Error("Failed to upload avatar");
  }
}
