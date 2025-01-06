# TrackTalent Platform Documentation

## Overview
TrackTalent is a transformative career development and talent acquisition platform connecting candidates, employers, and partners in a dynamic ecosystem. The platform offers role-specific features with interactive demonstrations using mock data.

## Core Value Proposition

### For Young Adults
- Alternative career path exploration
- Professional guidance and support
- Skill development tracking
- Career progression visualization

### For Employers
- Verified candidate pool
- Streamlined recruitment process
- Quality assurance
- Talent pipeline management

### For Partners
- Network expansion tools
- Resource optimization
- Talent pool development
- Scalable program management

## Platform Architecture

### File Structure
```
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   ├── features/        # Role-specific feature previews
│   ├── shared/          # Shared UI components
│   ├── auth/           # Authentication components
│   └── [role]/         # Role-specific components
├── pages/
│   ├── auth/           # Authentication pages
│   ├── features/       # Feature showcase pages
│   └── [role]/         # Role-specific pages
└── router/
    ├── index.tsx       # Main router configuration
    ├── routes.tsx      # Route definitions
    └── [role]Routes.tsx # Role-specific routes
```

### Route Structure

#### Guest Routes (Public)
- `/` - Landing page
- `/about` - About page
- `/contact` - Contact page
- `/careers` - Careers page
- `/auth/*` - Authentication routes
  - `/auth/sign-in` - Sign in
  - `/auth/sign-up` - Sign up
  - `/auth/forgot-password` - Password recovery
  - `/auth/reset-password` - Password reset
  - `/auth/verify-email` - Email verification

#### Candidate Routes
- `/candidate/jobs` - Job search and applications
- `/candidate/resources` - Learning resources
- `/candidate/success-stories` - Success stories

#### Employer Demo Routes
- `/employer/demo/job-postings` - Job posting management
- `/employer/demo/applications` - Application tracking
- `/employer/demo/analytics` - Hiring analytics

#### Partner Demo Routes
- `/partner/demo/analytics` - Analytics dashboard
- `/partner/demo/apprenticeships` - Apprenticeship programs
- `/partner/demo/mentorship` - Mentorship network

### Key Components

#### Layout Components
```typescript
// RootLayout - Common layout for all pages
function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

// ProtectedRoute - Role-based access control
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/sign-in" />;
  }
  
  return children;
}
```

#### Feature Components
```typescript
// Landing page sections
- CandidateHero.tsx    // Career path showcase
- EmployerHero.tsx     // Recruitment tools
- PartnerHero.tsx      // Network capabilities
- Features.tsx         // Platform benefits

// Role-specific previews
- CandidatePreview.tsx // Job search demo
- EmployerPreview.tsx  // Hiring tools demo
- PartnerPreview.tsx   // Program management demo
```

### Mock Data Integration

#### Data Structure
```typescript
// Job Listings
export const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    skills: ["React", "TypeScript", "Node.js"],
    posted: "2024-01-15"
  }
];

// Application Tracking
export interface Application {
  id: string;
  candidate: {
    name: string;
    email: string;
  };
  job: {
    title: string;
    company: string;
  };
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered';
  appliedDate: string;
}
```

### Error Handling

#### Route Error Boundary
```typescript
function RootErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return <NotFound />;
}
```

## Technical Notes

### Landing Page Architecture

#### Component Structure
```
Landing.tsx
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── Primary Links
│   │   └── Auth Buttons (Sign In/Sign Up)
│   └── Language Selector
├── Hero Sections
│   ├── Candidate Hero
│   ├── Employer Hero
│   └── Partner Hero
├── Features Section
│   ├── Navigation Tabs
│   ├── Candidate Features
│   ├── Employer Features
│   └── Partner Features
└── Footer
    ├── Company Info
    ├── Resources
    ├── Legal
    └── Social Links
```

#### Styling Guidelines
```typescript
const colors = {
  primary: {
    light: '#4F46E5',
    DEFAULT: '#4338CA',
    dark: '#3730A3',
  },
  secondary: {
    light: '#9333EA',
    DEFAULT: '#7E22CE',
    dark: '#6B21A8',
  },
  // Role-specific colors
  candidate: '#3B82F6',
  employer: '#10B981',
  partner: '#8B5CF6',
};

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
```

#### Performance Optimizations
1. Component Lazy Loading
```typescript
const FeatureSection = lazy(() => import('./FeatureSection'));
const HeroSection = lazy(() => import('./HeroSection'));
```

2. Image Optimization
- Next-gen formats (WebP)
- Responsive images
- Lazy loading

3. Animation Performance
- Use CSS transforms
- Avoid layout shifts
- Hardware acceleration

#### Accessibility Guidelines
1. Semantic HTML
- Proper heading hierarchy
- ARIA labels
- Role attributes

2. Keyboard Navigation
- Focus management
- Skip links
- Visible focus states

3. Screen Readers
- Alt text
- ARIA live regions
- Descriptive labels

### RichTextEditor Implementations
The platform maintains two distinct rich text editors:

1. status/RichTextEditor.tsx
   - Purpose: Social media style updates
   - Features: Mentions, hashtags
   - Use case: Status updates, comments

2. shared/RichTextEditor.tsx
   - Purpose: General content editing
   - Features: Formatting, lists, links
   - Use case: Job descriptions, profiles

These editors serve different purposes and should be maintained separately.

## Development Guidelines

### Current Status
✅ Completed:
- Basic routing structure
- Mock data integration
- Component organization
- Error handling
- Protected routes

⏳ In Progress:
- Enhanced mock data
- Interactive demos
- Performance optimization
- Accessibility improvements

### Best Practices

1. Component Organization
   - Keep components role-specific
   - Use shared components for common UI
   - Maintain consistent file structure

2. Routing
   - Use nested routes for organization
   - Implement proper route guards
   - Handle loading and error states

3. Mock Data
   - Keep data realistic and relevant
   - Use TypeScript interfaces
   - Maintain consistent structure

4. Error Handling
   - Implement route error boundaries
   - Handle loading states
   - Provide user feedback

### Testing Strategy

1. Component Tests
- Hero section visibility
- Feature navigation
- Role switching

2. Integration Tests
- Form submissions
- Navigation flows
- Authentication states

3. Visual Regression
- Responsive layouts
- Color schemes
- Animation states

### Implementation Priorities

1. Route Structure
   - [x] Implement role-based routes
   - [x] Add route guards
   - [x] Create error boundaries

2. Component Development
   - [x] Create shared components
   - [x] Implement role-specific features
   - [ ] Add interactive demos

3. Mock Data
   - [x] Define data structures
   - [x] Create realistic samples
   - [ ] Add more scenarios

4. User Experience
   - [x] Implement loading states
   - [x] Add error handling
   - [ ] Improve accessibility

## Maintenance

### Regular Updates
- Keep mock data current
- Update component documentation
- Maintain TypeScript types
- Review error handling

### Performance Monitoring
- Track page load times
- Monitor component rendering
- Optimize data flow
- Improve user experience

## Next Steps

1. Enhanced Features
   - Add more interactive demos
   - Improve mock data scenarios
   - Enhance user feedback

2. Performance
   - Implement code splitting
   - Optimize bundle size
   - Add route preloading

3. User Experience
   - Improve accessibility
   - Add more loading states
   - Enhance error messages

4. Documentation
   - Update component docs
   - Add usage examples
   - Maintain type definitions
