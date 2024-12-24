// import React from "react";
import { Building2, Calendar } from "lucide-react";
import { ApplicationStatus } from "./ApplicationStatus";
import { ApplicationTimeline } from "./ApplicationTimeline";
import { InterviewScheduler } from "../interviews/InterviewScheduler";
import type { Application } from "../../types/applications";

interface Props {
  application: Application;
}

export function ApplicationDetails({ application }: Props) {
  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      <div className="px-6 py-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {application.jobTitle}
            </h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <Building2 className="h-5 w-5 mr-2" />
                <span>{application.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>
                  Applied {new Date(application.appliedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <ApplicationStatus status={application.status} />
        </div>
      </div>

      <div className="px-6 py-5">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Application Timeline
        </h3>
        <ApplicationTimeline events={application.timeline || []} />
      </div>

      {application.status === "under_review" && (
        <div className="px-6 py-5">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Schedule Interview
          </h3>
          <InterviewScheduler
            interviewers={[]} // TODO: Pass actual interviewers
            candidate={{
              id: application.candidateId,
              name: "", // TODO: Pass actual candidate name
              email: "", // TODO: Pass actual candidate email
            }}
            jobTitle={application.jobTitle}
            onSchedule={async ({ date, time, interviewerId }) => {
              // TODO: Implement interview scheduling
              console.log("Schedule interview:", { date, time, interviewerId });
            }}
          />
        </div>
      )}
    </div>
  );
}
