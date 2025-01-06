import { createContext, useContext, useState, useCallback } from 'react';
import { User, AuthContextType, SignUpData, AuthCredentials } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check if we have a saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }

    // For demo purposes, create a mock user
    if (process.env.NODE_ENV === 'development') {
      const mockUser: User = {
        id: '1',
        email: 'demo@example.com',
        role: 'candidate',
        name: 'Demo User',
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: 'Demo User',
          avatar_url: null,
          role: 'candidate',
        },
        app_metadata: {
          provider: 'email',
          role: 'candidate',
        },
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      return mockUser;
    }

    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: Math.random().toString(),
        email: credentials.email,
        role: 'candidate',
        name: 'Demo User',
        created_at: new Date().toISOString(),
        user_metadata: {
          full_name: 'Demo User',
          avatar_url: null,
          role: 'candidate',
        },
        app_metadata: {
          provider: 'email',
          role: 'candidate',
        },
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
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
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, just store the data
      localStorage.setItem('signupData', JSON.stringify(data));
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
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      localStorage.removeItem('user');
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
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, just log the email
      console.log('Reset password requested for:', email);
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
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, just log the token
      console.log('Email verification requested with token:', token);
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
  }, []);

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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
