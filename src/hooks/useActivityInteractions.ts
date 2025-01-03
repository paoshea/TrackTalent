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
          .eq("activity_id", activityId)
          .eq("user_id", user.id)
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
          target_id: activityId,
          target_type: "status", // Default to status type
          user_id: user.id,
          metadata,
        });

      if (insertError) throw insertError;

      // Update activity metrics
      const { data: activity } = await supabase
        .from('activities')
        .select('metadata')
        .eq('id', activityId)
        .single();

      const metrics = activity?.metadata?.metrics || {};
      metrics[type] = (metrics[type] || 0) + 1;

      const { error: updateError } = await supabase
        .from('activities')
        .update({
          metadata: {
            ...activity?.metadata,
            metrics
          }
        })
        .eq('id', activityId);

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
      attachments: [],
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
