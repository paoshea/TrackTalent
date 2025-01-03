import { useAuth } from "./useAuth";
import type { UserRole } from "../types/auth";
export type { UserRole };

interface UseUserRoleResult {
  role: UserRole;
  isLoading: boolean;
  error: Error | null;
}

export function useUserRole(): UseUserRoleResult {
  const { user, isLoading, error } = useAuth();

  const userRole = user?.user_metadata?.role;
  
  // Validate that the role is a valid UserRole
  const isValidRole = (role: unknown): role is UserRole => 
    typeof role === 'string' && ["candidate", "employer", "partner"].includes(role);

  if (!isValidRole(userRole)) {
    return {
      role: "candidate" as UserRole, // Default to candidate if invalid
      isLoading,
      error: new Error("Invalid user role")
    };
  }

  return {
    role: userRole,
    isLoading,
    error,
  };
}
