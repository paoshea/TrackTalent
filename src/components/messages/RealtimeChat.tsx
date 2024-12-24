import { useRef, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRealtimeMessages } from "../../hooks/useRealtimeMessages";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface RealtimeChatProps {
  conversationId: string;
}

export function RealtimeChat({ conversationId }: RealtimeChatProps) {
  const { messages, loading, sendMessage } =
    useRealtimeMessages(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="flex flex-col h-full"
      role="region"
      aria-label="Real-time chat"
    >
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 bg-white border-t border-gray-200">
        <MessageInput onSend={sendMessage} placeholder="Type a message" />
      </div>
    </div>
  );
}
