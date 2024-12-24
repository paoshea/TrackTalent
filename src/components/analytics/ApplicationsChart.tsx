import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MetricSnapshot } from "../../types/analytics";

interface Props {
  data: MetricSnapshot[];
  height?: number;
}

export function ApplicationsChart({ data, height = 300 }: Props) {
  const chartData = data.map((snapshot) => ({
    date: new Date(snapshot.snapshotDate).toLocaleDateString(),
    applications: snapshot.metrics.applications || 0,
    interviews: snapshot.metrics.interviews || 0,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Applications & Interviews
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="applications"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.1}
          />
          <Area
            type="monotone"
            dataKey="interviews"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
