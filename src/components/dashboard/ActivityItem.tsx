import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { formatTimeAgo } from "../../utils/dateUtils";
import type { ActivityItem as ActivityItemType } from "../../types/dashboard";

interface ActivityItemProps {
  activity: ActivityItemType;
  onLike: (id: string) => void;
  onComment: (id: string, comment: string) => void;
}

export function ActivityItem({
  activity,
  onLike,
  onComment,
}: ActivityItemProps) {
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(activity.id, comment);
      setComment("");
      setShowCommentInput(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start space-x-3">
        {activity.user.avatar ? (
          <img
            src={activity.user.avatar}
            alt={`${activity.user.name}'s avatar`}
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-sm font-medium text-indigo-600">
              {activity.user.name[0]}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">
            <span className="font-medium">{activity.user.name}</span>{" "}
            {activity.action}{" "}
            <span className="font-medium">{activity.target}</span>
          </p>
          <p className="text-sm text-gray-500">
            {formatTimeAgo(new Date(activity.timestamp))}
          </p>

          {activity.metadata?.description && (
            <p className="mt-2 text-sm text-gray-600">
              {activity.metadata.description}
            </p>
          )}

          <div className="mt-3 flex items-center space-x-4">
            <button
              type="button"
              onClick={() => onLike(activity.id)}
              aria-label={`${activity.metadata?.liked ? "Unlike" : "Like"} activity`}
              aria-pressed={activity.metadata?.liked}
              className={`flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                activity.metadata?.liked
                  ? "text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Heart className="h-4 w-4 mr-1" />
              {activity.metadata?.likes || 0}
            </button>
            <button
              type="button"
              onClick={() => setShowCommentInput(!showCommentInput)}
              aria-label={`${showCommentInput ? "Hide" : "Show"} comment input`}
              aria-expanded={showCommentInput}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {activity.metadata?.comments?.length || 0}
            </button>
          </div>

          {showCommentInput && (
            <form
              onSubmit={handleSubmitComment}
              className="mt-3"
              aria-label="Add comment form"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  aria-label="Comment text"
                  className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  aria-label="Submit comment"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {activity.metadata?.comments &&
            activity.metadata.comments.length > 0 && (
              <div className="mt-3 space-y-2">
                {activity.metadata.comments.map((comment) => (
                  <div key={comment.id} className="text-sm">
                    <span className="font-medium">{comment.user.name}</span>{" "}
                    {comment.content}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
