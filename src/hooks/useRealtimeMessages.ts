import { useState, useEffect } from "react";
import {
  subscribeToMessages,
  sendMessage,
  loadMessages,
} from "../services/messaging";
import type { Message } from "../types/messages";

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial messages
    loadMessages(conversationId).then((initialMessages: Message[]) => {
      setMessages(initialMessages);
      setLoading(false);
    });

    // Subscribe to new messages
    const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  const sendNewMessage = async (content: string) => {
    await sendMessage(conversationId, content);
  };

  return {
    messages,
    loading,
    sendMessage: sendNewMessage,
  };
}
