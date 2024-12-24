import { FormField } from "../../shared/FormField";
import type {
  ApplicationData,
  PersonalInfo as PersonalInfoType,
} from "../../../types/candidate";

interface PersonalInfoProps {
  data: Partial<ApplicationData>;
  onChange: (data: Partial<ApplicationData>) => void;
  errors: Record<string, string>;
}

export function PersonalInfo({ data, onChange, errors }: PersonalInfoProps) {
  const personalInfo = data.personalInfo || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    portfolio: "",
  };

  const updateField = (field: keyof PersonalInfoType, value: string) => {
    const updatedInfo: PersonalInfoType = {
      ...personalInfo,
      [field]: value,
    };
    onChange({
      personalInfo: updatedInfo,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" required error={errors.firstName}>
          <input
            type="text"
            value={personalInfo.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            required
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <FormField label="Last Name" required error={errors.lastName}>
          <input
            type="text"
            value={personalInfo.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            required
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>
      </div>

      <FormField label="Email" required error={errors.email}>
        <input
          type="email"
          value={personalInfo.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </FormField>

      <FormField label="Phone" required error={errors.phone}>
        <input
          type="tel"
          value={personalInfo.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
          required
          pattern="[0-9\-\+\s\(\)]{10,}"
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </FormField>

      <FormField label="LinkedIn Profile" error={errors.linkedin}>
        <input
          type="url"
          value={personalInfo.linkedIn || ""}
          onChange={(e) => updateField("linkedIn", e.target.value)}
          placeholder="https://linkedin.com/in/username"
          pattern="https?:\/\/(www\.)?linkedin\.com\/in\/.*"
          aria-describedby={errors.linkedIn ? "linkedin-error" : undefined}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </FormField>
    </div>
  );
}
