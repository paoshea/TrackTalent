import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
import type { User as AuthUser, UserProfile } from '../types/auth';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    }
  }
);

export async function getTypedSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  if (!session?.user) {
    return { user: null };
  }

  return {
    user: {
      id: session.user.id,
      email: session.user.email || '',
      role: (session.user.user_metadata?.role || 'candidate') as AuthUser['role'],
      created_at: session.user.created_at,
      updated_at: session.user.last_sign_in_at || session.user.created_at,
      email_confirmed_at: session.user.email_confirmed_at || undefined,
      app_metadata: session.user.app_metadata,
      user_metadata: session.user.user_metadata,
      aud: session.user.aud
    } as AuthUser
  };
}

export function validateProfile(data: any): UserProfile {
  if (!data.id || !data.email || !data.role) {
    throw new Error('Invalid profile data');
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    username: data.username,
    full_name: data.full_name,
    avatar_url: data.avatar_url,
    created_at: data.created_at,
    updated_at: data.updated_at,
    title: data.title,
    location: data.location,
    bio: data.bio,
    experience_years: data.experience_years
  };
}
