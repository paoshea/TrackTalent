import { Filter } from "lucide-react";

type FilterOption = "all" | "following" | "mentions";

interface StatusFiltersProps {
  selectedFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  className?: string;
}

const filters: { id: FilterOption; label: string }[] = [
  { id: "all", label: "All Updates" },
  { id: "following", label: "Following" },
  { id: "mentions", label: "Mentions" },
];

export function StatusFilters({
  selectedFilter,
  onFilterChange,
  className = "",
}: StatusFiltersProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center text-sm text-gray-500">
        <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
        <span>Filter by:</span>
      </div>
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${
                selectedFilter === filter.id
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-500 hover:text-gray-700 bg-white hover:bg-gray-50"
              }
            `}
            aria-pressed={selectedFilter === filter.id}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
