import { useContext } from "react";
import { JobFormContext } from "../contexts/JobFormContext";
import type { JobFormContextValue } from "../types/forms";

export function useJobFormContext(): JobFormContextValue {
  const context = useContext(JobFormContext);
  if (context === undefined) {
    throw new Error("useJobFormContext must be used within a JobFormProvider");
  }
  return context;
}
