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

### Current Authentication State

#### Database Schema
The profiles table in Supabase has the following structure:
```sql
create table public.profiles (
  id uuid references auth.users primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role text,
  username text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone
);
```

#### Authentication Flow
1. Registration:
   - User signs up with email, password, and role
   - Profile is automatically created via database trigger
   - Email verification is currently disabled for development
   - Immediate access granted after registration

2. Sign In:
   - Direct password-based authentication
   - Profile data fetched automatically
   - Session managed through Supabase client

3. Auth Callback:
   - Dedicated `/auth/callback` route handles auth redirects
   - Manages session state after authentication
   - Redirects to appropriate pages based on auth status

#### Development Setup
```bash
# Start development environment
./scripts/setup-supabase.sh
npm run dev
```

#### Local Services
- Frontend: http://localhost:5173
- Supabase Studio: http://localhost:54323
- API: http://localhost:54321

#### Future Implementations
- Email verification will be added later
- Additional profile fields may be added to the schema
- Enhanced security measures planned

### Registration Flow
1. User Input Collection:
   ```typescript
   interface SignUpData {
     email: string;
     password: string;
     role: UserRole;
     full_name: string;
   }
   ```

2. Account Creation:
   ```typescript
   const { data: authData, error: signUpError } = await supabase.auth.signUp({
     email: data.email,
     password: data.password,
     options: {
       data: {
         role: data.role,
         full_name: data.full_name,
         username: data.email.split('@')[0]
       },
       emailRedirectTo: `${window.location.origin}/auth/callback`
     }
   });
   ```

3. Profile Creation (via Database Trigger):
   ```sql
   create function public.handle_new_user()
   returns trigger as $$
   begin
     insert into public.profiles (id, email, role, full_name, username)
     values (
       new.id,
       new.email,
       new.raw_user_meta_data->>'role',
       new.raw_user_meta_data->>'full_name',
       new.raw_user_meta_data->>'username'
     );
     return new;
   end;
   $$ language plpgsql security definer;
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
    typeof data.email === 'string' &&
    // ... other field validations
  );
}
```

## Session Management

### Auth Callback Handling
The auth callback system handles authentication redirects and session management:

```typescript
// Auth Callback Component
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error handling auth callback:', error);
        navigate('/auth/signin', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Completing authentication...</h2>
        <p className="text-gray-600">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
}
```

### Session Configuration
The Supabase client is configured with session management settings:

```typescript
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      storageKey: 'supabase.auth.token'
    },
    db: {
      schema: 'public'
    }
  }
);
```

### Session Persistence
- Supabase handles session persistence using localStorage
- Session automatically refreshes in the background
- Auth state syncs across tabs/windows
- Automatic session recovery on page load
- Handles page refreshes and browser restarts

### Session Monitoring
Auth state changes are monitored via subscription:

```typescript
useEffect(() => {
  const { subscription } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      if (session?.user) {
        const user = mapSupabaseUser(session.user);
        const profile = await fetchProfile(user.id);
        setState({ user, profile, isLoading: false });
      } else {
        setState({ user: null, profile: null, isLoading: false });
      }
    }
  );
  return () => subscription.unsubscribe();
}, []);
```

### Session Recovery
Automatic session recovery is implemented for page loads and refreshes:

```typescript
const initializeAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  
  if (session?.user) {
    const user = mapSupabaseUser(session.user);
    const profile = await fetchProfile(user.id);
    return { user, profile };
  }
  
  return { user: null, profile: null };
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



## Best Practices

1. Always use the useAuth hook for authentication operations
2. Handle loading and error states in components
3. Use type-safe operations throughout the auth flow
4. Implement proper cleanup on failures
5. Maintain consistent error handling patterns
6. Keep auth state management centralized
7. Use proper TypeScript types for all auth operations
