import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageThread } from "../../components/messages/MessageThread";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../hooks/useAuth";
import type { Conversation } from "../../types/messages";

export function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!id || !user) return;

      try {
        const { data, error: fetchError } = await supabase
          .from("conversations")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;

        setConversation(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch conversation",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [id, user]);

  if (!id || !user) return null;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!conversation) return <div>Conversation not found</div>;

  const recipientId = conversation.participants.find((p) => p !== user.id);
  if (!recipientId) return <div>Invalid conversation</div>;

  return (
    <div className="h-full">
      <MessageThread conversationId={id} recipientId={recipientId} />
    </div>
  );
}
