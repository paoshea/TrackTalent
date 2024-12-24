import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { useApplication } from "../../hooks/useApplication";
import { Loading } from "../../components/shared/Loading";
import { Alert } from "../../components/shared/Alert";
import { Button } from "../../components/shared/Button";
import { Badge } from "../../components/shared/Badge";
import { formatDate } from "../../utils/dateUtils";

export function ApplicationDetails() {
  const { id } = useParams<{ id: string }>();
  const { application, loading, error } = useApplication(id!);

  if (loading) {
    return (
      <MainLayout>
        <Loading size="lg" text="Loading application details..." />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert type="error" message={error} />
      </MainLayout>
    );
  }

  if (!application) {
    return (
      <MainLayout>
        <Alert type="error" message="Application not found" />
      </MainLayout>
    );
  }

  const timeline = application.timeline || [];
  const hasTimeline = timeline.length > 0;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {application.jobTitle}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {application.company} • {application.location}
            </p>
          </div>
          <Badge
            variant={
              application.status === "rejected"
                ? "error"
                : application.status === "accepted"
                  ? "success"
                  : "info"
            }
          >
            {application.status}
          </Badge>
        </div>

        {/* Application Details */}
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {/* Basic Info */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Application Details
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Applied On
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(application.appliedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatDate(application.updatedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Resume</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <Button
                    variant="link"
                    onClick={() =>
                      window.open(application.resume.url, "_blank")
                    }
                  >
                    {application.resume.name}
                  </Button>
                </dd>
              </div>
              {application.coverLetter && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Cover Letter
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.coverLetter}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Timeline */}
          {hasTimeline && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
              <div className="mt-4 flow-root">
                <ul className="-mb-8">
                  {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 && (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                              {/* Icon based on event type */}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm text-gray-500">
                                {event.description}
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {formatDate(event.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default ApplicationDetails;
