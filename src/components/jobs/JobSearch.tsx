import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { JobSearchFilters } from "./JobSearchFilters";
import { useJobSearch } from "../../hooks/useJobSearch";
import { JobList } from "./JobList";
import type { JobFilters } from "../../types/jobs";

interface JobSearchProps {
  className?: string;
}

export function JobSearch({ className = "" }: JobSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({});

  const { jobs, isLoading, error, hasMore, loadMore } = useJobSearch({
    query,
    filters,
    limit: 10,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;
    setQuery(searchInput.value);
  };

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  return (
    <div className={className}>
      {/* Search Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="search"
                      name="search"
                      defaultValue={query}
                      placeholder="Search jobs by title, skills, or company"
                      className="
                        block w-full pl-10 pr-3 py-2 border border-gray-300 
                        rounded-md leading-5 bg-white placeholder-gray-500
                        focus:outline-none focus:placeholder-gray-400 
                        focus:ring-1 focus:ring-indigo-500 
                        focus:border-indigo-500 sm:text-sm
                      "
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="
                      ml-3 inline-flex items-center px-4 py-2 border 
                      border-gray-300 rounded-md shadow-sm text-sm 
                      font-medium text-gray-700 bg-white hover:bg-gray-50
                      focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-indigo-500
                    "
                  >
                    <Filter className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                    Filters
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4">
              <JobSearchFilters
                filters={filters}
                onChange={handleFilterChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center text-red-600">
            Error loading jobs: {error}
          </div>
        ) : (
          <JobList
            jobs={jobs}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        )}
      </div>
    </div>
  );
}
