import { useConversations } from "../../hooks/useConversations";
import type { Conversation } from "../../types/messages";
import { MessagePreview } from "./MessagePreview";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export function MessageList() {
  const { conversations, isLoading, error } = useConversations();

  if (error) {
    return (
      <div className="p-4 text-center text-red-500" role="alert">
        Error loading messages: {error}
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="bg-white rounded-lg shadow divide-y divide-gray-200"
      role="region"
      aria-label="Messages"
    >
      {conversations.length === 0 ? (
        <p className="p-4 text-center text-gray-500" role="status">
          No messages yet
        </p>
      ) : (
        <ul
          role="list"
          className="divide-y divide-gray-200"
          aria-label="Message list"
        >
          {conversations.map((conversation: Conversation) => (
            <li key={conversation.id}>
              <MessagePreview conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
