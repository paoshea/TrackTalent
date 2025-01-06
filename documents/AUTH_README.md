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

### Password Reset and Email Verification

#### Current State (Development/Mock)
Both password reset and email verification functions are currently implemented as placeholders in the AuthContext:

```typescript
// Password Reset
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

// Email Verification
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
```

#### Implementation Plan

1. Password Reset Flow
   - Backend Setup:
     ```typescript
     // 1. Configure Supabase email templates
     await supabase.auth.resetPasswordForEmail(email, {
       redirectTo: `${window.location.origin}/auth/reset-password`
     });

     // 2. Handle password update
     await supabase.auth.updateUser({ password: newPassword });
     ```
   
   - Frontend Implementation:
     1. Create password reset request page
     2. Implement email template with reset link
     3. Create password reset confirmation page
     4. Add success/error notifications
     5. Implement password strength validation

2. Email Verification Flow
   - Backend Setup:
     ```typescript
     // 1. Enable email verification in Supabase
     await supabase.auth.signUp({
       email,
       password,
       options: {
         emailRedirectTo: `${window.location.origin}/auth/verify-email`
       }
     });

     // 2. Verify email token
     await supabase.auth.verifyOtp({
       token_hash: token,
       type: 'email'
     });
     ```
   
   - Frontend Implementation:
     1. Create email verification page
     2. Implement email template with verification link
     3. Add verification status to user profile
     4. Create verification success/error pages
     5. Add email verification reminder component

3. Database Updates
   ```sql
   -- Add verification status to profiles
   alter table public.profiles
   add column email_verified boolean default false,
   add column email_verified_at timestamp with time zone;

   -- Update trigger for verification status
   create or replace function public.handle_email_verification()
   returns trigger as $$
   begin
     update public.profiles
     set 
       email_verified = true,
       email_verified_at = now()
     where id = new.id;
     return new;
   end;
   $$ language plpgsql security definer;
   ```

4. Security Considerations
   - Rate limiting for reset/verification requests
   - Token expiration times
   - IP-based request tracking
   - Email change verification
   - Audit logging for security events

5. Testing Strategy
   - Unit tests for auth functions
   - Integration tests for email flows
   - E2E tests for user journeys
   - Security testing for token handling
   - Load testing for email services

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

### Registration Flow
[Rest of the existing content remains unchanged...]
