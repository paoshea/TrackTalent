# TrackTalent Pages Documentation

## Overview

TrackTalent is a comprehensive platform offering role-specific features for candidates, employers, and partners. The platform provides interactive demonstrations of all features using mock data, allowing users to explore functionality directly.

### Key Features
- Job search and application management
- Learning resources and skill development
- Success stories and career insights
- Employer recruitment tools
- Partner program management
- Analytics and reporting

### Recent Updates (2024)
- Direct feature access with mock data
- Improved navigation and layout
- Enhanced demo experience
- Consistent component structure

Clarification on RichTextEditor implementations:

status/RichTextEditor.tsx:

Purpose: Social media style editor
Features: Mentions, hashtags, suggestions
Use case: Status updates, comments, social interactions
Implementation: Custom contentEditable with specialized features
shared/RichTextEditor.tsx:

Purpose: General rich text editing
Features: Formatting, lists, links
Use case: Content creation, descriptions, long-form text
Implementation: ReactQuill-based with standard rich text features
These components serve different purposes and should both be maintained. They are not redundant but rather specialized for their specific use cases in the application.

## User Journeys

### 1. Candidate Experience
Start at `/features/candidate` to explore:
- Job search and filtering (`/jobs`)
- Learning resources (`/resources`)
- Success stories (`/success-stories`)

### 2. Employer Platform
Access via `/features/employer` to discover:
- Job posting management (`/employer/job-postings`)
- Application tracking (`/employer/applications`)
- Analytics dashboard (`/employer/analytics`)

### 3. Partner Tools
Visit `/features/partner` to preview:
- Apprenticeship programs (`/partners/apprenticeships`)
- Mentorship network (`/partners/mentorship`)
- Analytics platform (`/partners/analytics`)

## Page Structure

### Layout Components
1. GuestLayout
   - Main site header with logo
   - Navigation links
   - Language selection
   - Consistent footer

2. FeaturesLayout
   - Conditional back navigation
   - Content wrapper
   - Consistent padding and spacing

### Component Organization
```
src/
├── pages/
│   ├── features/
│   │   ├── CandidateFeatures.tsx
│   │   ├── EmployerFeatures.tsx
│   │   └── PartnerFeatures.tsx
│   ├── jobs/
│   │   └── Jobs.tsx
│   ├── resources/
│   │   └── Resources.tsx
│   ├── success-stories/
│   │   └── SuccessStories.tsx
│   └── employer/
│       ├── JobPostings.tsx
│       ├── Applications.tsx
│       └── Analytics.tsx
└── components/
    ├── layout/
    │   ├── GuestLayout.tsx
    │   └── FeaturesLayout.tsx
    └── features/
        ├── CandidatePreview.tsx
        ├── EmployerPreview.tsx
        └── PartnerPreview.tsx
```

## Route Configuration

### Main Routes
Located in `src/router/guestRoutes.tsx`:
```typescript
const guestRoutes: RouteObject[] = [
  {
    path: "",
    element: <Landing />,
  },
  // Feature showcase
  {
    path: "features",
    element: <FeaturesLayout />,
    children: [
      {
        path: "candidate",
        element: <CandidateFeatures />
      },
      {
        path: "employer",
        element: <EmployerFeatures />
      },
      {
        path: "partner",
        element: <PartnerFeatures />
      }
    ]
  },
  // Demo features
  {
    path: "jobs",
    element: <Jobs />,
  },
  {
    path: "resources",
    element: <Resources />,
  },
  {
    path: "success-stories",
    element: <SuccessStories />,
  },
  // Role-specific features
  {
    path: "employer",
    children: [
      {
        path: "job-postings",
        element: <JobPostings />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      }
    ]
  }
];
```

## Mock Data Integration

### Data Structure
Located in `/services/mockData.ts`:
```typescript
// Job Listings
export const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "Remote",
    salary: "$120,000 - $150,000",
    description: "...",
    requirements: ["5+ years experience", "React", "Node.js", "TypeScript"],
    postedDate: "2024-01-15"
  }
];

// Application Tracking
export interface Application {
  id: string;
  candidate: {
    name: string;
    email: string;
    avatar?: string;
  };
  job: {
    title: string;
    company: string;
  };
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected';
  appliedDate: string;
  lastActivity: string;
}

export const mockApplications: Application[] = [
  // Application data...
];
```

### Usage Examples
1. Job Listings:
```typescript
import { mockJobs } from '../../services/mockData';

export default function Jobs() {
  return (
    <JobList 
      jobs={mockJobs}
      isLoading={false}
      hasMore={false}
      onLoadMore={() => {}}
    />
  );
}
```

2. Application Tracking:
```typescript
import { mockApplications } from '../../services/mockData';

export default function Applications() {
  return (
    <div className="grid gap-6">
      {mockApplications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
        />
      ))}
    </div>
  );
}
```

## Development Guidelines

### Current Focus
1. ✅ Mock data integration
2. ✅ Direct feature access
3. ✅ Component consistency
4. ✅ Navigation flow
5. ✅ Layout responsiveness

### Next Steps
1. ⏳ Enhanced mock data
2. ⏳ Interactive demos
3. ⏳ Performance optimization
4. ⏳ Error handling
5. ⏳ Accessibility improvements

## Maintenance

### Regular Updates
- Keep mock data current and relevant
- Ensure component consistency
- Maintain navigation patterns
- Update documentation

### Performance Monitoring
- Track page load times
- Monitor component rendering
- Optimize data flow
- Improve user experience

This documentation provides a comprehensive overview of the TrackTalent platform's pages and features, focusing on helping new developers understand and navigate the codebase effectively.
