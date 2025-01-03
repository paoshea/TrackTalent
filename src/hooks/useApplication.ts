import { useState, useEffect } from "react";
import type { Application, ApplicationStatus, ApplicationMetadata, TimelineEvent } from "../types/applications";
import { applications } from "../services/applications";
import type { Json } from "../types/supabase";

interface UseApplicationResult {
  application: Application | null;
  loading: boolean;
  error: string | null;
  updateStatus: (status: ApplicationStatus) => Promise<void>;
  addNote: (note: string) => Promise<void>;
  scheduleInterview: (date: Date) => Promise<void>;
}

interface ApiCompany {
  id: string;
  name: string;
  logo_url: string;
}

interface ApiJob {
  id: string;
  company_id: string;
  title: string;
  description: string | null;
  location: string | null;
  type: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  company: ApiCompany[];
}

interface ApiApplication {
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
  next_step: string | null;
  next_step_date: string | null;
  job: ApiJob[];
}

function parseTimelineEvents(timeline: Json[]): TimelineEvent[] {
  if (!Array.isArray(timeline)) return [];
  
  return timeline
    .map(event => {
      if (typeof event !== 'object' || event === null) return null;
      
      const { id, type, description, timestamp, ...rest } = event as Record<string, unknown>;
      
      if (
        typeof id !== 'string' ||
        typeof type !== 'string' ||
        typeof description !== 'string' ||
        typeof timestamp !== 'string'
      ) {
        return null;
      }

      const timelineEvent: TimelineEvent = {
        id,
        type,
        description,
        timestamp
      };

      if (Object.keys(rest).length > 0) {
        timelineEvent.metadata = rest;
      }

      return timelineEvent;
    })
    .filter((event): event is TimelineEvent => event !== null);
}

function validateAndMapApplication(data: unknown): Application | null {
  try {
    const apiApp = data as ApiApplication;
    
    // Validate required fields and structure
    if (!apiApp?.job?.[0]?.company?.[0]) {
      console.error('Invalid application data structure:', apiApp);
      return null;
    }

    const job = apiApp.job[0];
    const company = job.company[0];

    const metadata: ApplicationMetadata = {};

    // Handle resume_url
    if (apiApp.resume_url) {
      metadata.resume_url = apiApp.resume_url;
    }

    // Handle cover_letter
    if (apiApp.cover_letter) {
      metadata.cover_letter = apiApp.cover_letter;
    }

    // Handle timeline
    const timelineEvents = parseTimelineEvents(apiApp.timeline);
    if (timelineEvents.length > 0) {
      metadata.timeline = timelineEvents;
    }

    // Handle answers
    if (apiApp.answers && typeof apiApp.answers === 'object') {
      const answers: Record<string, string> = {};
      Object.entries(apiApp.answers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          answers[key] = value;
        }
      });
      if (Object.keys(answers).length > 0) {
        metadata.answers = answers;
      }
    }

    // Add any additional metadata if it exists and is an object
    if (apiApp.metadata && typeof apiApp.metadata === 'object') {
      Object.entries(apiApp.metadata).forEach(([key, value]) => {
        if (value !== null) {
          metadata[key] = value;
        }
      });
    }

    return {
      id: apiApp.id,
      jobId: apiApp.job_id,
      userId: apiApp.candidate_id,
      status: apiApp.status as ApplicationStatus,
      appliedAt: apiApp.submitted_at || apiApp.created_at,
      updatedAt: apiApp.updated_at,
      job: {
        id: job.id,
        title: job.title,
        location: job.location || "",
        company: {
          id: company.id,
          name: company.name,
          logo: company.logo_url
        }
      },
      nextStep: apiApp.next_step || null,
      nextStepDate: apiApp.next_step_date || null,
      feedback: typeof apiApp.feedback === 'object' && apiApp.feedback 
        ? (apiApp.feedback as { message?: string }).message || null 
        : null,
      metadata
    };
  } catch (error) {
    console.error('Error mapping application:', error);
    return null;
  }
}

export function useApplication(id: string): UseApplicationResult {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const data = await applications.getById(id);
        const mappedApp = validateAndMapApplication(data);
        if (mappedApp) {
          setApplication(mappedApp);
          setError(null);
        } else {
          throw new Error("Invalid application data received");
        }
      } catch (err) {
        const appError = err as Error;
        setError(appError.message || "Failed to load application");
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  const updateStatus = async (status: ApplicationStatus) => {
    if (!application) return;

    try {
      const updatedApplication = await applications.updateStatus(id, status);
      const mappedApp = validateAndMapApplication(updatedApplication);
      if (mappedApp) {
        setApplication(mappedApp);
        setError(null);
      } else {
        throw new Error("Invalid application data received");
      }
    } catch (err) {
      const appError = err as Error;
      setError(appError.message || "Failed to update status");
    }
  };

  const addNote = async (note: string) => {
    if (!application) return;

    try {
      const updatedApplication = await applications.addNote(id, note);
      const mappedApp = validateAndMapApplication(updatedApplication);
      if (mappedApp) {
        setApplication(mappedApp);
        setError(null);
      } else {
        throw new Error("Invalid application data received");
      }
    } catch (err) {
      const appError = err as Error;
      setError(appError.message || "Failed to add note");
    }
  };

  const scheduleInterview = async (date: Date) => {
    if (!application) return;

    try {
      const updatedApplication = await applications.scheduleInterview(id, date);
      const mappedApp = validateAndMapApplication(updatedApplication);
      if (mappedApp) {
        setApplication(mappedApp);
        setError(null);
      } else {
        throw new Error("Invalid application data received");
      }
    } catch (err) {
      const appError = err as Error;
      setError(appError.message || "Failed to schedule interview");
    }
  };

  return {
    application,
    loading,
    error,
    updateStatus,
    addNote,
    scheduleInterview,
  };
}
