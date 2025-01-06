# TrackTalent Routes Configuration

## Overview
This document outlines the route configuration for TrackTalent, including guest routes, authenticated routes, and role-specific routes for Candidates, Employers, and Partners.

## File structure (ls -R src/pages src/components src/router)

src/components:
Dashboard.tsx   analytics       branding        dashboard       interviews      layout          mobile          partner         skills
Navigation.tsx  applications    candidate       employer        jobs            messages        notifications   profile         status
admin           auth            customer        features        landing         metrics         onboarding      shared

src/components/admin:
ActivityLog.tsx         SystemHealth.tsx        UserMetrics.tsx         index.ts

src/components/analytics:
AnalyticsDashboard.tsx  ApplicationsChart.tsx   MetricsTimeline.tsx     ResponseRateChart.tsx

src/components/applications:
ApplicationCard.tsx     ApplicationDetails.tsx  ApplicationList.tsx     ApplicationStatus.tsx   ApplicationTimeline.tsx ApplicationTracker.tsx

src/components/auth:                EmailVerification.tsx   LoginForm.tsx           ProtectedRoute.tsx      RegisterForm.tsx

src/components/branding:            BrandingEditor.tsx      BrandingProvider.tsx    Logo.tsx

src/components/candidate:           Dashboard.tsx   application

src/components/candidate/application:
ApplicationForm.tsx     DraftAlert.tsx          ExperienceForm.tsx      PersonalInfo.tsx        experience              steps
ConfirmationDialog.tsx  ExperienceCard.tsx      FormProgress.tsx        SkillsAssessment.tsx    skills

src/components/candidate/application/experience:  ExperienceCard.tsx

src/components/candidate/application/skills:      SkillRating.tsx

src/components/candidate/application/steps:       StepIndicator.tsx       StepNavigation.tsx

src/components/customer:        ActiveJobsList.tsx      CandidateStats.tsx      JobListItem.tsx         JobMetrics.tsx          jobs

src/components/customer/jobs:   JobBasicInfo.tsx        JobCompensation.tsx     JobForm.tsx             JobRequirements.tsx

src/components/dashboard:
ActiveJobsList.tsx      ActivityFeedFilters.tsx ActivityItem.tsx        DashboardLayout.tsx     MetricCard.tsx          MetricsTrends.tsx       RecentActivity.tsx
ActivityFeed.tsx        ActivityGroup.tsx       Dashboard.tsx           JobRecommendations.tsx  MetricsGrid.tsx         QuickStats.tsx          StatusUpdates.tsx

src/components/employer:      EmployerDashboard.tsx   index.ts

src/components/features:      CandidatePreview.tsx    EmployerPreview.tsx     PartnerPreview.tsx

src/components/interviews:    InterviewScheduler.tsx  TimeSlotPicker.tsx

src/components/jobs:    JobCard.tsx             JobForm.tsx             JobList.tsx             JobSearch.tsx           JobSearchFilters.tsx

src/components/landing: CandidateHero.tsx       EmployerHero.tsx        Features.tsx            FeaturesNav.tsx         PartnerHero.tsx         index.ts

src/components/layout:
CandidateLayout.tsx     FeaturesLayout.tsx      Header.tsx              Navigation.tsx          ProtectedRoute.tsx      index.ts
DashboardLayout.tsx     Footer.tsx              MainLayout.tsx          NavigationMenu.tsx      ResponsiveContainer.tsx
EmployerLayout.tsx      GuestLayout.tsx         MobileNavigation.tsx    PartnerLayout.tsx       Sidebar.tsx

src/components/messages:
ConversationList.tsx    MessageBubble.tsx       MessageList.tsx         MessageThread.tsx
ConversationPreview.tsx MessageInput.tsx        MessagePreview.tsx      RealtimeChat.tsx

src/components/metrics:           MetricCard.tsx  RoleMetrics.tsx

src/components/mobile:            FormField.tsx   Menu.tsx        Navigation.tsx  SelectField.tsx

src/components/notifications:     NotificationBell.tsx    NotificationCenter.tsx  NotificationItem.tsx    NotificationList.tsx

src/components/onboarding:        OnboardingFlow.tsx      OnboardingProgress.tsx  OnboardingStep.tsx      StepContent.tsx         steps

src/components/onboarding/steps:  PreferencesSetup.tsx    ProfileSetup.tsx        RoleSelection.tsx

src/components/partner:     PartnerDashboard.tsx    index.ts

src/components/profile:
CandidateProfile.tsx    Profile.tsx             ProfileCard.tsx         ProfileEditor.tsx       ResumeUploader.tsx      index.ts

src/components/shared:
ActivityIcon.tsx        Badge.tsx               ErrorMessage.tsx        LanguageToggle.tsx      LoadingSpinner.tsx      RichTextEditor.css      Select.tsx
Alert.tsx               Button.tsx              FormField.tsx           Loading.tsx             LoadingState.tsx        RichTextEditor.tsx      TextArea.tsx
Avatar.tsx              Checkbox.tsx            Input.tsx               LoadingOverlay.tsx      Modal.tsx               SaveIndicator.tsx       ValidationMessage.tsx

src/components/skills:    SkillAssessment.tsx     SkillCategory.tsx       SkillRating.tsx         SkillSummary.tsx

src/components/status:
HashtagList.tsx         MentionList.tsx         StatusActions.tsx       StatusEditor.tsx        StatusItem.tsx          StatusMetrics.tsx
MediaUploader.tsx       RichTextEditor.tsx      StatusComments.tsx      StatusFilters.tsx       StatusList.tsx          TrendingHashtags.tsx

src/pages:
Landing.tsx     Settings.tsx    application     candidate       employer        jobs            onboarding      partners        success-stories
NotFound.tsx    admin           auth            customer        features        messages        partner         resources

src/pages/admin:          Dashboard.tsx

src/pages/application:    SuccessPage.tsx

src/pages/auth:
ForgotPassword.tsx      Register.tsx            SignIn.tsx              VerifyEmail.tsx
Login.tsx               ResetPassword.tsx       SignUp.tsx              callback.tsx

src/pages/candidate:    ApplicationDetails.tsx  Applications.tsx        Dashboard.tsx           Messages.tsx            Profile.tsx             Skills.tsx

src/pages/customer:         Dashboard.tsx

src/pages/employer:
Analytics.tsx           CandidateManagement.tsx EmployerFeatures.tsx    EmployerSolutions.tsx   Landing.tsx             Profile.tsx
Applications.tsx        Dashboard.tsx           EmployerInsights.tsx    JobPostings.tsx         Messages.tsx

src/pages/features:         CandidateFeatures.tsx   EmployerFeatures.tsx    Features.tsx            PartnerFeatures.tsx     index.ts

src/pages/jobs:             Jobs.tsx

src/pages/messages:         Conversation.tsx        Messages.tsx

src/pages/onboarding:       CustomerOnboarding.tsx  OnboardingFlow.tsx      steps

src/pages/onboarding/steps: CompanyInfo.tsx         JobPreferences.tsx      PreferencesSetup.tsx    ProfileSetup.tsx        ResumeUpload.tsx        RoleSelection.tsx       TeamSetup.tsx

src/pages/partner:          Dashboard.tsx

src/pages/partners:         Analytics.tsx           Apprenticeships.tsx     Mentorship.tsx

src/pages/resources:        Resources.tsx

src/pages/success-stories:  SuccessStories.tsx

src/router:     authenticatedRoutes.tsx demoRoutes.tsx          guestRoutes.tsx         index.tsx               routes.tsx

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
