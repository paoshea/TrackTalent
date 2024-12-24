import { Building2, User, Briefcase } from "lucide-react";
import type { RoleSelectionProps } from "../../../types/onboarding";
import type { UserRole } from "../../../types/auth";

const roles: Array<{
  id: UserRole;
  label: string;
  icon: typeof User | typeof Building2 | typeof Briefcase;
  description: string;
}> = [
  {
    id: "candidate",
    label: "Job Seeker",
    icon: User,
    description: "Looking for job opportunities",
  },
  {
    id: "employer",
    label: "Employer",
    icon: Building2,
    description: "Hiring talent for your company",
  },
  {
    id: "admin",
    label: "Administrator",
    icon: Briefcase,
    description: "Managing the platform",
  },
];

export function RoleSelection({
  selectedRole,
  onSelect,
  isLoading,
}: RoleSelectionProps) {
  return (
    <div className="space-y-6" role="radiogroup" aria-label="Select your role">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map(({ id, label, icon: Icon, description }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            disabled={isLoading}
            role="radio"
            aria-checked={selectedRole === id}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${
                selectedRole === id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-200"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <Icon className="h-8 w-8 text-indigo-600 mb-3" aria-hidden="true" />
            <h3 className="font-medium text-gray-900">{label}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
