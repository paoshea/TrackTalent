import { useEffect, useState, useCallback } from "react";
import { StatusItem } from "./StatusItem";
import { LoadingState } from "../shared/LoadingState";
import { Alert } from "../shared/Alert";
import { supabase } from "../../lib/supabase";

interface StatusUser {
  id: string;
  name: string;
  avatar?: string;
}

interface Status {
  id: string;
  content: string;
  user: StatusUser;
  createdAt: string;
  hashtags: string[];
  mentions: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
}

interface StatusLike {
  id: string;
  user_id: string;
  status_id: string;
  created_at: string;
}

interface StatusListProps {
  userId?: string;
  filter?: "all" | "following" | "mentions";
  limit?: number;
  className?: string;
}

export function StatusList({
  userId,
  filter = "all",
  limit = 10,
  className = "",
}: StatusListProps) {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatuses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from("statuses")
        .select(
          `
          *,
          user:users(id, fullName, companyName),
          likes:status_likes(user_id),
          comments:status_comments(count),
          shares:status_shares(count)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      if (userId) {
        query = query.eq("user_id", userId);
      }

      if (filter === "following") {
        // Add following filter logic
        query = query.in("user_id", [
          /* following user ids */
        ]);
      } else if (filter === "mentions") {
        // Add mentions filter logic
        query = query.contains("mentions", [userId]);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const formattedStatuses: Status[] = data.map((status) => ({
        id: status.id,
        content: status.content,
        user: {
          id: status.user.id,
          name: status.user.fullName,
          avatar: status.user.companyName
            ? `/companies/${status.user.companyName}/logo.png`
            : undefined,
        },
        createdAt: status.created_at,
        hashtags: status.hashtags || [],
        mentions: status.mentions || [],
        likesCount: status.likes?.length || 0,
        commentsCount: status.comments?.[0]?.count || 0,
        sharesCount: status.shares?.[0]?.count || 0,
        isLiked: status.likes?.some(
          (like: StatusLike) => like.user_id === userId,
        ),
      }));

      setStatuses(formattedStatuses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load statuses");
    } finally {
      setIsLoading(false);
    }
  }, [userId, filter, limit]);

  useEffect(() => {
    loadStatuses();
  }, [loadStatuses]);

  const handleLike = async (statusId: string) => {
    try {
      const status = statuses.find((s) => s.id === statusId);
      if (!status) return;

      const optimisticUpdate = {
        ...status,
        isLiked: !status.isLiked,
        likesCount: status.likesCount + (status.isLiked ? -1 : 1),
      };

      // Optimistic update
      setStatuses((prev) =>
        prev.map((s) => (s.id === statusId ? optimisticUpdate : s)),
      );

      if (status.isLiked) {
        await supabase
          .from("status_likes")
          .delete()
          .match({ status_id: statusId, user_id: userId });
      } else {
        await supabase
          .from("status_likes")
          .insert({ status_id: statusId, user_id: userId });
      }
    } catch (err) {
      console.error("Failed to update like:", err);
      // Revert optimistic update on error
      await loadStatuses();
    }
  };

  const handleDelete = async (statusId: string) => {
    try {
      await supabase.from("statuses").delete().eq("id", statusId);
      setStatuses((prev) => prev.filter((s) => s.id !== statusId));
    } catch (err) {
      console.error("Failed to delete status:", err);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <Alert type="error" title="Error" message={error} />;
  }

  if (statuses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No statuses to display.
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {statuses.map((status) => (
        <StatusItem
          key={status.id}
          status={status}
          onLike={handleLike}
          onDelete={userId === status.user.id ? handleDelete : undefined}
        />
      ))}
    </div>
  );
}
