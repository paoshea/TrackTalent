import { useState, useEffect } from "react";
import type { Conversation, DatabaseMessage } from "../types/messages";
import { convertDatabaseMessage } from "../types/messages";
import { supabase } from "../lib/supabase";

/**
 * Hook for managing the list of all conversations.
 * Used for conversation list/inbox views where users can see all their conversations.
 * For managing a single conversation, see useConversation.
 *
 * Features:
 * - Fetches all conversations with their latest messages
 * - Real-time updates through Supabase subscription
 * - Tracks unread message counts
 * - Orders conversations by most recent activity
 *
 * @returns List of conversations and loading state
 */
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // First get all conversations
        const { data: conversationsData, error: conversationsError } =
          await supabase
            .from("conversations")
            .select(
              `
            *,
            messages:messages(*)
          `,
            )
            .order("updated_at", { ascending: false });

        if (conversationsError) throw conversationsError;

        // Transform the data
        const formattedConversations: Conversation[] = conversationsData.map(
          (conv) => ({
            id: conv.id,
            participants: conv.participants,
            messages: (conv.messages as DatabaseMessage[]).map(
              convertDatabaseMessage,
            ),
            lastMessage:
              conv.messages.length > 0
                ? convertDatabaseMessage(
                    conv.messages[conv.messages.length - 1] as DatabaseMessage,
                  )
                : undefined,
            unreadCount: (conv.messages as DatabaseMessage[]).filter(
              (m) => !m.is_read && m.recipient_id === "user",
            ).length,
            createdAt: conv.created_at,
            updatedAt: conv.updated_at,
            company: conv.company_name,
            companyId: conv.company_id,
          }),
        );

        setConversations(formattedConversations);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch conversations",
        );
      } finally {
        setIsLoading(false);
      }
    };

    const subscription = supabase
      .channel("conversations")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          // Refetch conversations when there are changes
          fetchConversations();
        },
      )
      .subscribe();

    fetchConversations();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    conversations,
    isLoading,
    error,
  };
}
