import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

export interface MetricCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  suffix?: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  description,
  suffix,
  className,
  trend,
}: MetricCardProps) {
  return (
    <div
      className={cn("bg-white overflow-hidden shadow rounded-lg", className)}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {label}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                  {suffix && <span className="text-sm ml-1">{suffix}</span>}
                </div>
                {trend && (
                  <div
                    className={cn(
                      "ml-2 flex items-baseline text-sm font-semibold",
                      trend.isPositive ? "text-green-600" : "text-red-600",
                    )}
                  >
                    <span className="sr-only">
                      {trend.isPositive ? "Increased by" : "Decreased by"}
                    </span>
                    {trend.value}%
                  </div>
                )}
              </dd>
              {description && (
                <dd className="mt-2 text-sm text-gray-500">
                  {description}
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

MetricCard.displayName = "MetricCard";
