import { formatTimeAgo } from "../../utils/dateUtils";
import type { StatusType } from "../../types/status";
import { useStatusUpdates } from "../../hooks/useStatusUpdates";
import { LoadingState } from "../shared/LoadingState";

interface StatusUpdatesProps {
  userId?: string;
  limit?: number;
}

const getStatusColor = (type: StatusType): string => {
  switch (type) {
    case "achievement":
      return "bg-green-100 text-green-800";
    case "milestone":
      return "bg-blue-100 text-blue-800";
    case "announcement":
      return "bg-purple-100 text-purple-800";
    case "alert":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function StatusUpdates({ userId, limit }: StatusUpdatesProps) {
  const { updates, isLoading, error } = useStatusUpdates({ userId, limit });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600" role="alert">
        Failed to load status updates: {error}
      </div>
    );
  }

  if (!updates.length) {
    return (
      <div className="text-center text-gray-500">
        No status updates to display
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {updates.map((update, updateIdx) => (
          <li key={update.id}>
            <div className="relative pb-8">
              {updateIdx !== updates.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  {update.userAvatar ? (
                    <img
                      className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                      src={update.userAvatar}
                      alt={update.userName}
                    />
                  ) : (
                    <span className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                      <span className="text-sm font-medium leading-none text-white">
                        {update.userName.charAt(0)}
                      </span>
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {update.userName}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {formatTimeAgo(update.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(update.type)}`}
                    >
                      {update.type.charAt(0).toUpperCase() +
                        update.type.slice(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">
                    {update.content.text}
                  </p>
                  {update.metadata && (
                    <div className="mt-2 text-sm text-gray-500">
                      {update.metadata.jobTitle && (
                        <p>Job: {update.metadata.jobTitle}</p>
                      )}
                      {update.metadata.candidateName && (
                        <p>Candidate: {update.metadata.candidateName}</p>
                      )}
                      {update.metadata.interviewDate && (
                        <p>
                          Interview Date:{" "}
                          {formatTimeAgo(update.metadata.interviewDate)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
