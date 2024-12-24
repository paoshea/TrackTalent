export interface ActiveJobsListProps {
  jobs: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    applicants: number;
    postedAt: string;
  }>;
}

export function ActiveJobsList({ jobs }: ActiveJobsListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Active Jobs</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <li key={job.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {job.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {job.company} • {job.location}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.applicants} applicants
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
