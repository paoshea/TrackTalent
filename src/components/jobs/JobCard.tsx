import { Link } from "react-router-dom";
import { MapPin, Building, Clock, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Job } from "../../types/jobs";

interface JobCardProps {
  job: Job;
  className?: string;
}

export function JobCard({ job, className = "" }: JobCardProps) {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {job.company?.logo ? (
              <img
                className="h-10 w-10 rounded-full"
                src={job.company.logo}
                alt={job.company.name || "Company logo"}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Building className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                <Link to={`/jobs/${job.id}`} className="hover:text-indigo-600">
                  {job.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-500">{job.company.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            {job.type && (
              <span
                className={`
                px-2.5 py-0.5 rounded-full text-xs font-medium
                ${
                  job.type === "full-time"
                    ? "bg-green-100 text-green-800"
                    : job.type === "part-time"
                      ? "bg-blue-100 text-blue-800"
                      : job.type === "contract"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-purple-100 text-purple-800"
                }
              `}
              >
                {job.type
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center">
              <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4" />
              {job.compensation.salary.min.toLocaleString()} -{" "}
              {job.compensation.salary.max.toLocaleString()}{" "}
              {job.compensation.salary.currency}
            </div>
            <div className="flex items-center">
              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4" />
              {formatDistanceToNow(new Date(job.publishedAt || job.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 line-clamp-2">
            {job.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="
                inline-flex items-center px-2.5 py-0.5 rounded-full
                text-xs font-medium bg-indigo-100 text-indigo-800
              "
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span
              className="
              inline-flex items-center px-2.5 py-0.5 rounded-full
              text-xs font-medium bg-gray-100 text-gray-800
            "
            >
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
