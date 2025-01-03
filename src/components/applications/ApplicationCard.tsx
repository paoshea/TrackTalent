import { Link } from "react-router-dom";
import { Building2, Calendar, Clock } from "lucide-react";
import { ApplicationStatus } from "./ApplicationStatus";
import type { Application } from "../../types/applications";

interface Props {
  application: Application;
}

export function ApplicationCard({ application }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {application.job.title}
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="h-4 w-4 mr-2" />
              <span>{application.job.company.name}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Applied {new Date(application.appliedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                Last updated{" "}
                {new Date(application.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <ApplicationStatus status={application.status} />
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          to={`/applications/${application.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
