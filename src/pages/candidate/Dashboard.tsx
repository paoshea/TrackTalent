// import React from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { MetricCard } from "../../components/metrics/MetricCard";
import { Users, Briefcase, CheckCircle, TrendingUp } from "lucide-react";

const CandidateDashboard = () => {
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
          Candidate Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Applications"
            value={metrics?.applications?.total || 0}
            icon={CheckCircle}
            trend={{
              value: 12,
              isPositive: true,
            }}
          />
          <MetricCard
            label="Interviews"
            value={metrics?.interviews?.total || 0}
            icon={Users}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <MetricCard
            label="Saved Jobs"
            value={metrics?.savedJobs || 0}
            icon={Briefcase}
          />
          <MetricCard
            label="Match Score"
            value={metrics?.matchScore || 0}
            icon={TrendingUp}
            suffix="%"
            trend={{
              value: 8,
              isPositive: true,
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Add more candidate-specific components here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default CandidateDashboard;
