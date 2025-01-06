import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, AuthContextType, AuthCredentials, SignUpData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual authentication
      setUser({
        id: '1',
        role: 'candidate',
        email: credentials.email,
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: 'Test User',
          avatar_url: null,
          role: 'candidate'
        },
        app_metadata: {
          provider: 'email',
          role: 'candidate'
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual registration
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        role: data.role,
        email: data.email,
        name: data.full_name,
        company: data.company,
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: data.full_name,
          avatar_url: null,
          role: data.role
        },
        app_metadata: {
          provider: 'email',
          role: data.role
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual sign out
      setUser(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual password reset
      console.log('Password reset email sent to:', email);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Implement actual email verification
      console.log('Email verified with token:', token);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
