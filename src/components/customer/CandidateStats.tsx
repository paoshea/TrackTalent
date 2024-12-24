import { formatDistanceToNow } from "date-fns";

export interface CandidateStatsProps {
  applications: Array<{
    id: string;
    jobId: string;
    jobTitle: string;
    company: string;
    candidateName: string;
    status: string;
    appliedAt: string;
  }>;
  interviews: Array<{
    id: string;
    jobId: string;
    jobTitle: string;
    company: string;
    candidateName: string;
    scheduledAt: string;
    duration: number;
  }>;
}

export function CandidateStats({
  applications,
  interviews,
}: CandidateStatsProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">
          Candidate Pipeline
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Recent Applications
              </h4>
              <ul className="mt-3 divide-y divide-gray-200">
                {applications.slice(0, 3).map((app) => (
                  <li key={app.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {app.candidateName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {app.jobTitle} • {app.company}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Applied {formatDistanceToNow(new Date(app.appliedAt))} ago
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Upcoming Interviews
              </h4>
              <ul className="mt-3 divide-y divide-gray-200">
                {interviews.slice(0, 3).map((interview) => (
                  <li key={interview.id} className="py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {interview.candidateName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {interview.jobTitle} • {interview.company}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Scheduled for{" "}
                      {formatDistanceToNow(new Date(interview.scheduledAt))} •{" "}
                      {interview.duration} minutes
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
