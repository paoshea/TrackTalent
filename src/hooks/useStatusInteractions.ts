import { useState, useCallback } from "react";
import { createInteraction } from "../services/interactions";

export function useStatusInteractions(statusId: string) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLike = useCallback(async () => {
    setIsProcessing(true);
    try {
      await createInteraction({
        type: "like",
        targetId: statusId,
        targetType: "status",
        userId: "current-user",
      });
    } catch (error) {
      console.error("Failed to like status:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [statusId]);

  const handleComment = useCallback(() => {
    // Open comment modal or expand comment section
    console.log("Open comment section for status:", statusId);
  }, [statusId]);

  return {
    isProcessing,
    handleLike,
    handleComment,
  };
}
