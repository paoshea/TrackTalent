import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import {
  signInWithMockCredentials,
  getMockSession,
  mockSignUp,
  mockSignOut,
  mockResetPassword,
  mockUpdateUser,
  mockVerifyOtp
} from "../services/mockAuth";
import type { User } from "@supabase/supabase-js";
import type { SignUpData } from "../types/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ user: User }>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Use mock auth in development
const auth = import.meta.env.DEV ? {
  signInWithPassword: signInWithMockCredentials,
  getSession: getMockSession,
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    // Simulate initial auth state
    getMockSession().then(({ data: { session } }) => {
      callback("SIGNED_IN", session);
    });
    return {
      data: { subscription: { unsubscribe: () => {} } }
    };
  },
  signUp: mockSignUp,
  signOut: mockSignOut,
  resetPasswordForEmail: mockResetPassword,
  updateUser: mockUpdateUser,
  verifyOtp: mockVerifyOtp,
  getUser: () => getMockSession().then(({ data: { session } }) => ({ data: { user: session?.user ?? null }, error: null }))
} : supabase.auth;

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check active sessions and sets the user
    auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({
        ...prev,
        user: session?.user ?? null,
        isLoading: false,
      }));
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,
        user: session?.user ?? null,
        isLoading: false,
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<{ user: User }> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { data, error } = await auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data.user) throw new Error("No user returned from sign in");
      return { user: data.user };
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to sign in",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Sign up with email and password
      const { error: signUpError } = await auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            companyName: data.companyName,
          },
          emailRedirectTo: `${window.location.origin}/auth/verify-email`,
        }
      });
      if (signUpError) throw signUpError;

      const { data: userData } = await auth.getUser();
      if (!userData?.user?.id) {
        throw new Error('Failed to create user account');
      }
      
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userData.user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        company_name: data.companyName,
        email: data.email,
      });
      if (profileError) throw profileError;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to sign up",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { error } = await auth.signOut();
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to sign out",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { error } = await auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to reset password",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { error } = await auth.updateUser({
        password,
      });
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to update password",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { error } = await auth.updateUser(data);
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to update profile",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { error } = await auth.verifyOtp({
        token_hash: token,
        type: "email",
      });
      if (error) throw error;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Failed to verify email",
      }));
      throw error;
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const value: AuthContextValue = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export type { AuthContextValue };
