import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MetricSnapshot } from "../../types/analytics";

interface Props {
  data: MetricSnapshot[];
  metric: keyof MetricSnapshot["metrics"];
  label: string;
  color?: string;
  height?: number;
}

export function MetricsTimeline({
  data,
  metric,
  label,
  color = "#4F46E5",
  height = 300,
}: Props) {
  const chartData = data.map((snapshot) => ({
    date: new Date(snapshot.snapshotDate).toLocaleDateString(),
    value: snapshot.metrics[metric] || 0,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {label} Over Time
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
