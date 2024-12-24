import { supabase } from "../lib/supabase";
import type { Application, ApplicationStatus } from "../types/applications";

export const applications = {
  async getById(id: string) {
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        *,
        job:jobs(*),
        user:profiles(*)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async getAll(filters?: {
    userId?: string;
    jobId?: string;
    status?: ApplicationStatus;
  }) {
    let query = supabase.from("applications").select(`
      *,
      job:jobs(*),
      user:profiles(*)
    `);

    if (filters?.userId) {
      query = query.eq("user_id", filters.userId);
    }
    if (filters?.jobId) {
      query = query.eq("job_id", filters.jobId);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async submit(jobId: string, data: Partial<Application>) {
    const { data: application, error } = await supabase
      .from("applications")
      .insert({
        job_id: jobId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        status: "pending",
        ...data,
      })
      .select()
      .single();

    if (error) throw error;
    return application;
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addNote(id: string, note: string) {
    const { data: currentApp } = await supabase
      .from("applications")
      .select("notes")
      .eq("id", id)
      .single();

    const notes = currentApp?.notes || [];
    notes.push({
      text: note,
      createdAt: new Date().toISOString(),
      createdBy: (await supabase.auth.getUser()).data.user?.id,
    });

    const { data, error } = await supabase
      .from("applications")
      .update({
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async scheduleInterview(id: string, date: Date) {
    const { data, error } = await supabase
      .from("applications")
      .update({
        interview_date: date.toISOString(),
        status: "interview_scheduled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
