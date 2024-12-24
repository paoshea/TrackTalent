export type UserRole = "candidate" | "employer" | "admin";

export interface UserMetadata {
  onboardingCompleted?: boolean;
  preferences?: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    theme?: "light" | "dark" | "system";
    language?: string;
  };
  customFields?: Record<string, string | number | boolean | null>;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  metadata?: UserMetadata;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SIGN_OUT" };

export interface PasswordResetData {
  email: string;
  token: string;
  newPassword: string;
}

export interface EmailVerificationData {
  email: string;
  token: string;
}
