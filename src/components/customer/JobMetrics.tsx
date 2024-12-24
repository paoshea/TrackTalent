export interface JobMetricsProps {
  totalJobs: number;
  activeApplications: number;
  timeToHire?: number;
  applicantsPerJob?: number;
}

export function JobMetrics({
  totalJobs,
  activeApplications,
  timeToHire,
  applicantsPerJob,
}: JobMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Active Jobs
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {totalJobs}
          </dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Active Applications
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {activeApplications}
          </dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Average Time to Hire
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {timeToHire ? `${timeToHire} days` : "-"}
          </dd>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            Applicants per Job
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">
            {applicantsPerJob?.toFixed(1) || "-"}
          </dd>
        </div>
      </div>
    </div>
  );
}
