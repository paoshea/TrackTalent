import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import type { InteractionEvent, InteractionType } from "../types/interaction";

interface UseActivityInteractionsOptions {
  activityId: string;
}

export function useActivityInteractions({
  activityId,
}: UseActivityInteractionsOptions) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInteraction = async (
    type: InteractionType,
    metadata?: InteractionEvent["metadata"],
  ) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      // Check if user has already interacted (for likes)
      if (type === "like") {
        const { data: existingLike } = await supabase
          .from("activity_interactions")
          .select("id")
          .eq("activityId", activityId)
          .eq("userId", user.id)
          .eq("type", "like")
          .single();

        if (existingLike) {
          // Unlike if already liked
          const { error: deleteError } = await supabase
            .from("activity_interactions")
            .delete()
            .eq("id", existingLike.id);

          if (deleteError) throw deleteError;
          return;
        }
      }

      // Create new interaction
      const { error: insertError } = await supabase
        .from("activity_interactions")
        .insert({
          type,
          targetId: activityId,
          targetType: "status", // Default to status type
          userId: user.id,
          metadata,
        });

      if (insertError) throw insertError;

      // Update activity metrics
      const { error: updateError } = await supabase.rpc(
        "increment_activity_count",
        {
          activity_id: activityId,
          interaction_type: type,
        },
      );

      if (updateError) throw updateError;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process interaction",
      );
      console.error("Error handling interaction:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const like = async () => {
    await handleInteraction("like");
  };

  const comment = async (content: string) => {
    await handleInteraction("comment", { content });
  };

  const share = async (users: string[]) => {
    await handleInteraction("share", { 
      content: `Shared with ${users.length} users`,
      attachments: [] 
    });
  };

  return {
    like,
    comment,
    share,
    isLoading,
    error,
  };
}
