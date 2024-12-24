// import React from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { MetricCard } from "../../components/metrics/MetricCard";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";

const CustomerDashboard = () => {
  const { metrics, isLoading, error } = useDashboardMetrics();

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
          <p className="text-red-600">{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Company Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Active Jobs"
            value={metrics?.jobViews || 0}
            icon={Briefcase}
          />
          <MetricCard
            label="Total Applications"
            value={metrics?.applications?.total || 0}
            icon={CheckCircle}
          />
          <MetricCard
            label="Scheduled Interviews"
            value={metrics?.interviews?.total || 0}
            icon={Users}
          />
          <MetricCard
            label="Profile Views"
            value={metrics?.profileViews || 0}
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Add more customer-specific components here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;
