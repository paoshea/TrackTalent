import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../hooks/useOnboarding";
import { OnboardingProgress } from "../../components/onboarding/OnboardingProgress";
import { RoleSelection } from "./steps/RoleSelection";
import { ProfileSetup } from "./steps/ProfileSetup";
import { PreferencesSetup } from "./steps/PreferencesSetup";
import { TeamSetup } from "./steps/TeamSetup";
import { CompanyInfo } from "./steps/CompanyInfo";
import type { OnboardingStepType, OnboardingData, OnboardingStepProps } from "../../types/onboarding";

const CANDIDATE_STEPS: OnboardingStepType[] = [
  "role-selection",
  "profile-setup",
  "preferences-setup",
  "profile",
  "preferences",
];

const EMPLOYER_STEPS: OnboardingStepType[] = [
  "role-selection",
  "profile-setup",
  "company-info",
  "team-setup",
  "team",
];

type StepComponentType = React.ComponentType<OnboardingStepProps>;

const StepComponents: Record<OnboardingStepType, StepComponentType> = {
  "role-selection": RoleSelection,
  "profile-setup": ProfileSetup,
  "preferences-setup": PreferencesSetup,
  "company-info": CompanyInfo,
  "team-setup": TeamSetup,
  "profile": ProfileSetup,
  "company": CompanyInfo,
  "preferences": PreferencesSetup,
  "team": TeamSetup,
};

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<OnboardingStepType[]>(CANDIDATE_STEPS);

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
    steps,
    initialData: {
      currentStep: "role-selection",
      completedSteps: [],
    } as Partial<OnboardingData>,
    onComplete: async (data) => {
      const dashboardPath = data.role === 'employer' ? '/employer' : '/candidate';
      navigate(dashboardPath);
    },
  });

  useEffect(() => {
    if (data?.role === 'employer') {
      setSteps(EMPLOYER_STEPS);
    } else {
      setSteps(CANDIDATE_STEPS);
    }
  }, [data?.role]);

  useEffect(() => {
    if (!data?.role && currentStep !== "role-selection") {
      navigate("/onboarding");
    }
  }, [data?.role, currentStep, navigate]);

  const CurrentStepComponent = StepComponents[currentStep];
  if (!CurrentStepComponent) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <OnboardingProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
          totalSteps={steps.length}
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
