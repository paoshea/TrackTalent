import { ApplicationStatus } from "./ApplicationStatus";
import { useApplications } from "../../hooks/useApplications";

export function ApplicationList() {
  const { applications, loading } = useApplications();

  if (loading) {
    return <div className="animate-pulse">Loading applications...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">My Applications</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {applications.map((application) => (
          <li
            key={application.id}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-medium text-gray-900 truncate">
                  {application.jobTitle}
                </h4>
                <p className="text-sm text-gray-500">{application.company}</p>
              </div>
              <ApplicationStatus status={application.status} />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Applied on {new Date(application.appliedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
