import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface MetricTrend {
  date: string;
  applications: number;
  interviews: number;
  offers: number;
}

interface MetricsTrendsProps {
  trends: MetricTrend[];
  className?: string;
}

export function MetricsTrends({ trends, className = "" }: MetricsTrendsProps) {
  const chartData = useMemo(() => {
    const dates = trends.map((trend) =>
      new Date(trend.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    );

    return {
      labels: dates,
      datasets: [
        {
          label: "Applications",
          data: trends.map((trend) => trend.applications),
          borderColor: "rgb(79, 70, 229)",
          backgroundColor: "rgba(79, 70, 229, 0.5)",
          tension: 0.4,
        },
        {
          label: "Interviews",
          data: trends.map((trend) => trend.interviews),
          borderColor: "rgb(147, 51, 234)",
          backgroundColor: "rgba(147, 51, 234, 0.5)",
          tension: 0.4,
        },
        {
          label: "Offers",
          data: trends.map((trend) => trend.offers),
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.5)",
          tension: 0.4,
        },
      ],
    };
  }, [trends]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
      },
      title: {
        display: true,
        text: "Recruitment Activity Trends",
        font: {
          size: 16,
          weight: "normal",
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1F2937",
        bodyColor: "#4B5563",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        bodySpacing: 6,
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label || ""}: ${tooltipItem.parsed.y}`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#F3F4F6",
        },
        ticks: {
          font: {
            size: 12,
          },
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
