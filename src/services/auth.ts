import { supabase } from "../lib/supabase";
import type { AuthCredentials, SignUpData } from "../types/auth";

export async function signIn({ email, password }: AuthCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp(data: SignUpData) {
  const { email, password, ...metadata } = data;

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/verify-email`,
    },
  });

  if (error) throw error;
  if (!authData.user) throw new Error('Signup failed');
  
  return {
    user: authData.user,
    session: authData.session,
    confirmEmail: !authData.session // If no session, email confirmation is required
  };
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
