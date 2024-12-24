const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5000+",
] as const;

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Services",
  "Other",
] as const;

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

type CompanySize = (typeof COMPANY_SIZES)[number];
type Industry = (typeof INDUSTRIES)[number];
type JobType = (typeof JOB_TYPES)[number];

export type OnboardingStepType =
  | "role-selection"
  | "profile-setup"
  | "preferences-setup"
  | "team-setup"
  | "company-info"
  | "profile"
  | "company"
  | "preferences"
  | "team";

export interface OnboardingStep {
  id: OnboardingStepType;
  title: string;
  description: string;
  isOptional?: boolean;
  isComplete: boolean;
}

export interface RoleSelectionProps extends OnboardingStepProps {
  selectedRole?: string;
  onSelect: (role: string) => void;
  isLoading?: boolean;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
}

export interface ProfileSetupProps extends OnboardingStepProps {
  profile: ProfileData;
  onProfileUpdate: (profile: Partial<ProfileData>) => void;
  onSubmit: (data: ProfileData) => void;
  isLoading: boolean;
  initialData?: ProfileData;
}

export interface PreferencesSetupProps extends OnboardingStepProps {
  preferences: OnboardingData["preferences"];
  onPreferencesUpdate: (
    preferences: Partial<OnboardingData["preferences"]>,
  ) => void;
  selectedPreferences: string[];
  onToggle: (preference: string) => void;
  isLoading: boolean;
}

export interface OnboardingData {
  currentStep: OnboardingStepType;
  completedSteps: OnboardingStepType[];
  role?: "candidate" | "employer";
  profile?: ProfileData;
  preferences?: {
    // Job-related preferences
    jobTypes?: JobType[];
    locations?: string[];
    remotePreference?: "remote" | "hybrid" | "onsite";
    salaryRange?: {
      min: number;
      max: number;
      currency: string;
    };
    industries?: string[];
    skills?: string[];
    // Communication preferences
    communicationFrequency?: "daily" | "weekly" | "monthly";
    notificationMethod?: "email" | "in-app" | "both";
    timezone?: string;
  };
  company?: {
    name: string;
    industry: Industry;
    size: CompanySize;
    website?: string;
    description?: string;
    logo?: string;
  };
  team?: {
    members: Array<{
      email: string;
      role: "admin" | "recruiter" | "hiring-manager";
      department?: string;
    }>;
    departments: string[];
    locations: string[];
  };
}

export interface OnboardingStepProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export interface OnboardingProgressProps {
  currentStep: OnboardingStepType;
  completedSteps: OnboardingStepType[];
  totalSteps: number;
  onStepClick?: (step: OnboardingStepType) => void;
}

export interface StepContentProps extends OnboardingStepProps {
  step: OnboardingStepType;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSkip?: () => void;
}

export interface OnboardingConfig {
  steps: OnboardingStepType[];
  initialData: Partial<OnboardingData>;
  validation?: {
    [K in OnboardingStepType]?: (
      data: OnboardingData,
    ) => Record<string, string>;
  };
  onComplete: (data: OnboardingData) => Promise<void>;
}

export interface UseOnboardingDataResult {
  data: OnboardingData;
  currentStep: OnboardingStepType;
  completedSteps: OnboardingStepType[];
  isValid: boolean;
  errors: Record<string, string>;
  isSubmitting: boolean;
  updateData: (data: Partial<OnboardingData>) => void;
  goToStep: (step: OnboardingStepType) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  completeOnboarding: () => Promise<void>;
}

export { COMPANY_SIZES, INDUSTRIES, JOB_TYPES };
export type { CompanySize, Industry, JobType };
