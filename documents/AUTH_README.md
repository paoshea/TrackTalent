# Authentication System Documentation

## Architecture Overview

The authentication system is built with a layered architecture that supports both real Supabase backend and mock implementations for development/testing:

```
┌─ Application Layer ─┐    ┌─ Auth Layer ─┐    ┌─ Backend Layer ─┐
│                     │    │              │    │                 │
│  Components ────────┼───►│ AuthContext  │◄──►│  Supabase      │
│  Pages        useAuth   │              │    │  Mock Service   │
│                     │    │              │    │                 │
└─────────────────────┘    └──────────────┘    └─────────────────┘
```

## Core Files and Their Roles

### Type Definitions (`src/types/auth.ts`)
- Defines core authentication types used throughout the application
- Contains interfaces for User, UserProfile, and AuthContext
- Ensures type safety across the authentication system
```typescript
export type UserRole = 'candidate' | 'employer' | 'partner';
export interface User { ... }
export interface UserProfile { ... }
export interface AuthContextValue { ... }
```

### Auth Context (`src/contexts/AuthContext.tsx`)
- Provides authentication state and methods to the entire application
- Manages user sessions and profile data
- Handles communication with Supabase/mock backend
- Implements error handling and loading states
```typescript
export const AuthContext = createContext<AuthContextValue | null>(null);
export function useAuth(): AuthContextValue;
```

### Mock Service (`src/services/mockAuth.ts`)
- Provides a mock implementation of authentication services
- Mimics Supabase's behavior for development/testing
- Maintains in-memory user and profile data
- Simulates network delays and error conditions
```typescript
export class MockAuthService {
  async signIn(): Promise<{ user: User }>;
  async signUp(data: SignUpData): Promise<void>;
  // ... other auth methods
}
```

## Authentication Flows

### Registration Flow - Current state
Development environment has been updated with streamlined authentication:

Authentication Flow:
Email verification requirement removed
Immediate sign-in after registration
Profile creation handled by database trigger
Session management simplified
Development Setup:

# Start development environment
./scripts/setup-supabase.sh
npm run dev
Available Demo Accounts:

Candidate: candidate@demo.com
Employer: employer@demo.com
Partner: partner@demo.com
Local Services:

Frontend: http://localhost:3001
Supabase Studio: http://localhost:54323
API: http://localhost:54321
Note: Email verification functionality is in place but disabled for development. The code remains ready for future implementation when email service is configured.

### Registration Flow - Future state
1. User Input Collection:
   ```typescript
   interface SignUpData {
     email: string;
     password: string;
     role: UserRole;
     full_name: string;
     // Optional fields
     title?: string;
     location?: string;
     company_name?: string;
     company_size?: string;
   }
   ```

2. Account Creation:
   ```typescript
   const { data: authData, error } = await supabase.auth.signUp({
     email: data.email,
     password: data.password,
     options: {
       data: { role: data.role, full_name: data.full_name },
       emailRedirectTo: `${window.location.origin}/auth/callback`
     }
   });
   ```

3. Profile Creation:
   ```typescript
   const profileData = {
     id: authData.user.id,
     user_id: authData.user.id,
     full_name: data.full_name,
     email: data.email,
     role: data.role,
     // ... other profile fields
   };
   await supabase.from('profiles').insert(profileData);
   ```

### Login Flow
1. Authentication:
   ```typescript
   const { data, error } = await supabase.auth.signInWithPassword({
     email,
     password,
   });
   ```

2. Profile Fetching:
   ```typescript
   const profile = await fetchProfile(data.user.id);
   ```

3. User Mapping:
   ```typescript
   const mappedUser = mapSupabaseUser(data.user);
   setState({ user: mappedUser, profile, isLoading: false });
   ```

### Profile Management
- Update Profile:
  ```typescript
  async updateProfile(data: Partial<UserProfile>): Promise<void> {
    const { error } = await supabase
      .from("profiles")
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", userId);
  }
  ```

