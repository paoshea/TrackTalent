export type UserRole = 'candidate' | 'employer' | 'partner';

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

export interface User {
  id: string;
  role: UserRole;
  email: string;
  name?: string;
  company?: string;
  created_at: string;
  user_metadata: {
    full_name: string;
    avatar_url: string | null;
    role: UserRole;
  };
  app_metadata: {
    provider: string;
    role: UserRole;
  };
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
