
import { JobList } from "../../components/jobs/JobList";
import { useJobs } from "../../hooks/useJobs";

export default function Jobs() {
  const { jobs, isLoading } = useJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold text-gray-900">Available Positions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse through our current job openings and find your next opportunity
          </p>
        </div>
      </div>
      <div className="mt-8">
        <JobList
          jobs={jobs}
          isLoading={isLoading}
          hasMore={false}
          onLoadMore={() => {}}
        />
      </div>
    </div>
  );
}
