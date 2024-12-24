import type { Skill } from "./skills";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  title: string;
  bio: string;
  location: string;
  avatar_url?: string;
  resume_url?: string;
  skills: Skill[];
  experience_years: number;
  education: Education[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  current: boolean;
}

export interface ProfileUpdateData
  extends Partial<
    Omit<Profile, "id" | "user_id" | "created_at" | "updated_at">
  > {}
