# TrackTalent Routes Configuration

## Overview

This document outlines the route configuration for TrackTalent, including guest routes, authenticated routes, and role-specific routes for Candidates, Employers, and Partners.

## Route Structure

### Guest Routes (Public)
- `/` - Landing page
- `/employer` - Employer landing page
- `/jobs` - Public job listings
- `/resources` - Learning resources
- `/success-stories` - Success stories
- `/partners/analytics` - Partner analytics preview
- `/partners/apprenticeships` - Apprenticeship programs
- `/partners/mentorship` - Mentorship programs
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Authenticated Routes

#### Candidate Routes
- `/candidate/dashboard` - Candidate dashboard
- `/candidate/profile` - Profile management
- `/candidate/jobs` - Job search and applications
- `/candidate/learning` - Learning resources
- `/candidate/messages` - Messaging center

#### Employer Routes
- `/employer/dashboard` - Employer dashboard
- `/employer/jobs` - Job posting management
- `/employer/candidates` - Candidate management
- `/employer/analytics` - Hiring analytics
- `/employer/messages` - Messaging center

#### Partner Routes
- `/partner/dashboard` - Partner dashboard
- `/partner/programs` - Program management
- `/partner/analytics` - Analytics dashboard
- `/partner/messages` - Messaging center

## Key Files

### App Configuration
```typescript
// src/App.tsx
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FormProvider>
          <TranslationProvider>
            <AppRoutes />
          </TranslationProvider>
        </FormProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

### Route Configuration
```typescript
// src/router/routes.tsx
const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          ...guestRoutes,
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      ...authenticatedRoutes,
    ],
  },
];
```

### Layout Components
- `GuestLayout` - Layout for unauthenticated users
- `AuthenticatedLayout` - Base layout for authenticated users
- `CandidateLayout` - Specific layout for candidates
- `EmployerLayout` - Specific layout for employers
- `PartnerLayout` - Specific layout for partners

## Translation Implementation

### Translation Context
```typescript
// src/contexts/TranslationContext.tsx
interface TranslationContextType {
  currentLanguage: string;
  translate: (key: TranslationKey) => string;
  changeLanguage: (lang: string) => void;
}
```

### Usage in Components
```typescript
const { translate } = useTranslation();
<h1>{translate('dashboard.welcome')}</h1>
```

### Language Files
- `src/translations/en.json` - English translations
- `src/translations/es.json` - Spanish translations

## Pending Work

1. Route Structure
   - [ ] Implement separate route files for each user type
   - [ ] Add role-based route guards
   - [ ] Create missing layout components

2. Navigation
   - [ ] Fix employer navigation links
   - [ ] Implement breadcrumb navigation
   - [ ] Add role-specific navigation menus

3. Authentication
   - [ ] Implement proper auth redirects
   - [ ] Add role-based access control
   - [ ] Handle auth token expiration

4. Layouts
   - [ ] Create role-specific layouts
   - [ ] Implement responsive navigation
   - [ ] Add loading states

5. Translation
   - [ ] Complete translation keys for all routes
   - [ ] Add language detection
   - [ ] Implement language persistence
   - [ ] Add translation loading states

6. Error Handling
   - [ ] Add error boundaries
   - [ ] Implement 404 handling
   - [ ] Add error logging

7. Performance
   - [ ] Implement route-based code splitting
   - [ ] Add route preloading
   - [ ] Optimize bundle size

## Current Status

The application currently has basic routing implemented but needs significant work to achieve the target structure. Key areas that need immediate attention:

1. Guest Routes
   - Currently mixing authenticated and guest routes
   - Need to separate concerns and implement proper guards
   - Missing some key guest pages

2. Authenticated Routes
   - Need proper role-based separation
   - Missing many role-specific features
   - Requires better navigation structure

3. Layouts
   - Basic guest layout implemented
   - Need role-specific layouts
   - Requires better component organization

4. Translation
   - Basic framework in place
   - Need comprehensive translation coverage
   - Missing language switching functionality

## Next Steps

1. Reorganize route structure
   ```
   src/
     routes/
       guest/
       candidate/
       employer/
       partner/
   ```

2. Implement proper route guards
   ```typescript
   <RoleRoute allowedRoles={['employer']}>
     <EmployerLayout>
       <Outlet />
     </EmployerLayout>
   </RoleRoute>
   ```

3. Add missing layouts and pages
4. Complete translation implementation
5. Add proper error handling
6. Implement navigation improvements
