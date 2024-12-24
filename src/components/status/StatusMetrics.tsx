import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { useMemo } from "react";

interface Metric {
  label: string;
  value: number;
  icon: typeof Heart;
  color: string;
  change?: number;
}

interface StatusMetricsProps {
  likes: number;
  comments: number;
  shares: number;
  previousLikes?: number;
  previousComments?: number;
  previousShares?: number;
  className?: string;
}

export function StatusMetrics({
  likes,
  comments,
  shares,
  previousLikes,
  previousComments,
  previousShares,
  className = "",
}: StatusMetricsProps) {
  const metrics: Metric[] = useMemo(
    () => [
      {
        label: "Likes",
        value: likes,
        icon: Heart,
        color: "text-pink-600",
        change:
          previousLikes !== undefined
            ? ((likes - previousLikes) / previousLikes) * 100
            : undefined,
      },
      {
        label: "Comments",
        value: comments,
        icon: MessageCircle,
        color: "text-blue-600",
        change:
          previousComments !== undefined
            ? ((comments - previousComments) / previousComments) * 100
            : undefined,
      },
      {
        label: "Shares",
        value: shares,
        icon: Share2,
        color: "text-green-600",
        change:
          previousShares !== undefined
            ? ((shares - previousShares) / previousShares) * 100
            : undefined,
      },
    ],
    [likes, comments, shares, previousLikes, previousComments, previousShares],
  );

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <metric.icon
                className={`h-5 w-5 ${metric.color}`}
                aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-500">
                {metric.label}
              </span>
            </div>
            {metric.change !== undefined && (
              <div
                className={`
                  flex items-center text-sm
                  ${metric.change > 0 ? "text-green-600" : "text-red-600"}
                `}
              >
                <TrendingUp
                  className={`h-4 w-4 ${metric.change > 0 ? "" : "transform rotate-180"}`}
                  aria-hidden="true"
                />
                <span className="ml-1">
                  {Math.abs(Math.round(metric.change))}%
                </span>
              </div>
            )}
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metric.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
