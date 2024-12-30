
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../hooks/useOnboarding";
import { OnboardingProgress } from "../../components/onboarding/OnboardingProgress";
import { RoleSelection } from "./steps/RoleSelection";
import { ProfileSetup } from "./steps/ProfileSetup";
import { PreferencesSetup } from "./steps/PreferencesSetup";
import { TeamSetup } from "./steps/TeamSetup";
import { CompanyInfo } from "./steps/CompanyInfo";
import { ResumeUpload } from "./steps/ResumeUpload";
import { JobPreferences } from "./steps/JobPreferences";
import { EmailVerification } from "../../components/auth/EmailVerification";
import type { OnboardingStepType, OnboardingData, OnboardingStepProps } from "../../types/onboarding";
import type { User } from "../../types/auth";

const CANDIDATE_STEPS: OnboardingStepType[] = [
  "role-selection",
  "email-verification",
  "profile-setup",
  "resume-upload",
  "job-preferences",
];

const EMPLOYER_STEPS: OnboardingStepType[] = [
  "role-selection",
  "email-verification",
  "profile-setup",
  "company-info",
  "team-setup",
];

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
    steps: data.role === 'employer' ? EMPLOYER_STEPS : CANDIDATE_STEPS,
    initialData: {
      currentStep: "role-selection",
      completedSteps: [],
    } as Partial<OnboardingData>,
    onComplete: async (data) => {
      const dashboardPath = data.role === 'employer' ? '/employer' : '/candidate';
      navigate(dashboardPath);
    },
  });

  const StepComponents = {
    "role-selection": RoleSelection,
    "email-verification": EmailVerification,
    "profile-setup": ProfileSetup,
    "resume-upload": ResumeUpload,
    "job-preferences": JobPreferences,
    "company-info": CompanyInfo,
    "team-setup": TeamSetup,
  };

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
          totalSteps={data.role === 'employer' ? EMPLOYER_STEPS.length : CANDIDATE_STEPS.length}
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
