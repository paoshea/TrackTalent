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
              {application.job.title}
            </h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-gray-600">
                <Building2 className="h-5 w-5 mr-2" />
                <span>{application.job.company.name}</span>
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
            interviewers={[{
              id: 'interviewer-1',
              name: 'Default Interviewer',
              availability: [{
                date: new Date().toISOString().split('T')[0],
                slots: ['09:00', '10:00', '11:00', '14:00', '15:00']
              }]
            }]} // TODO: Replace with actual interviewer data from API
            candidate={{
              id: application.userId,
              name: "Candidate", // This should come from a user profile lookup
              email: "candidate@example.com" // This should come from a user profile lookup
            }}
            jobTitle={application.job.title}
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
