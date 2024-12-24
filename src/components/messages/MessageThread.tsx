import { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRealtimeUpdates } from "../../hooks/useRealtimeUpdates";
import { MessageInput } from "./MessageInput";
import { MessageBubble } from "./MessageBubble";
import { supabase } from "../../lib/supabase";
import type { Message, DatabaseMessage } from "../../types/messages";

interface MessageThreadProps {
  conversationId: string;
  recipientId: string;
  initialMessages?: Message[];
}

function formatDatabaseMessage(msg: DatabaseMessage): Message {
  return {
    ...msg,
    conversationId: msg.conversation_id,
    senderId: msg.sender_id,
    recipientId: msg.recipient_id,
    createdAt: msg.created_at,
    updatedAt: msg.updated_at,
    isRead: msg.is_read,
  };
}

export function MessageThread({
  conversationId,
  recipientId,
  initialMessages = [],
}: MessageThreadProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (fetchError) throw fetchError;

      const formattedMessages = data.map(formatDatabaseMessage);
      setMessages(formattedMessages);
      scrollToBottom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, scrollToBottom]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!user || !conversationId) return;

      try {
        setError(null);

        const { data: newMessage, error: sendError } = await supabase
          .from("messages")
          .insert({
            conversation_id: conversationId,
            sender_id: user.id,
            recipient_id: recipientId,
            content,
            is_read: false,
          })
          .select()
          .single();

        if (sendError) throw sendError;

        const formattedMessage = formatDatabaseMessage(
          newMessage as DatabaseMessage,
        );
        setMessages((prev) => [...prev, formattedMessage]);
        scrollToBottom();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
        throw err;
      }
    },
    [user, conversationId, recipientId, scrollToBottom],
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useRealtimeUpdates<DatabaseMessage>({
    table: "messages",
    filter: {
      column: "conversation_id",
      value: conversationId,
    },
    onInsert: useCallback(
      (payload: DatabaseMessage) => {
        const formattedMessage = formatDatabaseMessage(payload);
        setMessages((prev) => [...prev, formattedMessage]);
        scrollToBottom();
      },
      [scrollToBottom],
    ),
  });

  if (error) {
    return <div className="p-4 text-red-600 bg-red-50 rounded">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === user?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <MessageInput onSubmit={sendMessage} placeholder="Type a message..." />
      </div>
    </div>
  );
}

MessageThread.displayName = "MessageThread";
