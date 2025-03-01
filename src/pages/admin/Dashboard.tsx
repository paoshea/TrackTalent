// import React from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useAdminDashboardMetrics } from "../../hooks/useAdminDashboardMetrics";
import { MetricCard } from "../../components/metrics/MetricCard";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { metrics, isLoading, error } = useAdminDashboardMetrics();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">{error || "Failed to load dashboard metrics"}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Total Applications"
            value={metrics?.applications.total ?? 0}
            icon={CheckCircle}
          />
          <MetricCard
            label="Active Users"
            value={metrics?.totalCandidates ?? 0}
            icon={Users}
          />
          <MetricCard
            label="Active Jobs"
            value={metrics?.jobs.active ?? 0}
            icon={Briefcase}
          />
          <MetricCard
            label="System Health"
            value={100}
            icon={TrendingUp}
            suffix="%"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Add more admin-specific components here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
