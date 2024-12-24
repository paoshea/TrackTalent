import { supabase } from "../lib/supabase";

export type UploadProgressCallback = (progress: number) => void;

interface ParsedResume {
  text: string;
  metadata: {
    name?: string;
    email?: string;
    phone?: string;
    skills?: string[];
    experience?: Array<{
      title: string;
      company: string;
      startDate: string;
      endDate?: string;
      description: string;
    }>;
    education?: Array<{
      degree: string;
      institution: string;
      graduationDate: string;
    }>;
  };
}

export async function uploadResume(
  file: File,
  onProgress?: UploadProgressCallback,
): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Simulate progress if callback provided
    if (onProgress) {
      onProgress(0.5); // 50% after upload
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filePath);

    if (onProgress) {
      onProgress(1); // 100% after getting URL
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw new Error("Failed to upload resume");
  }
}

export async function parseResume(url: string): Promise<ParsedResume> {
  try {
    // Call resume parsing service
    const response = await fetch(`${process.env.VITE_API_URL}/parse-resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to parse resume");
    }

    const data = await response.json();
    return data as ParsedResume;
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume");
  }
}

export async function deleteResume(url: string): Promise<void> {
  try {
    const path = url.split("/").pop();
    if (!path) throw new Error("Invalid resume URL");

    const { error } = await supabase.storage
      .from("uploads")
      .remove([`resumes/${path}`]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw new Error("Failed to delete resume");
  }
}

export async function getResumeUrl(path: string): Promise<string> {
  try {
    const { data } = supabase.storage
      .from("uploads")
      .getPublicUrl(`resumes/${path}`);

    return data.publicUrl;
  } catch (error) {
    console.error("Error getting resume URL:", error);
    throw new Error("Failed to get resume URL");
  }
}

export function validateResume(file: File): { valid: boolean; error?: string } {
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please upload a PDF or Word document",
    };
  }

  if (file.size > 10 * 1024 * 1024) {
    return {
      valid: false,
      error: "File size must be less than 10MB",
    };
  }

  return { valid: true };
}
