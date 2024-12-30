
import { MainLayout } from "../../components/layout/MainLayout";
import { ApplicationList } from "../../components/applications/ApplicationList";
import { QuickStats } from "../../components/dashboard/QuickStats";
import { RecentActivity } from "../../components/dashboard/RecentActivity";

export default function EmployerDashboard() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        <QuickStats />
        
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ApplicationList />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
