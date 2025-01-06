import { useAuth } from './useAuth';
import type { UserRole } from '../types/auth';

interface UseUserRoleResult {
  role: UserRole | null;
  isLoading: boolean;
  error: Error | null;
}

export function useUserRole(): UseUserRoleResult {
  const { user, loading, error } = useAuth();

  if (error) {
    return {
      role: null,
      isLoading: false,
      error: new Error(error)
    };
  }

  if (loading) {
    return {
      role: null,
      isLoading: true,
      error: null
    };
  }

  if (!user) {
    return {
      role: null,
      isLoading: false,
      error: new Error('User not authenticated')
    };
  }

  return {
    role: user.role,
    isLoading: false,
    error: null
  };
}
