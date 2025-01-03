import { supabase } from "../lib/supabase";
import type { Application, ApplicationStatus } from "../types/applications";
import type { Database } from "../types/database";

type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];

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
      query = query.eq("candidate_id", filters.userId);
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('Not authenticated');

    const applicationData: ApplicationInsert = {
      job_id: jobId,
      candidate_id: user.id,
      status: "submitted",
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      cover_letter: data.metadata?.cover_letter || null,
      resume_url: data.metadata?.resume_url || null,
      answers: data.metadata?.answers || null,
      timeline: [],
      feedback: null,
      metadata: {
        skills: data.metadata?.skills || [],
        experience: data.metadata?.experience || [],
        education: data.metadata?.education || []
      }
    };

    const { data: application, error } = await supabase
      .from("applications")
      .insert(applicationData)
      .select()
      .single();

    if (error) throw error;
    return application;
  },

  async updateStatus(id: string, status: string) {
    // First get the current application to access its timeline
    const { data: currentApp, error: fetchError } = await supabase
      .from("applications")
      .select("timeline")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const timestamp = new Date().toISOString();
    const newEvent = {
      type: 'status_change',
      description: `Status changed to ${status}`,
      timestamp
    };

    const { data, error } = await supabase
      .from("applications")
      .update({
        status,
        updated_at: timestamp,
        timeline: [...(currentApp.timeline || []), newEvent]
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addNote(id: string, note: string) {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('Not authenticated');

    // First get the current application to access its timeline
    const { data: currentApp, error: fetchError } = await supabase
      .from("applications")
      .select("timeline")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const timestamp = new Date().toISOString();
    const newEvent = {
      type: 'note',
      description: note,
      timestamp,
      user_id: user.id
    };

    const { data, error } = await supabase
      .from("applications")
      .update({
        updated_at: timestamp,
        timeline: [...(currentApp.timeline || []), newEvent]
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async scheduleInterview(id: string, date: Date) {
    // First get the current application to access its timeline
    const { data: currentApp, error: fetchError } = await supabase
      .from("applications")
      .select("timeline")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const timestamp = new Date().toISOString();
    const newEvent = {
      type: 'interview_scheduled',
      description: `Interview scheduled for ${date.toLocaleString()}`,
      timestamp,
      interview_date: date.toISOString()
    };

    const { data, error } = await supabase
      .from("applications")
      .update({
        next_step: 'interview',
        next_step_date: date.toISOString(),
        status: "interview_scheduled",
        updated_at: timestamp,
        timeline: [...(currentApp.timeline || []), newEvent]
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
