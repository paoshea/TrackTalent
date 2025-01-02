import { createClient, AuthError } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';
import type { User, UserProfile } from '../types/auth';

// Custom error types
export class TokenRefreshError extends Error {
  constructor(message: string, public readonly status: number = 401) {
    super(message);
    this.name = 'TokenRefreshError';
  }
}

export class ProfileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProfileValidationError';
  }
}

// Type guard for auth errors
function isAuthError(error: unknown): error is AuthError {
  return (
    error instanceof Error && 
    'status' in error && 
    'name' in error && 
    error.name === 'AuthError'
  );
}

// Type guard for auth response
function isAuthResponse(data: unknown): data is { user: User } {
  if (!data || typeof data !== 'object') return false;
  
  const user = (data as any).user;
  if (!user || typeof user !== 'object') return false;
  
  // Check required User properties
  return (
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.role === 'string' &&
    typeof user.created_at === 'string' &&
    typeof user.updated_at === 'string' &&
    typeof user.aud === 'string' &&
    (!user.email_confirmed_at || typeof user.email_confirmed_at === 'string') &&
    typeof user.app_metadata === 'object' &&
    typeof user.user_metadata === 'object'
  );
}

// Type guard for profile data
function isValidProfile(data: unknown): data is UserProfile {
  if (!data || typeof data !== 'object') return false;
  
  const profile = data as any;
  return (
    typeof profile.id === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.role === 'string' &&
    typeof profile.created_at === 'string' &&
    (profile.updated_at === null || typeof profile.updated_at === 'string') &&
    (profile.username === null || typeof profile.username === 'string') &&
    (profile.full_name === null || typeof profile.full_name === 'string') &&
    (profile.avatar_url === null || typeof profile.avatar_url === 'string')
  );
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'track-talent'
    }
  }
});

// Helper for token refresh
async function refreshToken(): Promise<boolean> {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return !!session;
  } catch (error) {
    if (isAuthError(error)) {
      throw new TokenRefreshError(error.message, error.status);
    }
    throw error;
  }
}

// Add response interceptor for better error handling
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  const [resource, config] = args;
  const MAX_RETRIES = 3;
  let retries = 0;
  
  async function attemptFetch(): Promise<Response> {
    try {
      const response = await originalFetch(resource, config);
      
      // Clone the response so it can be used in multiple places
      const clone = response.clone();
      
      // Check if it's a Supabase request
      if (typeof resource === 'string' && resource.includes(supabaseUrl)) {
        if (!response.ok) {
          const error = await clone.json();
          
          // Handle auth errors
          if (response.status === 401) {
            if (retries < MAX_RETRIES) {
              retries++;
              try {
                // Attempt to refresh token
                const refreshed = await refreshToken();
                if (refreshed) {
                  // Retry with new token
                  return attemptFetch();
                }
              } catch (refreshError) {
                if (refreshError instanceof TokenRefreshError) {
                  // Clear session on refresh failure
                  await supabase.auth.signOut();
                  throw refreshError;
                }
              }
            }
            // Clear session on auth failure
            await supabase.auth.signOut();
          }
          
          console.error('Supabase request failed:', {
            url: resource,
            status: response.status,
            error,
            attempt: retries
          });
        }
      }
      
      return response;
    } catch (error) {
      if (isAuthError(error)) {
        console.error('Auth error:', error.message);
        if (error.status === 401 && retries < MAX_RETRIES) {
          retries++;
          return attemptFetch();
        }
      }
      console.error('Network request failed:', error);
      throw error;
    }
  }
  
  return attemptFetch();
};

// Export type-safe auth helpers
export const getTypedSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  // Validate session data
  if (!data.session?.user) {
    return { session: null, user: null };
  }
  
  const authData = { user: data.session.user };
  if (!isAuthResponse(authData)) {
    throw new Error('Invalid auth response format');
  }
  
  return {
    session: data.session,
    user: authData.user
  };
};

// Helper for profile validation
export const validateProfile = (data: unknown): UserProfile => {
  if (!isValidProfile(data)) {
    throw new ProfileValidationError('Invalid profile data structure');
  }
  return data;
};

export default supabase;
