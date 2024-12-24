import { useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";

export function useFormPersistence<T extends Record<string, unknown>>(
  key: string,
  initialData: T,
  onLoad?: (data: T) => void,
) {
  const { user } = useAuth();
  const storageKey = `form_${key}_${user?.id}`;

  const saveData = useCallback(
    (data: T) => {
      if (!user) return;
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
    [user, storageKey],
  );

  const loadData = useCallback((): T => {
    if (!user) return initialData;
    const savedData = localStorage.getItem(storageKey);
    if (!savedData) return initialData;
    try {
      return JSON.parse(savedData);
    } catch {
      return initialData;
    }
  }, [user, storageKey, initialData]);

  const clearData = useCallback(() => {
    if (!user) return;
    localStorage.removeItem(storageKey);
  }, [user, storageKey]);

  useEffect(() => {
    const savedData = loadData();
    if (onLoad && savedData !== initialData) {
      onLoad(savedData);
    }
  }, [loadData, onLoad, initialData]);

  return {
    saveData,
    loadData,
    clearData,
  };
}
