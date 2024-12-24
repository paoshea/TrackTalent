import type {
  OnboardingStepProps,
  CompanySize,
  Industry,
} from "../../../types/onboarding";
import { COMPANY_SIZES, INDUSTRIES } from "../../../types/onboarding";
import { Button } from "../../../components/shared/Button";
import { Input } from "../../../components/shared/Input";
import { Select } from "../../../components/shared/Select";

interface CompanyData {
  name: string;
  industry: Industry;
  size: CompanySize;
  website?: string;
  description?: string;
  logo?: string;
}

export function CompanyInfo({
  data,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
}: OnboardingStepProps): JSX.Element {
  const company: CompanyData = data.company || {
    name: "",
    industry: INDUSTRIES[0],
    size: COMPANY_SIZES[0],
    website: "",
    description: "",
  };

  const handleChange = <K extends keyof CompanyData>(
    field: K,
    value: CompanyData[K],
  ) => {
    onUpdate({
      company: {
        ...company,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Company Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">Tell us about your company</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Company Name"
          value={company.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <Select<Industry>
          label="Industry"
          value={company.industry}
          onChange={(value) => handleChange("industry", value)}
          options={INDUSTRIES.map((industry) => ({
            label: industry,
            value: industry,
          }))}
          required
        />

        <Select<CompanySize>
          label="Company Size"
          value={company.size}
          onChange={(value) => handleChange("size", value)}
          options={COMPANY_SIZES.map((size) => ({
            label: size,
            value: size,
          }))}
          required
        />

        <Input
          label="Website"
          value={company.website || ""}
          onChange={(e) => handleChange("website", e.target.value)}
          type="url"
          placeholder="https://example.com"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            value={company.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Tell us about your company's mission and culture"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onNext}
          disabled={isSubmitting}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
