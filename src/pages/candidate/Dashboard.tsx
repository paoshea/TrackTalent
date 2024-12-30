
import { MainLayout } from "../../components/layout/MainLayout";
import { QuickStats } from "../../components/dashboard/QuickStats";
import { JobRecommendations } from "../../components/dashboard/JobRecommendations";
import { ApplicationTracker } from "../../components/applications/ApplicationTracker";
import { useAuth } from "../../hooks/useAuth";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const { metrics } = useDashboardMetrics();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <QuickStats metrics={metrics} />
        
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <JobRecommendations />
          </div>
          <div>
            <ApplicationTracker />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
