import { useState, useEffect, useCallback } from "react";
import type { Conversation, Message } from "../types/messages";

/**
 * Hook for managing a single conversation's state and interactions.
 * Used for individual chat views where users can send messages and mark them as read.
 * For a list of all conversations, see useConversations.
 *
 * @param conversationId - The ID of the conversation to manage
 * @returns Conversation state and methods for interacting with it
 */
export function useConversation(conversationId: string) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConversation({
        id: conversationId,
        company: "TechCorp",
        companyId: "tech-corp-id",
        participants: ["user", "company"],
        recipientId: "company", // Add recipientId for direct access to recipient
        unreadCount: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: "1",
            conversationId,
            content:
              "Thank you for your application. We would like to schedule an interview.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            senderId: "company",
            recipientId: "user",
            isRead: false,
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, [conversationId]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!conversation) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        senderId: "user",
        recipientId: "company",
        isRead: true,
      };

      setConversation((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMessage],
            }
          : null,
      );
    },
    [conversation, conversationId],
  );

  const markAsRead = useCallback(() => {
    if (!conversation) return;

    setConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: prev.messages.map((msg) => ({
              ...msg,
              isRead: true,
            })),
          }
        : null,
    );
  }, [conversation]);

  return {
    conversation,
    isLoading,
    sendMessage,
    markAsRead,
  };
}
