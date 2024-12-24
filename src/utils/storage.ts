import type { ApplicationData } from "../types/applications";

const STORAGE_PREFIX = "talenttrack_";

export function saveApplicationDraft(
  applicationId: string,
  data: Partial<ApplicationData>,
): void {
  const key = `${STORAGE_PREFIX}application_draft_${applicationId}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getApplicationDraft(
  applicationId: string,
): Partial<ApplicationData> | null {
  const key = `${STORAGE_PREFIX}application_draft_${applicationId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearApplicationDraft(applicationId: string): void {
  const key = `${STORAGE_PREFIX}application_draft_${applicationId}`;
  localStorage.removeItem(key);
}

export function getAllApplicationDrafts(): Array<{
  id: string;
  data: Partial<ApplicationData>;
}> {
  const drafts: Array<{ id: string; data: Partial<ApplicationData> }> = [];
  const draftPrefix = `${STORAGE_PREFIX}application_draft_`;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(draftPrefix)) {
      const id = key.replace(draftPrefix, "");
      const data = localStorage.getItem(key);
      if (data) {
        drafts.push({
          id,
          data: JSON.parse(data),
        });
      }
    }
  }

  return drafts;
}

export function clearAllApplicationDrafts(): void {
  const draftPrefix = `${STORAGE_PREFIX}application_draft_`;

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith(draftPrefix)) {
      localStorage.removeItem(key);
    }
  }
}

export function saveFormState<T>(formId: string, state: T): void {
  const key = `${STORAGE_PREFIX}form_state_${formId}`;
  localStorage.setItem(key, JSON.stringify(state));
}

export function getFormState<T>(formId: string): T | null {
  const key = `${STORAGE_PREFIX}form_state_${formId}`;
  const state = localStorage.getItem(key);
  return state ? JSON.parse(state) : null;
}

export function clearFormState(formId: string): void {
  const key = `${STORAGE_PREFIX}form_state_${formId}`;
  localStorage.removeItem(key);
}

export function clearAllFormStates(): void {
  const statePrefix = `${STORAGE_PREFIX}form_state_`;

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith(statePrefix)) {
      localStorage.removeItem(key);
    }
  }
}
