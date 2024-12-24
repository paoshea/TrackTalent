import { supabase } from "../lib/supabase";
import type { InteractionEvent, Comment } from "../types/interaction";

export async function createInteraction(
  event: InteractionEvent,
): Promise<void> {
  const { error } = await supabase.from("activity_interactions").insert({
    activity_id: event.activityId,
    user_id: event.userId,
    type: event.type,
    metadata: event.metadata,
  });

  if (error) throw error;
}

export async function deleteInteraction(
  activityId: string,
  type: InteractionEvent["type"],
): Promise<void> {
  const { error } = await supabase
    .from("activity_interactions")
    .delete()
    .match({
      activity_id: activityId,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      type,
    });

  if (error) throw error;
}

export async function getComments(activityId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("activity_comments")
    .select(
      `
      *,
      user:profiles(name, avatar_url)
    `,
    )
    .eq("activity_id", activityId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function addComment(
  activityId: string,
  content: string,
): Promise<Comment> {
  const { data, error } = await supabase
    .from("activity_comments")
    .insert({
      activity_id: activityId,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      content,
    })
    .select(
      `
      *,
      user:profiles(name, avatar_url)
    `,
    )
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from("activity_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

  if (error) throw error;
}
