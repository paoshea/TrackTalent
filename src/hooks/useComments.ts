import { useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import type {
  Comment,
  CommentReaction,
  ReactionType,
  UseCommentsResult,
  UseCommentsOptions,
} from "../types/comments";

const COMMENTS_PER_PAGE = 10;

export function useComments({
  statusId,
  limit = COMMENTS_PER_PAGE,
}: UseCommentsOptions): UseCommentsResult {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchComments = useCallback(async () => {
    if (!statusId) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("comments")
        .select(
          `
          *,
          user:users(id, name, avatar),
          reactions:comment_reactions(type, count, user_reacted)
        `,
        )
        .eq("status_id", statusId)
        .order("created_at", { ascending: true })
        .range(offset, offset + limit - 1);

      if (fetchError) throw fetchError;

      const formattedComments = data.map((comment) => ({
        ...comment,
        reactions: comment.reactions || [],
      })) as Comment[];

      setComments((prev) =>
        offset === 0 ? formattedComments : [...prev, ...formattedComments],
      );
      setHasMore(data.length === limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments");
    } finally {
      setIsLoading(false);
    }
  }, [statusId, limit, offset]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setOffset((prev) => prev + limit);
  }, [hasMore, isLoading, limit]);

  const addComment = useCallback(
    async (content: string) => {
      if (!user || !statusId) return;

      try {
        setError(null);

        const { data: newComment, error: insertError } = await supabase
          .from("comments")
          .insert({
            status_id: statusId,
            user_id: user.id,
            content,
          })
          .select(
            `
            *,
            user:users(id, name, avatar),
            reactions:comment_reactions(type, count, user_reacted)
          `,
          )
          .single();

        if (insertError) throw insertError;

        setComments((prev) => [
          { ...newComment, reactions: [] } as Comment,
          ...prev,
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add comment");
        throw err;
      }
    },
    [user, statusId],
  );

  const deleteComment = useCallback(
    async (commentId: string) => {
      if (!user) return;

      try {
        setError(null);

        const { error: deleteError } = await supabase
          .from("comments")
          .delete()
          .eq("id", commentId)
          .eq("user_id", user.id);

        if (deleteError) throw deleteError;

        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete comment",
        );
        throw err;
      }
    },
    [user],
  );

  const toggleReaction = useCallback(
    async (commentId: string, type: ReactionType) => {
      if (!user) return;

      try {
        setError(null);

        await supabase.from("comment_reactions").upsert(
          {
            comment_id: commentId,
            user_id: user.id,
            type,
          },
          { onConflict: "comment_id,user_id,type" },
        );

        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id !== commentId) return comment;

            const existingReaction = comment.reactions.find(
              (r) => r.type === type,
            );

            const updatedReactions: CommentReaction[] = existingReaction
              ? comment.reactions.map((r) =>
                  r.type === type
                    ? {
                        ...r,
                        count: r.userReacted ? r.count - 1 : r.count + 1,
                        userReacted: !r.userReacted,
                      }
                    : r,
                )
              : [...comment.reactions, { type, count: 1, userReacted: true }];

            return {
              ...comment,
              reactions: updatedReactions,
            };
          }),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to toggle reaction",
        );
        throw err;
      }
    },
    [user],
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    isLoading,
    error,
    hasMore,
    loadMore,
    addComment,
    deleteComment,
    toggleReaction,
    refresh: fetchComments,
  };
}
