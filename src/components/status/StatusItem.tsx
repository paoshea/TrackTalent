import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { HashtagList } from "./HashtagList";
import { MentionList } from "./MentionList";
import { StatusActions } from "./StatusActions";
import { StatusComments } from "./StatusComments";
import { Avatar } from "../shared/Avatar";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Status {
  id: string;
  content: string;
  user: User;
  createdAt: string;
  hashtags: string[];
  mentions: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
}

interface StatusItemProps {
  status: Status;
  onLike?: (statusId: string) => Promise<void>;
  onComment?: (statusId: string, comment: string) => Promise<void>;
  onShare?: (statusId: string) => Promise<void>;
  onDelete?: (statusId: string) => Promise<void>;
  showActions?: boolean;
  showComments?: boolean;
  className?: string;
}

export function StatusItem({
  status,
  onLike,
  onComment,
  onShare,
  onDelete,
  showActions = true,
  showComments = false,
  className = "",
}: StatusItemProps) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [showCommentsSection, setShowCommentsSection] = useState(showComments);

  const handleLike = async () => {
    if (onLike) {
      await onLike(status.id);
    }
  };

  const handleComment = async (comment: string) => {
    if (onComment) {
      await onComment(status.id, comment);
    }
  };

  const handleShare = async () => {
    if (onShare) {
      await onShare(status.id);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(status.id);
    }
    setIsActionsOpen(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <Avatar src={status.user.avatar} alt={status.user.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {status.user.name}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(status.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            {showActions && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsActionsOpen(!isActionsOpen)}
                  className="text-gray-400 hover:text-gray-500"
                  aria-label="Status actions"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
                {isActionsOpen && (
                  <StatusActions
                    onDelete={handleDelete}
                    onClose={() => setIsActionsOpen(false)}
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-2 space-y-4">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">
              {status.content}
            </p>

            {status.hashtags.length > 0 && (
              <HashtagList hashtags={status.hashtags} />
            )}

            {status.mentions.length > 0 && (
              <MentionList mentions={status.mentions} />
            )}

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleLike}
                className={`
                  flex items-center space-x-1 text-sm
                  ${status.isLiked ? "text-pink-600" : "text-gray-500 hover:text-pink-600"}
                `}
              >
                <Heart
                  className={`h-5 w-5 ${status.isLiked ? "fill-current" : ""}`}
                />
                <span>{status.likesCount}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCommentsSection(!showCommentsSection)}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{status.commentsCount}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600"
              >
                <Share2 className="h-5 w-5" />
                <span>{status.sharesCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCommentsSection && (
        <div className="mt-4 pt-4 border-t">
          <StatusComments statusId={status.id} onComment={handleComment} />
        </div>
      )}
    </div>
  );
}
