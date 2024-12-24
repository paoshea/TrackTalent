import { Filter, X } from "lucide-react";
import type { ActivityType } from "../../types/dashboard";

interface ActivityFeedFiltersProps {
  selectedTypes: ActivityType[];
  onToggleType: (type: ActivityType) => void;
  onClearFilters: () => void;
}

export function ActivityFeedFilters({
  selectedTypes,
  onToggleType,
  onClearFilters,
}: ActivityFeedFiltersProps) {
  const types: { type: ActivityType; label: string }[] = [
    { type: "application", label: "Applications" },
    { type: "interview", label: "Interviews" },
    { type: "offer", label: "Offers" },
    { type: "status", label: "Status Updates" },
  ];

  return (
    <div
      className="flex items-center space-x-2 mb-4"
      role="group"
      aria-label="Activity filters"
    >
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-gray-500" aria-hidden="true" />
        <span className="text-sm text-gray-600">Filter by:</span>
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter options"
      >
        {types.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onToggleType(type)}
            type="button"
            aria-pressed={selectedTypes.includes(type)}
            className={`
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              px-3 py-1 rounded-full text-sm font-medium
              ${
                selectedTypes.includes(type)
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {label}
          </button>
        ))}
        {selectedTypes.length > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            aria-label="Clear all filters"
            className="flex items-center px-2 py-1 text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <X className="h-4 w-4 mr-1" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
