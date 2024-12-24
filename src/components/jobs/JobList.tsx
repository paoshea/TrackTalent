import { useEffect, useRef, useCallback } from "react";
import { JobCard } from "./JobCard";
import { LoadingState } from "../shared/LoadingState";
import type { Job } from "../../types/jobs";

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  className?: string;
}

export function JobList({
  jobs,
  isLoading,
  hasMore,
  onLoadMore,
  className = "",
}: JobListProps) {
  const observer = useRef<IntersectionObserver>();
  const lastJobElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, onLoadMore],
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (!isLoading && jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No jobs found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {jobs.map((job, index) => {
        if (jobs.length === index + 1) {
          return (
            <div key={job.id.toString()} ref={lastJobElementRef}>
              <JobCard job={job} />
            </div>
          );
        } else {
          return <JobCard key={job.id.toString()} job={job} />;
        }
      })}
      {isLoading && (
        <div className="py-4">
          <LoadingState />
        </div>
      )}
    </div>
  );
}
