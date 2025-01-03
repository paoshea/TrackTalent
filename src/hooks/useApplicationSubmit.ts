import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import type { Experience } from "../types/candidate";
import type { PostgrestError } from "@supabase/supabase-js";

export interface ApplicationData extends Record<string, unknown> {
  jobId: string;
  coverLetter: string;
  resumeUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  references?: {
    name: string;
    position: string;
    company: string;
    email: string;
    phone?: string;
    relationship: string;
  }[];
  additionalInfo?: string;
  availability?: {
    startDate: string;
    noticePeriod?: string;
    preferredSchedule?: string[];
  };
  expectedSalary?: {
    amount: number;
    currency: string;
    frequency: "yearly" | "monthly" | "hourly";
  };
  questions?: Record<string, string>;
  skills?: string[];
  experience?: {
    years: number;
    relevantAreas: Experience[];
    highlights: string[];
  };
  education?: {
    level: string;
    field: string;
    institution: string;
    graduationYear: number;
    gpa?: number;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
  }[];
}

interface UseApplicationSubmitOptions {
  onSuccess?: (data: ApplicationData) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

interface SubmitError extends Error {
  code?: string;
  details?: string;
  hint?: string;
}

export function useApplicationSubmit(
  options: UseApplicationSubmitOptions = {},
) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: ApplicationData) => {
    if (!user) {
      throw new Error("User must be authenticated to submit application");
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setProgress(0);

      // Create application record
      const { data: application, error: applicationError } = await supabase
        .from("applications")
        .insert({
          job_id: data.jobId,
          candidate_id: user.id,
          status: "submitted",
          cover_letter: data.coverLetter,
          resume_url: data.resumeUrl,
          portfolio_url: data.portfolioUrl,
          linkedin_url: data.linkedinUrl,
          github_url: data.githubUrl,
          website_url: data.websiteUrl,
          additional_info: data.additionalInfo,
          expected_salary: data.expectedSalary,
          availability: data.availability,
          skills: data.skills,
          experience: data.experience,
          education: data.education,
          certifications: data.certifications,
          metadata: {
            submitted_at: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (applicationError) {
        throw new Error(applicationError.message);
      }

      setProgress(25);

      // Add references if provided
      if (data.references?.length) {
        const { error: referencesError } = await supabase
          .from("application_references")
          .insert(
            data.references.map((ref) => ({
              application_id: application.id,
              name: ref.name,
              position: ref.position,
              company: ref.company,
              email: ref.email,
              phone: ref.phone,
              relationship: ref.relationship
            })),
          );

        if (referencesError) {
          throw new Error(referencesError.message);
        }
      }

      setProgress(50);

      // Add question responses if provided
      if (data.questions && Object.keys(data.questions).length) {
        const { error: questionsError } = await supabase
          .from("application_responses")
          .insert(
            Object.entries(data.questions).map(([questionId, response]) => ({
              application_id: application.id,
              question_id: questionId,
              response,
            })),
          );

        if (questionsError) {
          throw new Error(questionsError.message);
        }
      }

      setProgress(75);

      // Add application timeline event
      const { error: timelineError } = await supabase.rpc(
        "add_application_timeline_event",
        {
          application_id: application.id,
          event_type: "submitted",
          event_data: {
            submitted_by: user.id,
            submitted_at: new Date().toISOString()
          }
        }
      );

      if (timelineError) {
        throw new Error(timelineError.message);
      }

      setProgress(100);
      options.onSuccess?.(data);
      return application;
    } catch (err) {
      const submitError: SubmitError = err instanceof Error 
        ? err 
        : new Error("Failed to submit application");

      if ((err as PostgrestError)?.code) {
        submitError.code = (err as PostgrestError).code;
        submitError.details = (err as PostgrestError).details;
        submitError.hint = (err as PostgrestError).hint;
      }

      setError(submitError.message);
      options.onError?.(submitError);
      throw submitError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
    progress,
    error,
  };
}
