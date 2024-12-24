import { useState, useEffect } from "react";
import type { Status, StatusFilter } from "../types/status";

interface UseStatusUpdatesOptions {
  userId?: string;
  limit?: number;
  filter?: StatusFilter;
}

interface UseStatusUpdatesResult {
  updates: Status[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useStatusUpdates({
  userId,
  limit = 10,
  filter,
}: UseStatusUpdatesOptions): UseStatusUpdatesResult {
  const [updates, setUpdates] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real app, this would be an API call
        // For now, just simulate loading with mock data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUpdates: Status[] = [
          {
            id: "1",
            userId: "user1",
            userName: "John Doe",
            type: "update",
            content: {
              text: "Just completed a great interview!",
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: 5,
            comments: 2,
            shares: 1,
            visibility: "public",
          },
          // Add more mock updates as needed
        ];

        setUpdates(mockUpdates);
        setHasMore(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load updates");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpdates();
  }, [userId, limit, filter]);

  const loadMore = async () => {
    // In a real app, this would load more updates
    // For now, just simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setHasMore(false);
  };

  const refresh = async () => {
    // In a real app, this would refresh the updates
    // For now, just simulate refreshing
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return {
    updates,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
