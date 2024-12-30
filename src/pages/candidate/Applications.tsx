
import { MainLayout } from "../../components/layout/MainLayout";
import { ApplicationList } from "../../components/applications/ApplicationList";
import { LoadingState } from "../../components/shared/LoadingState";
import { useApplications } from "../../hooks/useApplications";

export default function Applications() {
  const { isLoading } = useApplications();

  if (isLoading) {
    return <LoadingState />;
  }
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Applications</h1>
        <ApplicationList />
      </div>
    </MainLayout>
  );
}
