import type { User, AuthTokenResponse } from "@supabase/supabase-js";

// Mock user data for testing
export const mockUser: User = {
  id: "mock-user-id",
  app_metadata: {},
  user_metadata: {
    role: "candidate",
    firstName: "John",
    lastName: "Doe"
  },
  aud: "authenticated",
  created_at: new Date().toISOString(),
  email: "john.doe@example.com",
  phone: "",
  role: "authenticated"
};

export function getMockUser(): Promise<{ data: { user: User | null }, error: null }> {
  return Promise.resolve({
    data: { user: mockUser },
    error: null
  });
}

export function signInWithMockCredentials(
  _credentials: { email: string; password: string }
): Promise<AuthTokenResponse> {
  return Promise.resolve({
    data: {
      user: mockUser,
      session: {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) + 3600
      }
    },
    error: null
  });
}

export function mockSignUp(): Promise<AuthTokenResponse> {
  return Promise.resolve({
    data: {
      user: mockUser,
      session: {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) + 3600
      }
    },
    error: null
  });
}

export function mockSignOut(): Promise<{ error: null }> {
  return Promise.resolve({ error: null });
}

export function mockResetPassword(): Promise<{ error: null }> {
  return Promise.resolve({ error: null });
}

export function mockUpdateUser(): Promise<{ data: { user: User }, error: null }> {
  return Promise.resolve({
    data: { user: mockUser },
    error: null
  });
}

export function mockVerifyOtp(): Promise<{ error: null }> {
  return Promise.resolve({ error: null });
}

// Mock auth session response
export function getMockSession(): Promise<{ data: { session: { user: User } | null }, error: null }> {
  return Promise.resolve({
    data: { session: { user: mockUser } },
    error: null
  });
}
