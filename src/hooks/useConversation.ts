import { useState, useEffect, useCallback } from "react";
import type { Conversation, Message } from "../types/messages";

export function useConversation(conversationId: string) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConversation({
        id: conversationId,
        company: "TechCorp",
        messages: [
          {
            id: "1",
            content:
              "Thank you for your application. We would like to schedule an interview.",
            timestamp: new Date().toISOString(),
            senderId: "company",
            read: false,
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
        content,
        timestamp: new Date().toISOString(),
        senderId: "user",
        read: true,
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
    [conversation],
  );

  const markAsRead = useCallback(() => {
    if (!conversation) return;

    setConversation((prev) =>
      prev
        ? {
            ...prev,
            messages: prev.messages.map((msg) => ({
              ...msg,
              read: true,
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
