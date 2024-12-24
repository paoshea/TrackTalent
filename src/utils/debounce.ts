import { useCallback, useRef } from "react";

export function useDebounce<T, R>(
  callback: (arg: T) => R,
  delay: number,
): (arg: T) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  // Keep the callback ref up to date
  callbackRef.current = callback;

  return useCallback(
    (arg: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(arg);
      }, delay);
    },
    [delay],
  );
}
