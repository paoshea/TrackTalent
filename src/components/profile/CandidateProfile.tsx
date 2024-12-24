import { User, Mail, Award } from "lucide-react";
import { useUserRole } from "../../hooks/useUserRole";

export function CandidateProfile() {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="h-8 w-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center text-gray-600">
          <Mail className="h-5 w-5 mr-2" />
          <span>john.doe@example.com</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Award className="h-5 w-5 mr-2" />
          <span>5 years experience</span>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium text-gray-900">Skills</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {["JavaScript", "React", "Node.js", "TypeScript"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