- Password Reset:
  ```typescript
  async resetPassword(email: string): Promise<void> {
    await supabase.auth.resetPasswordForEmail(email);
  }
  ```

## Error Handling

### Custom Error Types
```typescript
// Custom error types for specific failures
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
```

### Runtime Type Guards
```typescript
// Type guard for auth errors
function isAuthError(error: unknown): error is AuthError {
  return (
    error instanceof Error && 
    'status' in error && 
    'name' in error && 
    error.name === 'AuthError'
  );
}

// Type guard for profile data
function isValidProfile(data: unknown): data is UserProfile {
  if (!data || typeof data !== 'object') return false;
  return (
    typeof data.id === 'string' &&
    typeof data.user_id === 'string' &&
    // ... other field validations
  );
}
```

### Token Refresh Mechanism
```typescript
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
```

### Error Recovery
```typescript
// Automatic retry with token refresh
if (response.status === 401) {
  if (retries < MAX_RETRIES) {
    try {
      const refreshed = await refreshToken();
      if (refreshed) {
        return attemptFetch(); // Retry request
      }
    } catch (refreshError) {
      if (refreshError instanceof TokenRefreshError) {
        await supabase.auth.signOut();
        throw refreshError;
      }
    }
  }
}
```

### Validation Helpers
```typescript
// Helper for profile validation
export const validateProfile = (data: unknown): UserProfile => {
  if (!isValidProfile(data)) {
    throw new ProfileValidationError('Invalid profile data structure');
  }
  return data;
};
```

## Mock vs Real Backend

### Shared Interface
Both implementations follow the same interface defined by AuthContextValue:
```typescript
interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  signIn(email: string, password: string): Promise<{ user: User }>;
  signUp(data: SignUpData): Promise<void>;
  // ... other methods
}
```

### Mock Service Features
- In-memory data storage
- Simulated network delays
- Error condition simulation
- Type-safe implementations
- Realistic data structures

### Real Backend Features
- Persistent data storage
- Real authentication
- Email verification
- Security features
- Database constraints

### Switching Between Implementations
The application seamlessly works with both implementations because:
1. Both follow the same interface
2. Auth context abstracts the implementation details
3. Components use the useAuth hook without knowing the backend
4. Types ensure consistency across both implementations

## Type Safety and Validation

### Database Schema Alignment
```typescript
// Types match database structure
interface UserProfile {
  id: string;          // UUID in database
  user_id: string;     // Foreign key to auth.users
  full_name: string;   // NOT NULL constraint
  email: string;       // NOT NULL constraint
  role: UserRole;      // ENUM in database
  // ... other fields
}
```

### Null vs Undefined Handling
```typescript
// Optional fields use undefined for runtime, null for database
title: string | null;        // In database
title?: string | undefined;  // In application code
```

### Type Guards and Validation
```typescript
// Type guard for user role
const isValidRole = (role: string): role is UserRole =>
  ['candidate', 'employer', 'partner'].includes(role);

// Runtime validation
if (!isValidRole(data.role)) {
  throw new Error('Invalid user role');
}
```

## Session Management

### Session Persistence
- Supabase handles session persistence using localStorage
- Session automatically refreshes in the background
- Auth state syncs across tabs/windows
```typescript
// Session configuration in AuthContext
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});
```

### Session Monitoring
- Auth state changes monitored via subscription
- Components automatically update when auth state changes
- Handles token refresh and expiry
```typescript
useEffect(() => {
  const { subscription } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      // Update auth state based on session
    }
  );
  return () => subscription.unsubscribe();
}, []);
```

### Session Recovery
- Automatic session recovery on page load
- Handles page refreshes and browser restarts
- Maintains user state across sessions
```typescript
// Initial session check
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    // Restore user session
  }
});
```

## Best Practices

1. Always use the useAuth hook for authentication operations
2. Handle loading and error states in components
3. Use type-safe operations throughout the auth flow
4. Implement proper cleanup on failures
5. Maintain consistent error handling patterns
6. Keep auth state management centralized
7. Use proper TypeScript types for all auth operations
