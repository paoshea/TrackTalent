import { useEffect, useCallback, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import type {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

type UpdateHandler<T> = (payload: T) => void;

interface UseRealtimeUpdatesOptions<T> {
  table: string;
  onInsert?: UpdateHandler<T>;
  onUpdate?: UpdateHandler<T>;
  onDelete?: UpdateHandler<T>;
  filter?: {
    column: string;
    value: string | number;
  };
}

export function useRealtimeUpdates<T extends Record<string, unknown>>({
  table,
  onInsert,
  onUpdate,
  onDelete,
  filter,
}: UseRealtimeUpdatesOptions<T>) {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  const handleInsert = useCallback(
    (payload: RealtimePostgresChangesPayload<T>) => {
      if (onInsert && payload.new && Object.keys(payload.new).length > 0) {
        onInsert(payload.new as T);
      }
    },
    [onInsert],
  );

  const handleUpdate = useCallback(
    (payload: RealtimePostgresChangesPayload<T>) => {
      if (onUpdate && payload.new && Object.keys(payload.new).length > 0) {
        onUpdate(payload.new as T);
      }
    },
    [onUpdate],
  );

  const handleDelete = useCallback(
    (payload: RealtimePostgresChangesPayload<T>) => {
      if (onDelete && payload.old && Object.keys(payload.old).length > 0) {
        onDelete(payload.old as T);
      }
    },
    [onDelete],
  );

  useEffect(() => {
    if (!user) return;

    let channel: RealtimeChannel | null = null;

    try {
      channel = supabase.channel(`${table}_changes`);

      if (channel) {
        channel
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table,
              filter: filter
                ? `${filter.column}=eq.${filter.value}`
                : undefined,
            },
            handleInsert,
          )
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table,
              filter: filter
                ? `${filter.column}=eq.${filter.value}`
                : undefined,
            },
            handleUpdate,
          )
          .on(
            "postgres_changes",
            {
              event: "DELETE",
              schema: "public",
              table,
              filter: filter
                ? `${filter.column}=eq.${filter.value}`
                : undefined,
            },
            handleDelete,
          )
          .subscribe((status) => {
            setIsConnected(status === "SUBSCRIBED");
          });
      }
    } catch (error) {
      console.error("Error setting up realtime subscription:", error);
      setIsConnected(false);
    }

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [user, table, filter, handleInsert, handleUpdate, handleDelete]);

  return { isConnected };
}
