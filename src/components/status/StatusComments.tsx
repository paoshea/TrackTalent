import React, { useState, useMemo, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, ThumbsUp, PartyPopper, Laugh, Send } from "lucide-react";
import { useComments } from "../../hooks/useComments";
import { RichTextEditor } from "./RichTextEditor";
import { LoadingState } from "../shared/LoadingState";
import type {
  ReactionType,
  CommentReaction,
  Comment,
} from "../../types/comments";

interface StatusCommentsProps {
  statusId: string;
  className?: string;
  onComment?: (comment: string) => Promise<void>;
}

const reactionIcons: Record<ReactionType, typeof ThumbsUp> = {
  like: ThumbsUp,
  heart: Heart,
  celebrate: PartyPopper,
  laugh: Laugh,
};

const getReactionCount = (reactions: CommentReaction[]): number => {
  return reactions.reduce((sum, r) => sum + r.count, 0);
};

const ReactionSummary = React.memo(
  ({ reactions }: { reactions: CommentReaction[] }) => {
    const reactionCount = useMemo(
      () => getReactionCount(reactions),
      [reactions],
    );
    const defaultReaction: ReactionType = "like";
    const ReactionIcon = reactionIcons[reactions[0]?.type || defaultReaction];

    if (reactionCount === 0) return null;

    return (
      <div className="flex items-center space-x-1">
        <ReactionIcon className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500">{reactionCount}</span>
      </div>
    );
  },
);

ReactionSummary.displayName = "ReactionSummary";

const CommentReactions = React.memo(
  ({
    comment,
    onToggleReaction,
  }: {
    comment: Comment;
    onToggleReaction: (commentId: string, type: ReactionType) => void;
  }) => {
    return (
      <div className="mt-2 flex items-center space-x-4">
        {(
          Object.entries(reactionIcons) as [ReactionType, typeof ThumbsUp][]
        ).map(([type, Icon]) => {
          const reaction = comment.reactions.find((r) => r.type === type);
          return (
            <button
              key={type}
              onClick={() => onToggleReaction(comment.id, type)}
              className={`
              flex items-center space-x-1 text-sm
              ${
                reaction?.userReacted
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
            >
              <Icon className="h-4 w-4" />
              {reaction && reaction.count > 0 && <span>{reaction.count}</span>}
            </button>
          );
        })}
      </div>
    );
  },
);

CommentReactions.displayName = "CommentReactions";

export function StatusComments({
  statusId,
  className = "",
  onComment,
}: StatusCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const {
    comments,
    isLoading,
    error,
    hasMore,
    loadMore,
    addComment,
    toggleReaction,
  } = useComments({ statusId });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      if (onComment) {
        await onComment(newComment);
      } else {
        await addComment(newComment);
      }
      setNewComment("");
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleToggleReaction = useCallback(
    (commentId: string, type: ReactionType) => {
      toggleReaction(commentId, type);
    },
    [toggleReaction],
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-sm text-red-600" role="alert">
        Failed to load comments: {error}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <RichTextEditor
          content={newComment}
          onChange={setNewComment}
          placeholder="Write a comment..."
          maxLength={1000}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="
              inline-flex items-center px-4 py-2 border border-transparent
              text-sm font-medium rounded-md shadow-sm text-white
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Send className="h-4 w-4 mr-2" />
            Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  comment.user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}`
                }
                alt={comment.user.name}
              />
            </div>
            <div className="flex-grow">
              <div className="bg-gray-50 rounded-lg px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      {comment.user.name}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <ReactionSummary reactions={comment.reactions} />
                </div>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              <CommentReactions
                comment={comment}
                onToggleReaction={handleToggleReaction}
              />
            </div>
          </div>
        ))}

        {hasMore && (
          <button
            onClick={loadMore}
            className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-500"
          >
            Load more comments
          </button>
        )}
      </div>
    </div>
  );
}
