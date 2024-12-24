import { useState } from "react";
import { uploadMedia } from "../services/media";

export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const url = await uploadMedia(file);
      return url;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
