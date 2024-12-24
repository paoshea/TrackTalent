import { Clock, MapPin, Building2, Users } from "lucide-react";
import type { Job } from "../../types/jobs";

interface JobListItemProps {
  job: Job;
}

const statusColors: Record<Job["status"], string> = {
  draft: "bg-gray-100 text-gray-800",
  published: "bg-blue-100 text-blue-800",
  closed: "bg-gray-100 text-gray-800",
};

export function JobListItem({ job }: JobListItemProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {job.department}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {job.type}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {job.applicantCount} applicants
            </div>
          </div>
        </div>
        <div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}
          >
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {job.compensation.salary.currency}{" "}
            {job.compensation.salary.min.toLocaleString()} -{" "}
            {job.compensation.salary.max.toLocaleString()}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View Details
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Edit Job
          </button>
        </div>
      </div>
    </div>
  );
}
