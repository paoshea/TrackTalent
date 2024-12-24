import { supabase } from "../lib/supabase";
import type { JobFormData } from "../types/jobs";

export async function createJob(jobData: JobFormData) {
  const { data, error } = await supabase
    .from("jobs")
    .insert(jobData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getJobs(filters?: Partial<JobFormData>) {
  let query = supabase.from("jobs").select("*");

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query = query.eq(key, value);
    });
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getJobById(id: string) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateJob(id: string, updates: Partial<JobFormData>) {
  const { data, error } = await supabase
    .from("jobs")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(id: string) {
  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) throw error;
}

export async function toggleJobBookmark(jobId: string, userId: string) {
  const { data: existing, error: checkError } = await supabase
    .from("job_bookmarks")
    .select()
    .eq("job_id", jobId)
    .eq("user_id", userId)
    .single();

  if (checkError && checkError.code !== "PGRST116") throw checkError;

  if (existing) {
    const { error } = await supabase
      .from("job_bookmarks")
      .delete()
      .eq("job_id", jobId)
      .eq("user_id", userId);

    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from("job_bookmarks")
      .insert({ job_id: jobId, user_id: userId });

    if (error) throw error;
    return true;
  }
}
