export type UserRole = 'candidate' | 'employer' | 'partner';

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
    [key: string]: any;
  };
  user_metadata: {
    full_name?: string;
    [key: string]: any;
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
