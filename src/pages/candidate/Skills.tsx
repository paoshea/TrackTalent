import { useAuth } from "../../hooks/useAuth";
import { MainLayout } from "../../components/layout/MainLayout";
import { SkillAssessment } from "../../components/skills/SkillAssessment";
import { Loading } from "../../components/shared/Loading";
import { Alert } from "../../components/shared/Alert";

export function Skills() {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <MainLayout>
        <Loading size="lg" text="Loading skills..." />
      </MainLayout>
    );
  }

  if (error || !user) {
    return (
      <MainLayout>
        <Alert
          type="error"
          title="Error"
          message={error || "Please sign in to view your skills"}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Skills</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your skills and track your progress
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <SkillAssessment userId={user.id} />
        </div>
      </div>
    </MainLayout>
  );
}

export default Skills;
