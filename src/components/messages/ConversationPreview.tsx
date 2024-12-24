import { Link } from "react-router-dom";
import { formatDistanceToNow } from "../../utils/dateUtils";
import type { Conversation } from "../../types/messages";

interface ConversationPreviewProps {
  conversation: Conversation;
}

export function ConversationPreview({
  conversation,
}: ConversationPreviewProps) {
  const lastMessage = conversation.lastMessage;
  if (!lastMessage) return null;

  return (
    <Link
      to={`/messages/${conversation.id}`}
      className="block hover:bg-gray-50"
      aria-label={`Conversation with ${conversation.company}${conversation.unreadCount > 0 ? `, ${conversation.unreadCount} unread messages` : ""}`}
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {conversation.company[0]}
                </span>
              </div>
            </div>
            <div className="ml-4 truncate">
              <p className="text-sm font-medium text-gray-900">
                {conversation.company}
              </p>
              <p
                className="text-sm text-gray-500 truncate"
                aria-label={`Last message: ${lastMessage.content}`}
              >
                {lastMessage.content}
              </p>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="flex flex-col items-end">
              <p
                className="text-xs text-gray-500"
                aria-label={`Sent ${formatDistanceToNow(new Date(lastMessage.createdAt))} ago`}
              >
                {formatDistanceToNow(new Date(lastMessage.createdAt))}
              </p>
              {conversation.unreadCount > 0 && (
                <span
                  className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  role="status"
                  aria-label={`${conversation.unreadCount} unread messages`}
                >
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
