import { formatDistanceToNow } from "../../utils/dateUtils";
import type { Conversation } from "../../types/messages";

interface MessagePreviewProps {
  conversation: Conversation;
  onSelect?: () => void;
}

export function MessagePreview({ conversation, onSelect }: MessagePreviewProps) {
  const lastMessage = conversation.lastMessage;
  if (!lastMessage) return null;

  return (
    <div
      onClick={onSelect}
      className="block hover:bg-gray-50 cursor-pointer"
      aria-label={`Message from ${conversation.company}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect?.();
        }
      }}
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {conversation.company[0]}
                </span>
              </div>
            </div>
            <div className="ml-4">
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
          <div className="text-right">
            <p
              className="text-xs text-gray-500"
              aria-label={`Sent ${formatDistanceToNow(new Date(lastMessage.createdAt))}`}
            >
              {formatDistanceToNow(new Date(lastMessage.createdAt))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
