import { useState, useCallback } from "react";
import { uploadResume, parseResume } from "../services/resume";

interface UseResumeUploadResult {
  uploading: boolean;
  parsing: boolean;
  error: string | null;
  progress: number;
  handleUpload: (file: File) => Promise<void>;
  reset: () => void;
}

export function useResumeUpload(): UseResumeUploadResult {
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const validateFile = (file: File): boolean => {
    if (
      !file.type.match("application/pdf") &&
      !file.type.match("application/msword") &&
      !file.type.match(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      )
    ) {
      setError("Please upload a PDF or Word document");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return false;
    }

    return true;
  };

  const handleUpload = useCallback(async (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    setError(null);
    setProgress(0);

    try {
      setUploading(true);
      const uploadedUrl = await uploadResume(file, (progress) => {
        setProgress(Math.round(progress * 100));
      });

      setParsing(true);
      await parseResume(uploadedUrl);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to process resume";
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
      setParsing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setProgress(0);
    setUploading(false);
    setParsing(false);
  }, []);

  return {
    uploading,
    parsing,
    error,
    progress,
    handleUpload,
    reset,
  };
}
