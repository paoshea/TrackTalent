
import { MainLayout } from "../../components/layout/MainLayout";
import { ApplicationList } from "../../components/applications/ApplicationList";

export default function Applications() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
        <ApplicationList />
      </div>
    </MainLayout>
  );
}
