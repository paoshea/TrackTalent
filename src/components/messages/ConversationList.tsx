import { useConversations } from "../../hooks/useConversations";
import { ConversationPreview } from "./ConversationPreview";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export function ConversationList() {
  const { conversations, isLoading } = useConversations();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="bg-white rounded-lg shadow divide-y divide-gray-200"
      role="region"
      aria-label="Conversations"
    >
      {conversations.length === 0 ? (
        <p className="p-4 text-center text-gray-500" role="status">
          No conversations yet
        </p>
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <ConversationPreview conversation={conversation} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
