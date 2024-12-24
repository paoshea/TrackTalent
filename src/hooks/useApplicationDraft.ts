import { useState, useCallback, useEffect } from "react";
import {
  saveApplicationDraft,
  getApplicationDraft,
  clearApplicationDraft,
} from "../utils/storage";
import type { ApplicationData } from "../types/applications";

export function useApplicationDraft(applicationId: string) {
  const [draft, setDraft] = useState<Partial<ApplicationData> | null>(null);

  useEffect(() => {
    const savedDraft = getApplicationDraft(applicationId);
    if (savedDraft) {
      setDraft(savedDraft);
    }
  }, [applicationId]);

  const saveDraft = useCallback(
    (data: Partial<ApplicationData>) => {
      saveApplicationDraft(applicationId, data);
      setDraft(data);
    },
    [applicationId],
  );

  const clearDraft = useCallback(() => {
    clearApplicationDraft(applicationId);
    setDraft(null);
  }, [applicationId]);

  return {
    draft,
    saveDraft,
    clearDraft,
  };
}
