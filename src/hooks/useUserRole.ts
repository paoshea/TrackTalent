import { useAuth } from "./useAuth";
import type { UserRole } from "../types/auth";
export type { UserRole };

interface UseUserRoleResult {
  role: UserRole;
  isLoading: boolean;
  error: string | null;
}

export function useUserRole(): UseUserRoleResult {
  const { user, isLoading, error } = useAuth();

  const role = user?.user_metadata?.role || "candidate";

  return {
    role: role as UserRole,
    isLoading,
    error,
  };
}
