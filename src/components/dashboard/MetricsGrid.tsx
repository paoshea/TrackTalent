import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

export interface MetricsGridProps {
  title: string;
  value: string | number;
  change: number;
  description: string;
}

export function MetricsGrid({
  title,
  value,
  change,
  description,
}: MetricsGridProps) {
  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-indigo-500 rounded-md p-3">
          {/* Icon would go here */}
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          {title}
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p
          className={`ml-2 flex items-baseline text-sm font-semibold ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? (
            <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
          ) : (
            <ArrowDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
          )}
          <span className="sr-only">
            {change >= 0 ? "Increased" : "Decreased"} by
          </span>
          {Math.abs(change)}%
        </p>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm">
            <span className="font-medium text-gray-500">{description}</span>
          </div>
        </div>
      </dd>
    </div>
  );
}
