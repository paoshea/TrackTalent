import React from "react";
import { useApplications } from "../../hooks/useApplications";
import { ApplicationCard } from "./ApplicationCard";
import { LoadingState } from "../shared/LoadingState";
import { ErrorMessage } from "../shared/ErrorMessage";

export function ApplicationTracker() {
  const { applications, loading, error } = useApplications();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">My Applications</h2>
        <div className="flex space-x-2">
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="interviewing">Interviewing</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No applications found
          </p>
        ) : (
          applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        )}
      </div>
    </div>
  );
}
