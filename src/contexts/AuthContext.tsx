import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase, getTypedSession, validateProfile } from "../lib/supabase";
import type { User as AuthUser, SignUpData, UserProfile, AuthContextValue, UserRole } from "../types/auth";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Convert Supabase user to our User type
export function mapSupabaseUser(user: SupabaseUser): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    role: (user.user_metadata?.role || 'candidate') as AuthUser['role'],
    created_at: user.created_at,
    updated_at: user.last_sign_in_at || user.created_at,
    email_confirmed_at: user.email_confirmed_at || undefined,
    app_metadata: user.app_metadata,
    user_metadata: user.user_metadata,
    aud: user.aud
  };
}

export interface AuthState {
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const { user } = await getTypedSession();
        if (user) {
          const profile = await fetchProfile(user.id);
          setState(prev => ({
            ...prev,
            user,
            profile,
            isLoading: false,
          }));
        } else {
          setState(prev => ({
            ...prev,
            user: null,
            profile: null,
            isLoading: false,
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Failed to initialize auth'),
          isLoading: false,
        }));
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          const user = mapSupabaseUser(session.user);
          const profile = await fetchProfile(user.id);
          setState(prev => ({
            ...prev,
            user,
            profile,
            isLoading: false,
            error: null, // Clear any previous errors
          }));
        } else {
          setState(prev => ({
            ...prev,
            user: null,
            profile: null,
            isLoading: false,
            error: null, // Clear any previous errors
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Auth state change failed'),
          isLoading: false,
        }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Profile not found');
      }

      // Validate role before passing to validateProfile
      const role = data.role as UserRole | null;
      if (role !== null && role !== 'candidate' && role !== 'employer' && role !== 'partner') {
        throw new Error(`Invalid role: ${role}`);
      }
      
      return validateProfile({
        ...data,
        role
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<{ user: AuthUser }> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (!data.user) throw new Error("No user returned from sign in");
      
      const profile = await fetchProfile(data.user.id);
      const mappedUser = mapSupabaseUser(data.user);
      setState(prev => ({
        ...prev,
        user: mappedUser,
        profile,
        isLoading: false,
      }));
      
      return { user: mappedUser };
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to sign in"),
        isLoading: false,
      }));
      throw error;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      // Sign up with email and password
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: data.role,
            full_name: data.full_name,
            username: data.email.split('@')[0] // Generate username from email
          }
        }
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        throw signUpError;
      }
      
      if (!authData?.user) {
        throw new Error('Failed to create user account');
      }

      // Profile is created automatically by the trigger
      const profile = await fetchProfile(authData.user.id);
      const mappedUser = mapSupabaseUser(authData.user);
      setState(prev => ({
        ...prev,
        user: mappedUser,
        profile,
        isLoading: false,
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to sign up"),
        isLoading: false,
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setState(prev => ({
        ...prev,
        user: null,
        profile: null,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to sign out"),
        isLoading: false,
      }));
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to reset password"),
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to update password"),
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      if (!state.user) throw new Error("No authenticated user");

      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq("id", state.user.id);

      if (error) throw error;

      const updatedProfile = await fetchProfile(state.user.id);
      setState(prev => ({
        ...prev,
        profile: updatedProfile,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to update profile"),
        isLoading: false,
      }));
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "email",
      });
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to verify email"),
      }));
      throw error;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
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
