import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../hooks/useOnboarding";
import { OnboardingProgress } from "../../components/onboarding/OnboardingProgress";
import { RoleSelection } from "./steps/RoleSelection";
import { ProfileSetup } from "./steps/ProfileSetup";
import { PreferencesSetup } from "./steps/PreferencesSetup";
import { TeamSetup } from "./steps/TeamSetup";
import { CompanyInfo } from "./steps/CompanyInfo";
import type {
  OnboardingStepType,
  OnboardingData,
  OnboardingStepProps,
} from "../../types/onboarding";
import type { User } from "../../types/auth";

interface OnboardingFlowProps {
  onComplete: (user: User) => string;
}

const STEPS: OnboardingStepType[] = [
  "role-selection",
  "profile-setup",
  "preferences-setup",
  "team-setup",
  "company-info",
];

const StepComponents: Record<
  OnboardingStepType,
  React.ComponentType<OnboardingStepProps>
> = {
  "role-selection": RoleSelection,
  "profile-setup": ProfileSetup,
  "preferences-setup": PreferencesSetup,
  "team-setup": TeamSetup,
  "company-info": CompanyInfo,
  profile: ProfileSetup,
  company: CompanyInfo,
  preferences: PreferencesSetup,
  team: TeamSetup,
};

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const navigate = useNavigate();
  const {
    data,
    currentStep,
    completedSteps,
    isValid,
    isSubmitting,
    updateData,
    goToNextStep,
    goToPreviousStep,
    completeOnboarding,
  } = useOnboarding({
    steps: STEPS,
    initialData: {
      currentStep: "role-selection",
      completedSteps: [],
    } as Partial<OnboardingData>,
    onComplete: async (data) => {
      // Convert onboarding data to AuthUser format
      const user: User = {
        id: "", // This would come from auth context
        email: data.profile?.email || "",
        firstName: data.profile?.firstName || "",
        lastName: data.profile?.lastName || "",
        role: data.role || "candidate",
        companyName: data.company?.name,
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
          onboardingCompleted: true,
          preferences: {
            notifications: {
              email:
                data.preferences?.notificationMethod === "email" ||
                data.preferences?.notificationMethod === "both",
              push:
                data.preferences?.notificationMethod === "in-app" ||
                data.preferences?.notificationMethod === "both",
            },
          },
        },
      };
      const path = onComplete(user);
      navigate(path);
    },
  });

  useEffect(() => {
    if (!data.role && currentStep !== "role-selection") {
      navigate("/onboarding");
    }
  }, [data.role, currentStep, navigate]);

  const CurrentStepComponent = StepComponents[currentStep];
  if (!CurrentStepComponent) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <OnboardingProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
          totalSteps={STEPS.length}
        />

        <div className="mt-10">
          <CurrentStepComponent
            data={data}
            onUpdate={updateData}
            onNext={isValid ? goToNextStep : completeOnboarding}
            onBack={goToPreviousStep}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
