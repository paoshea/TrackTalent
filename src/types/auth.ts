export type UserRole = 'candidate' | 'employer' | 'partner';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  email_confirmed_at?: string;
  app_metadata: {
    provider?: string;
    role?: UserRole;
    [key: string]: unknown;
  };
  user_metadata: {
    full_name?: string;
    [key: string]: unknown;
  };
  aud: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  email: string;
  created_at: string;
  title?: string;
  location?: string;
  bio?: string;
  experience_years?: number;
}

export interface EmployerProfile extends UserProfile {
  company_name: string;
  company_size?: string;
  industry?: string;
}

export interface PartnerProfile extends UserProfile {
  company_name: string;
  company_size?: string;
  industry?: string;
  service_areas?: string[];
  specializations?: string[];
}

export interface CandidateProfile extends UserProfile {
  skills?: string[];
  education?: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  experience?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
}

export interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<{ user: User }>;
  signOut: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}
