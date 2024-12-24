import { useState, useEffect } from "react";
import type { Message } from "../types/messages";
import { supabase } from "../lib/supabase";

const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "mock-conv-1",
    content: "Hello! Thanks for applying to our position.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    senderId: "company",
    recipientId: "user",
    isRead: false,
  },
  {
    id: "2",
    conversationId: "mock-conv-1",
    content: "Hi! Yes, I am very interested in the role.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    senderId: "user",
    recipientId: "company",
    isRead: true,
  },
];

export function useMessages(conversationId: string, recipientId: string) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });

        if (error) throw error;

        setMessages(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch messages",
        );
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        },
      )
      .subscribe();

    fetchMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId]);

  const sendMessage = async (content: string) => {
    try {
      const now = new Date().toISOString();
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        conversationId,
        content,
        createdAt: now,
        updatedAt: now,
        senderId: "user",
        recipientId,
        isRead: false,
      };

      const { error } = await supabase.from("messages").insert([
        {
          conversation_id: conversationId,
          recipient_id: recipientId,
          sender_id: "user",
          content,
          created_at: now,
          updated_at: now,
          is_read: false,
        },
      ]);

      if (error) throw error;

      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      throw err;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from("messages")
        .update({ is_read: true, updated_at: now })
        .eq("id", messageId);

      if (error) throw error;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isRead: true, updatedAt: now } : msg,
        ),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to mark message as read",
      );
      throw err;
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    markAsRead,
  };
}
