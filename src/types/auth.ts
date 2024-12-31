export type UserRole = 'candidate' | 'employer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
  is_active?: boolean;
  email_verified?: boolean;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  title?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  resume_url?: string;
  experience_years?: number;
  phone?: string;
  website?: string;
  linkedin_url?: string;
  github_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
  title?: string;
  location?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
