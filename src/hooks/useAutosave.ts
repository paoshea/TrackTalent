import { useState, useCallback, useRef, useEffect } from "react";
import { useDebounce } from "../utils/debounce";

interface AutosaveState {
  status: "saving" | "saved" | "error";
  lastSaved: Date | null;
}

type SaveFunction<T> = (data: T) => Promise<void> | void;

export function useAutosave<T>(saveFunction: SaveFunction<T>) {
  const [state, setState] = useState<AutosaveState>({
    status: "saved",
    lastSaved: null,
  });

  // Keep a ref to the latest save function to avoid dependency issues
  const saveFunctionRef = useRef(saveFunction);
  useEffect(() => {
    saveFunctionRef.current = saveFunction;
  }, [saveFunction]);

  const save = useCallback(
    async (data: T) => {
      setState((prev) => ({ ...prev, status: "saving" }));
      try {
        await saveFunctionRef.current(data);
        setState({ status: "saved", lastSaved: new Date() });
      } catch (error) {
        setState((prev) => ({ ...prev, status: "error" }));
      }
    },
    [], // No dependencies needed since we use ref
  );

  // Type assertion to match the SaveFunction type
  const debouncedSave = useDebounce<SaveFunction<T>>(save, 1000);

  return {
    autosaveState: state,
    triggerAutosave: debouncedSave,
  };
}
