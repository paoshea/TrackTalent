import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";

export interface InterviewSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "unavailable";
  jobId?: string;
  candidateId?: string;
  interviewerId?: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface InterviewSlotData {
  startTime: string;
  endTime: string;
  status?: InterviewSlot["status"];
  jobId?: string;
  candidateId?: string;
  interviewerId?: string;
  location?: string;
  meetingUrl?: string;
  notes?: string;
}

interface UseInterviewSlotsOptions {
  jobId?: string;
  candidateId?: string;
  interviewerId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: InterviewSlot["status"];
}

export function useInterviewSlots(options: UseInterviewSlotsOptions = {}) {
  const { user } = useAuth();
  const [slots, setSlots] = useState<InterviewSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchSlots = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const {
          jobId,
          candidateId,
          interviewerId,
          startDate,
          endDate,
          status,
        } = options;

        let query = supabase
          .from("interview_slots")
          .select("*")
          .order("startTime", { ascending: true });

        if (jobId) {
          query = query.eq("jobId", jobId);
        }

        if (candidateId) {
          query = query.eq("candidateId", candidateId);
        }

        if (interviewerId) {
          query = query.eq("interviewerId", interviewerId);
        }

        if (startDate) {
          query = query.gte("startTime", startDate.toISOString());
        }

        if (endDate) {
          query = query.lte("endTime", endDate.toISOString());
        }

        if (status) {
          query = query.eq("status", status);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setSlots(data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load interview slots",
        );
        console.error("Error fetching interview slots:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("interview_slots")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "interview_slots",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setSlots((prev) => [...prev, payload.new as InterviewSlot]);
              break;
            case "UPDATE":
              setSlots((prev) =>
                prev.map((slot) =>
                  slot.id === payload.new.id
                    ? { ...slot, ...payload.new }
                    : slot,
                ),
              );
              break;
            case "DELETE":
              setSlots((prev) =>
                prev.filter((slot) => slot.id !== payload.old.id),
              );
              break;
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, options]);

  const createSlot = async (data: InterviewSlotData) => {
    if (!user) throw new Error("User must be authenticated");

    try {
      const { data: slot, error } = await supabase
        .from("interview_slots")
        .insert({
          ...data,
          status: data.status || "available",
        })
        .select()
        .single();

      if (error) throw error;
      return slot;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to create interview slot",
      );
    }
  };

  const updateSlot = async (id: string, data: Partial<InterviewSlotData>) => {
    if (!user) throw new Error("User must be authenticated");

    try {
      const { data: slot, error } = await supabase
        .from("interview_slots")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return slot;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to update interview slot",
      );
    }
  };

  const deleteSlot = async (id: string) => {
    if (!user) throw new Error("User must be authenticated");

    try {
      const { error } = await supabase
        .from("interview_slots")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to delete interview slot",
      );
    }
  };

  return {
    slots,
    isLoading,
    error,
    createSlot,
    updateSlot,
    deleteSlot,
  };
}
