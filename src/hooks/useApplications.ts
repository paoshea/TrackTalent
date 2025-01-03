import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { getMockApplications } from "../services/mockApplications";
import type { Application, ApplicationStatus, TimelineEvent } from "../types/applications";
import type { ApplicationMetadata } from "../types/applications";
import type { Json } from "../types/supabase";

interface SupabaseCompany {
  id: string;
  name: string;
  logo_url: string;
}

interface SupabaseJob {
  id: string;
  title: string;
  location: string | null;
  company: SupabaseCompany[];
}

interface SupabaseResponse {
  id: string;
  job_id: string;
  candidate_id: string;
  status: string;
  cover_letter: string | null;
  resume_url: string | null;
  answers: Json;
  timeline: Json[];
  feedback: Json;
  metadata: Json;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
  job: SupabaseJob[];
}

function parseTimelineEvents(timeline: Json[]): TimelineEvent[] {
  if (!Array.isArray(timeline)) return [];
  
  const validEvents: TimelineEvent[] = [];
  
  for (const event of timeline) {
    if (
      typeof event === 'object' &&
      event !== null &&
      'id' in event &&
      'type' in event &&
      'description' in event &&
      'timestamp' in event &&
      typeof event.id === 'string' &&
      typeof event.type === 'string' &&
      typeof event.description === 'string' &&
      typeof event.timestamp === 'string'
    ) {
      const timelineEvent: TimelineEvent = {
        id: event.id,
        type: event.type,
        description: event.description,
        timestamp: event.timestamp
      };

      // Handle optional metadata
      const { ...rest } = event;
      if (Object.keys(rest).length > 0) {
        timelineEvent.metadata = rest;
      }

      validEvents.push(timelineEvent);
    }
  }

  return validEvents;
}

function validateAndMapApplication(data: unknown): Application | null {
  try {
    const response = data as SupabaseResponse;
    // Validate required fields and structure
    if (!response?.job?.[0]?.company?.[0]) {
      return null;
    }

    const job = response.job[0];
    const company = job.company[0];

    const metadata: ApplicationMetadata = {};

    // Handle resume_url
    if (response.resume_url) {
      metadata.resume_url = response.resume_url;
    }

    // Handle cover_letter
    if (response.cover_letter) {
      metadata.cover_letter = response.cover_letter;
    }

    // Parse timeline events
    const timelineEvents = parseTimelineEvents(response.timeline);

    // Handle answers
    if (response.answers && typeof response.answers === 'object') {
      const answers: Record<string, string> = {};
      Object.entries(response.answers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          answers[key] = value;
        }
      });
      if (Object.keys(answers).length > 0) {
        metadata.answers = answers;
      }
    }

    // Add any additional metadata if it exists and is an object
    if (response.metadata && typeof response.metadata === 'object') {
      Object.entries(response.metadata).forEach(([key, value]) => {
        if (value !== null) {
          metadata[key] = value;
        }
      });
    }

    return {
      id: response.id,
      jobId: response.job_id,
      userId: response.candidate_id,
      status: response.status as ApplicationStatus,
      appliedAt: response.submitted_at || response.created_at,
      updatedAt: response.updated_at,
      job: {
        id: job.id,
        title: job.title,
        location: job.location || "",
        type: "full-time", // Default value, should come from API
        experience_level: "mid", // Default value, should come from API
        company: {
          id: company.id,
          name: company.name,
          logo: company.logo_url
        }
      },
      nextStep: null,
      nextStepDate: null,
      feedback: typeof response.feedback === 'object' && response.feedback 
        ? (response.feedback as { message?: string }).message || null 
        : null,
      metadata,
      timeline: timelineEvents
    };
  } catch (error) {
    console.error('Error mapping application:', error);
    return null;
  }
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);
        
        if (import.meta.env.DEV) {
          // Use mock data in development
          const mockData = await getMockApplications();
          setApplications(mockData);
        } else {
          // Fetch applications from Supabase in production
          const { data, error: fetchError } = await supabase
            .from('applications')
            .select(`
              *,
              job:jobs (
                id,
                title,
                location,
                company:companies (
                  id,
                  name,
                  logo_url
                )
              )
            `)
            .order('created_at', { ascending: false });

          if (fetchError) throw fetchError;
          
          if (!data) {
            setApplications([]);
            return;
          }

          const validApplications = data
            .map(validateAndMapApplication)
            .filter((app): app is Application => app !== null);

          setApplications(validApplications);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  return { applications, loading, error };
}
