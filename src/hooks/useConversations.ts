import { useState, useEffect } from "react";
import type { Conversation, Message } from "../types/messages";

const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "1",
    content:
      "Thank you for your application. We would like to schedule an interview.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    senderId: "company-1",
    recipientId: "user-1",
    isRead: false,
  },
  {
    id: "2",
    conversationId: "2",
    content: "Your technical assessment results are ready.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    senderId: "company-2",
    recipientId: "user-1",
    isRead: false,
  },
];

const mockConversations: Conversation[] = [
  {
    id: "1",
    participants: ["user-1", "company-1"],
    lastMessage: mockMessages[0],
    unreadCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    participants: ["user-1", "company-2"],
    lastMessage: mockMessages[1],
    unreadCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchConversations = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setConversations(mockConversations);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch conversations",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversations, isLoading, error };
}
