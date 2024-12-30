import { supabase } from "../lib/supabase";
import type { AuthCredentials, SignUpData } from "../types/auth";

export async function signIn({ email, password }: AuthCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  
  if (!data?.user) {
    throw new Error('Sign in failed. Please try again.');
  }

  return data;
}

export async function signUp(data: SignUpData) {
  const { email, password, ...metadata } = data;
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/verify-email`,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        redirectTo: `${window.location.origin}/auth/verify-email`
      });

      if (error) {
        if (error.status === 0 || error.message.includes('network')) {
          attempts++;
          if (attempts === maxRetries) {
            throw new Error('Network error. Please check your connection and try again.');
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          continue;
        }
        throw new Error(error.message);
      }

      if (!authData?.user) {
        throw new Error('Registration failed. Please try again.');
      }

      const { user, session } = authData;
      return {
        user,
        session,
        confirmEmail: !session
      };
    } catch (error) {
      if (attempts === maxRetries - 1) {
        console.error('SignUp error:', error);
        throw error instanceof Error ? error : new Error('Registration failed. Please try again later.');
      }
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
    }
  }
  const error = new Error('Registration failed after multiple attempts. Please try again later.');
  console.error('Final signup error:', error);
  throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function sendPasswordResetEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user ?? null;
}

export async function updateUserProfile(
  userId: string,
  data: Partial<SignUpData>,
) {
  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", userId);

  if (error) throw error;
}
