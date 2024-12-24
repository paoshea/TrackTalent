import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./useAuth";
import type { Experience } from "../types/candidate";

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
          jobId: data.jobId,
          candidateId: user.id,
          status: "submitted",
          coverLetter: data.coverLetter,
          resumeUrl: data.resumeUrl,
          portfolioUrl: data.portfolioUrl,
          linkedinUrl: data.linkedinUrl,
          githubUrl: data.githubUrl,
          websiteUrl: data.websiteUrl,
          additionalInfo: data.additionalInfo,
          expectedSalary: data.expectedSalary,
          availability: data.availability,
          skills: data.skills,
          experience: data.experience,
          education: data.education,
          certifications: data.certifications,
        })
        .select()
        .single();

      if (applicationError) throw applicationError;

      setProgress(25);

      // Add references if provided
      if (data.references?.length) {
        const { error: referencesError } = await supabase
          .from("application_references")
          .insert(
            data.references.map((ref) => ({
              applicationId: application.id,
              ...ref,
            })),
          );

        if (referencesError) throw referencesError;
      }

      setProgress(50);

      // Add question responses if provided
      if (data.questions && Object.keys(data.questions).length) {
        const { error: questionsError } = await supabase
          .from("application_responses")
          .insert(
            Object.entries(data.questions).map(([questionId, response]) => ({
              applicationId: application.id,
              questionId,
              response,
            })),
          );

        if (questionsError) throw questionsError;
      }

      setProgress(75);

      // Update job metrics
      const { error: metricsError } = await supabase.rpc(
        "increment_job_applications",
        {
          job_id: data.jobId,
        },
      );

      if (metricsError) throw metricsError;

      setProgress(100);
      options.onSuccess?.(data);
      return application;
    } catch (err) {
      const error = new Error(
        err instanceof Error ? err.message : "Failed to submit application",
      );
      setError(error.message);
      options.onError?.(error);
      throw error;
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
