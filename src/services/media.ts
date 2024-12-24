import { supabase } from "../lib/supabase";

export async function uploadMedia(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `status-media/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteMedia(url: string): Promise<void> {
  const path = url.split("/").pop();
  if (!path) throw new Error("Invalid media URL");

  const { error } = await supabase.storage
    .from("media")
    .remove([`status-media/${path}`]);

  if (error) throw error;
}
