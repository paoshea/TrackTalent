import type { StepContentProps } from "../../types/onboarding";
import { RoleSelection } from "../../pages/onboarding/steps/RoleSelection";
import { ProfileSetup } from "../../pages/onboarding/steps/ProfileSetup";
import { PreferencesSetup } from "../../pages/onboarding/steps/PreferencesSetup";
import { TeamSetup } from "../../pages/onboarding/steps/TeamSetup";
import { CompanyInfo } from "../../pages/onboarding/steps/CompanyInfo";

export function StepContent({
  step,
  data,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
}: StepContentProps): JSX.Element {
  const renderStep = (): JSX.Element => {
    switch (step) {
      case "role-selection":
        return (
          <RoleSelection
            data={data}
            onUpdate={onUpdate}
            onNext={onNext}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );

      case "profile-setup":
        return (
          <ProfileSetup
            data={data}
            onUpdate={onUpdate}
            onNext={onNext}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );

      case "preferences-setup":
        return (
          <PreferencesSetup
            data={data}
            onUpdate={onUpdate}
            onNext={onNext}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );

      case "team-setup":
        return (
          <TeamSetup
            data={data}
            onUpdate={onUpdate}
            onNext={onNext}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );

      case "company-info":
        return (
          <CompanyInfo
            data={data}
            onUpdate={onUpdate}
            onNext={onNext}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );

      default:
        throw new Error(`Unknown step: ${step}`);
    }
  };

  return <div className="mt-8">{renderStep()}</div>;
}
