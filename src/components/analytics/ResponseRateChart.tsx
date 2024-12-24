import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { DashboardMetrics } from "../../types/analytics";

interface Props {
  metrics: DashboardMetrics;
  height?: number;
}

export function ResponseRateChart({ metrics, height = 300 }: Props) {
  const data = [
    { name: "Responded", value: metrics.response_rate },
    { name: "Pending", value: 100 - metrics.response_rate },
  ];

  const COLORS = ["#4F46E5", "#E5E7EB"];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Response Rate</h3>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
