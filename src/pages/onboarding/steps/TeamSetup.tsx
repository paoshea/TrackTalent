import type { OnboardingStepProps } from "../../../types/onboarding";
import { Button } from "../../../components/shared/Button";
import { Input } from "../../../components/shared/Input";
import { Select } from "../../../components/shared/Select";

type TeamRole = "admin" | "recruiter" | "hiring-manager";

export function TeamSetup({
  data,
  onUpdate,
  onNext,
  onBack,
  isSubmitting,
}: OnboardingStepProps): JSX.Element {
  const handleAddMember = () => {
    const currentMembers = data.team?.members || [];
    onUpdate({
      team: {
        members: [
          ...currentMembers,
          {
            email: "",
            role: "recruiter" as TeamRole,
            department: "",
          },
        ],
        departments: data.team?.departments || [],
        locations: data.team?.locations || [],
      },
    });
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...(data.team?.members || [])];
    newMembers.splice(index, 1);
    onUpdate({
      team: {
        members: newMembers,
        departments: data.team?.departments || [],
        locations: data.team?.locations || [],
      },
    });
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...(data.team?.members || [])];
    newMembers[index] = {
      ...newMembers[index],
      [field]: value,
    };
    onUpdate({
      team: {
        members: newMembers,
        departments: data.team?.departments || [],
        locations: data.team?.locations || [],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Team Setup</h2>
        <p className="mt-1 text-sm text-gray-500">
          Add team members and their roles
        </p>
      </div>

      <div className="space-y-4">
        {(data.team?.members || []).map((member, index) => (
          <div key={index} className="flex gap-4 items-start">
            <Input
              label="Email"
              value={member.email}
              onChange={(e) =>
                handleMemberChange(index, "email", e.target.value)
              }
              type="email"
              required
            />
            <Select<TeamRole>
              label="Role"
              value={member.role}
              onChange={(value) => handleMemberChange(index, "role", value)}
              options={[
                { label: "Admin", value: "admin" },
                { label: "Recruiter", value: "recruiter" },
                { label: "Hiring Manager", value: "hiring-manager" },
              ]}
              required
            />
            <Input
              label="Department"
              value={member.department || ""}
              onChange={(e) =>
                handleMemberChange(index, "department", e.target.value)
              }
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => handleRemoveMember(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button type="button" variant="secondary" onClick={handleAddMember}>
          Add Team Member
        </Button>
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
