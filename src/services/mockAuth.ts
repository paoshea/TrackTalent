import type { User, AuthTokenResponse } from "@supabase/supabase-js";

// Mock database of users
const mockUsers = new Map<string, User>();

// Add initial mock user
const initialMockUser: User = {
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

// Only add the initial user if email is defined
if (initialMockUser.email) {
  mockUsers.set(initialMockUser.email, initialMockUser);
}

export function getMockUser(): Promise<{ data: { user: User | null }, error: null }> {
  return Promise.resolve({
    data: { user: initialMockUser },
    error: null
  });
}

export function signInWithMockCredentials(
  credentials: { email: string; password: string }
): Promise<AuthTokenResponse> {
  const user = mockUsers.get(credentials.email);
  
  if (!user) {
    return Promise.reject(new Error("Invalid email or password"));
  }

  return Promise.resolve({
    data: {
      user,
      session: {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user,
        expires_at: Math.floor(Date.now() / 1000) + 3600
      }
    },
    error: null
  });
}

interface SignUpOptions {
  email: string;
  password: string;
  options?: {
    data?: {
      firstName?: string;
      lastName?: string;
      role?: string;
      companyName?: string;
    };
  };
}

export function mockSignUp(data: SignUpOptions): Promise<AuthTokenResponse> {
  // Check if user already exists
  if (mockUsers.has(data.email)) {
    return Promise.reject(new Error("User with this email already exists"));
  }

  // Create new mock user
  const newUser: User = {
    id: `mock-user-${Math.random().toString(36).substr(2, 9)}`,
    app_metadata: {},
    user_metadata: {
      ...data.options?.data,
      role: data.options?.data?.role || "candidate"
    },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: data.email,
    phone: "",
    role: "authenticated"
  };

  // Add user to mock database
  mockUsers.set(data.email, newUser);

  return Promise.resolve({
    data: {
      user: newUser,
      session: {
        access_token: "mock-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
        user: newUser,
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

export function mockUpdateUser(updates: any): Promise<{ data: { user: User }, error: null }> {
  const updatedUser = {
    ...initialMockUser,
    user_metadata: {
      ...initialMockUser.user_metadata,
      ...updates
    }
  };
  return Promise.resolve({
    data: { user: updatedUser },
    error: null
  });
}

export function mockVerifyOtp(): Promise<{ error: null }> {
  return Promise.resolve({ error: null });
}

// Mock auth session response
export function getMockSession(): Promise<{ data: { session: { user: User } | null }, error: null }> {
  return Promise.resolve({
    data: { session: { user: initialMockUser } },
    error: null
  });
}
