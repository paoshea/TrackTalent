import { supabase } from "../lib/supabase";
import type { Profile, ProfileUpdateData } from "../types/profile";
import type { UserRole } from "../types/auth";

// Database schema type matching actual table structure
interface DbUser {
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole | null;
  email: string;
  created_at: string;
}

// Application User type
export interface User {
  id: string;
  name: string;
  email: string;
  title?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  role?: UserRole;
  skills?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

// Transform database user to application user
function transformDbToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    name: dbUser.full_name || '',
    email: dbUser.email,
    avatar: dbUser.avatar_url || undefined,
    role: dbUser.role || undefined
  };
}

export async function searchUsers(query: string): Promise<User[]> {
  try {
    const result = await supabase
      .from("profiles")
      .select(
        `
        id,
        updated_at,
        username,
        full_name,
        avatar_url,
        role,
        email,
        created_at
      `,
      )
      .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(5);

    if (result.error) throw result.error;

    // Type guard to ensure each item has required DbUser properties
  const isValidDbUser = (item: unknown): item is DbUser => {
    if (!item || typeof item !== 'object') return false;
    const obj = item as Record<string, unknown>;
    return (
      typeof obj.id === 'string' &&
      typeof obj.email === 'string' &&
      (obj.role === null || ['candidate', 'employer', 'partner'].includes(obj.role as string))
    );
  };

    // Filter out any invalid items and transform valid ones
    return (result.data || [])
      .filter(isValidDbUser)
      .map(transformDbToUser);
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
    title: user.title || '',
    bio: user.bio || '',
    location: user.location || '',
    avatar_url: user.avatar,
    resume_url: undefined,
    skills: [],
    experience_years: 0,
    education: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function transformProfileToUser(profile: ProfileUpdateData): Partial<DbUser> {
  return {
    full_name: profile.full_name || null,
    avatar_url: profile.avatar_url || null
  };
}

export async function getProfile(userId: string): Promise<Profile> {
  try {
    const result = await supabase
      .from("profiles")
      .select(
        `
        id,
        updated_at,
        username,
        full_name,
        avatar_url,
        role,
        email,
        created_at
      `,
      )
      .eq("id", userId)
      .single();

    if (result.error) throw result.error;
    if (!result.data) throw new Error("Profile not found");

    // Type guard to ensure we have a valid DbUser
  const isValidDbUser = (item: unknown): item is DbUser => {
    if (!item || typeof item !== 'object') return false;
    const obj = item as Record<string, unknown>;
    return (
      typeof obj.id === 'string' &&
      typeof obj.email === 'string' &&
      (obj.role === null || ['candidate', 'employer', 'partner'].includes(obj.role as string))
    );
  };

    if (!isValidDbUser(result.data)) {
      throw new Error("Invalid profile data");
    }

    return transformUserToProfile(transformDbToUser(result.data));
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
    // Convert profile update to database fields
    const dbUpdate = transformProfileToUser(profile);

    const result = await supabase
      .from("profiles")
      .update(dbUpdate)
      .eq("id", userId)
      .select()
      .single();

    if (result.error) throw result.error;
    if (!result.data) throw new Error("Profile not found");

    // Type guard to ensure we have a valid DbUser
    const isValidDbUser = (item: unknown): item is DbUser => {
      if (!item || typeof item !== 'object') return false;
      const obj = item as Record<string, unknown>;
      return (
        typeof obj.id === 'string' &&
        typeof obj.email === 'string' &&
        (obj.role === null || ['candidate', 'employer', 'partner'].includes(obj.role as string))
      );
    };

    if (!isValidDbUser(result.data)) {
      throw new Error("Invalid profile data");
    }

    return transformUserToProfile(transformDbToUser(result.data));
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
