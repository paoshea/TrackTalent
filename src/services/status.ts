import { supabase } from "../lib/supabase";
import type {
  Status,
  StatusUpdate,
  StatusMetrics,
  CreateStatusParams,
} from "../types/status";

export async function createStatus(
  params: CreateStatusParams,
): Promise<Status> {
  const { data: status, error } = await supabase
    .from("statuses")
    .insert({
      user_id: params.userId,
      content: params.content,
      visibility: params.visibility || "public",
      metadata: params.metadata,
    })
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create status");
  }

  return {
    id: status.id,
    userId: status.user_id,
    userName: status.user_name,
    type: status.type || "update",
    content: status.content,
    createdAt: status.created_at,
    updatedAt: status.updated_at,
    likes: 0,
    comments: 0,
    shares: 0,
    hasLiked: false,
    visibility: status.visibility,
  };
}

export async function updateStatus(
  id: string,
  data: StatusUpdate,
): Promise<Status> {
  const { data: status, error } = await supabase
    .from("statuses")
    .update({
      content: data.content,
      visibility: data.visibility,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Failed to update status");
  }

  return {
    id: status.id,
    userId: status.user_id,
    userName: status.user_name,
    type: status.type,
    content: status.content,
    createdAt: status.created_at,
    updatedAt: status.updated_at,
    likes: status.metrics?.likes || 0,
    comments: status.metrics?.comments || 0,
    shares: status.metrics?.shares || 0,
    hasLiked: status.has_liked || false,
    visibility: status.visibility,
  };
}

export async function deleteStatus(id: string): Promise<void> {
  const { error } = await supabase.from("statuses").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete status");
  }
}

export async function getStatusMetrics(id: string): Promise<StatusMetrics> {
  const { data, error } = await supabase
    .from("status_metrics")
    .select("*")
    .eq("status_id", id)
    .single();

  if (error) {
    throw new Error("Failed to fetch status metrics");
  }

  return {
    likes: data.likes,
    comments: data.comments,
    shares: data.shares,
    views: data.views,
    engagementRate: data.engagement_rate,
  };
}
