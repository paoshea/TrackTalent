import { useState, useEffect } from "react";
import type { Application } from "../types/applications";
import { applications } from "../services/applications";

interface UseApplicationResult {
  application: Application | null;
  loading: boolean;
  error: string | null;
  updateStatus: (status: string) => Promise<void>;
  addNote: (note: string) => Promise<void>;
  scheduleInterview: (date: Date) => Promise<void>;
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
        setApplication(data);
        setError(null);
      } catch (err) {
        setError("Failed to load application");
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const updateStatus = async (status: string) => {
    if (!application) return;

    try {
      const updatedApplication = await applications.updateStatus(id, status);
      setApplication(updatedApplication);
      setError(null);
    } catch (err) {
      setError("Failed to update status");
    }
  };

  const addNote = async (note: string) => {
    if (!application) return;

    try {
      const updatedApplication = await applications.addNote(id, note);
      setApplication(updatedApplication);
      setError(null);
    } catch (err) {
      setError("Failed to add note");
    }
  };

  const scheduleInterview = async (date: Date) => {
    if (!application) return;

    try {
      const updatedApplication = await applications.scheduleInterview(id, date);
      setApplication(updatedApplication);
      setError(null);
    } catch (err) {
      setError("Failed to schedule interview");
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
