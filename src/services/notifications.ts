import { supabase } from "../lib/supabase";
import type { StatusNotification } from "../types/status";

export async function createStatusNotification(
  userId: string,
  statusId: string,
  type: "mention" | "reply" | "like",
) {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: `status_${type}`,
    reference_id: statusId,
    read: false,
  });

  if (error) throw error;
}

export async function getStatusNotifications(
  userId: string,
  options: { limit?: number; offset?: number } = {},
): Promise<StatusNotification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `
      *,
      status:status_updates(*),
      actor:profiles(name, avatar_url)
    `,
    )
    .eq("user_id", userId)
    .like("type", "status_%")
    .order("created_at", { ascending: false })
    .limit(options.limit || 10)
    .range(
      options.offset || 0,
      (options.offset || 0) + (options.limit || 10) - 1,
    );

  if (error) throw error;
  return data;
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .in("id", notificationIds);

  if (error) throw error;
}
