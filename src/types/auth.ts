export type UserRole = 'candidate' | 'employer' | 'partner';

export interface UserMetadata {
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
}

export interface AppMetadata {
  provider: string;
  role: UserRole;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  company?: string;
  created_at: string;
  user_metadata: UserMetadata;
  app_metadata: AppMetadata;
}

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
  company?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: AuthCredentials) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}
