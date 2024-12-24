import { useState, useEffect } from "react";
import type { Activity } from "../types/dashboard";
import { Briefcase, Calendar, CheckCircle, MessageSquare } from "lucide-react";

interface UseRecentActivityResult {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useRecentActivity(): UseRecentActivityResult {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        // For now, just simulate loading with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockActivities: Activity[] = [
          {
            id: "1",
            type: "job_posted",
            title: "New Job Posted",
            description: "Senior Software Engineer position is now live",
            icon: Briefcase,
            timestamp: new Date().toISOString(),
            metadata: {
              jobTitle: "Senior Software Engineer",
            },
            user: {
              id: "1",
              name: "HR Team",
              avatar: "/avatars/hr-team.png",
            },
            action: "posted",
            target: "Senior Software Engineer position",
          },
          {
            id: "2",
            type: "interview_scheduled",
            title: "Interview Scheduled",
            description: "Interview scheduled with John Doe",
            icon: Calendar,
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            metadata: {
              candidateName: "John Doe",
              jobTitle: "Senior Software Engineer",
              interviewDate: new Date(
                Date.now() + 2 * 24 * 60 * 60 * 1000,
              ).toISOString(),
            },
            user: {
              id: "2",
              name: "Hiring Manager",
              avatar: "/avatars/hiring-manager.png",
            },
            action: "scheduled",
            target: "Interview with John Doe",
          },
          {
            id: "3",
            type: "offer_accepted",
            title: "Offer Accepted",
            description: "Jane Smith has accepted the offer",
            icon: CheckCircle,
            timestamp: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            metadata: {
              candidateName: "Jane Smith",
              jobTitle: "Product Manager",
            },
            user: {
              id: "3",
              name: "Jane Smith",
              avatar: "/avatars/jane-smith.png",
            },
            action: "accepted",
            target: "Product Manager offer",
          },
          {
            id: "4",
            type: "status_update",
            title: "Application Status Updated",
            description: "Application moved to technical review",
            icon: MessageSquare,
            timestamp: new Date(
              Date.now() - 3 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            metadata: {
              candidateName: "Mike Johnson",
              jobTitle: "Frontend Developer",
            },
            user: {
              id: "4",
              name: "Technical Team",
              avatar: "/avatars/tech-team.png",
            },
            action: "updated",
            target: "Mike Johnson's application",
          },
        ];

        setActivities(mockActivities);
        setHasMore(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load activities",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const loadMore = async () => {
    // In a real app, this would load more activities
    // For now, just simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasMore(false);
  };

  const refresh = async () => {
    // In a real app, this would refresh the activities
    // For now, just simulate refreshing
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return {
    activities,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
