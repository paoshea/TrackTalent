import { useState } from "react";
import { Calendar } from "lucide-react";
import { ApplicationsChart } from "./ApplicationsChart";
import { ResponseRateChart } from "./ResponseRateChart";
import { MetricsTimeline } from "./MetricsTimeline";
import { QuickStats } from "../dashboard/QuickStats";
import { useAnalytics } from "../../hooks/useAnalytics";
import { LoadingState } from "../shared/LoadingState";
import { ErrorMessage } from "../shared/ErrorMessage";

const DATE_RANGES = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

export function AnalyticsDashboard() {
  const { metrics, snapshots, loading, error } = useAnalytics();
  const [dateRange, setDateRange] = useState(30);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const filteredSnapshots = snapshots.filter((snapshot) => {
    const date = new Date(snapshot.snapshotDate);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - dateRange);
    return date >= cutoff;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(Number(e.target.value))}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {DATE_RANGES.map((range) => (
              <option key={range.days} value={range.days}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <QuickStats 
        metrics={{
          activeJobs: metrics.jobs.active,
          totalCandidates: metrics.totalCandidates,
          scheduledInterviews: metrics.interviews.scheduled,
          successfulHires: metrics.interviews.byOutcome.offered,
          trends: {
            jobs: metrics.activeJobsChange,
            candidates: metrics.candidatesChange,
            interviews: metrics.interviews.trend,
            hires: metrics.placementRateChange
          }
        }} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsChart data={filteredSnapshots} />
        <ResponseRateChart metrics={metrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsTimeline
          data={filteredSnapshots}
          metric="interviews"
          label="Interviews"
          color="#10B981"
        />
        <MetricsTimeline
          data={filteredSnapshots}
          metric="offers"
          label="Offers"
          color="#F59E0B"
        />
      </div>
    </div>
  );
}
