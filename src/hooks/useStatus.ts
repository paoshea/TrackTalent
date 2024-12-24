import { useState, useCallback } from "react";
import { createStatus, deleteStatus } from "../services/status";
import { useAuth } from "./useAuth";
import type { StatusContent, CreateStatusParams } from "../types/status";

export function useStatus() {
  const { user } = useAuth();
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postStatus = useCallback(
    async (content: StatusContent) => {
      if (!user) {
        throw new Error("User must be logged in to post status");
      }

      setIsPosting(true);
      setError(null);

      try {
        const params: CreateStatusParams = {
          userId: user.id,
          content,
          visibility: content.visibility || "public",
        };

        const status = await createStatus(params);
        return status;
      } catch (err) {
        setError("Failed to post status update");
        throw err;
      } finally {
        setIsPosting(false);
      }
    },
    [user],
  );

  const removeStatus = useCallback(async (id: string) => {
    try {
      await deleteStatus(id);
    } catch (err) {
      setError("Failed to delete status update");
      throw err;
    }
  }, []);

  return {
    isPosting,
    error,
    postStatus,
    removeStatus,
  };
}
