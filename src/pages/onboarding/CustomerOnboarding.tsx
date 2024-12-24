import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  fields: {
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "url";
    required?: boolean;
    placeholder?: string;
  }[];
}

const steps: OnboardingStep[] = [
  {
    id: "company",
    title: "Company Information",
    description: "Tell us about your company",
    fields: [
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
        placeholder: "Enter your company name",
      },
      {
        name: "website",
        label: "Company Website",
        type: "url",
        required: true,
        placeholder: "https://example.com",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    description: "How can candidates reach you?",
    fields: [
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        placeholder: "+1 (555) 123-4567",
      },
      {
        name: "contactEmail",
        label: "Contact Email",
        type: "email",
        required: true,
        placeholder: "contact@company.com",
      },
    ],
  },
];

export default function CustomerOnboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create company record
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: formData.companyName,
          website: formData.website,
        })
        .select()
        .single();

      if (companyError) throw companyError;

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          customer: {
            companyId: company.id,
            isProfileComplete: true,
          },
        },
      });

      if (updateError) throw updateError;

      // Create customer profile
      const { error: profileError } = await supabase
        .from("customer_profiles")
        .insert({
          userId: user?.id,
          companyId: company.id,
          phone: formData.phone,
          contactEmail: formData.contactEmail,
        });

      if (profileError) throw profileError;

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to complete onboarding",
      );
      console.error("Onboarding error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {currentStepData.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {currentStepData.description}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-sm text-red-600" role="alert">
                {error}
              </div>
            )}

            {currentStepData.fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <div className="mt-1">
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    className="
                      appearance-none block w-full px-3 py-2 border
                      border-gray-300 rounded-md shadow-sm placeholder-gray-400
                      focus:outline-none focus:ring-indigo-500
                      focus:border-indigo-500 sm:text-sm
                    "
                  />
                </div>
              </div>
            ))}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full flex justify-center py-2 px-4 border border-transparent
                  rounded-md shadow-sm text-sm font-medium text-white
                  bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isSubmitting
                  ? "Saving..."
                  : currentStep === steps.length - 1
                    ? "Complete Setup"
                    : "Next Step"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
