import { useState, useCallback } from "react";
import { RichTextEditor } from "../shared/RichTextEditor";
import { Upload, FileText } from "lucide-react";
import { Button } from "../shared/Button";
import { MediaUploader } from "./MediaUploader";
import type { StatusContent, MediaAttachment } from "../../types/status";

interface StatusEditorProps {
  onSubmit: (content: StatusContent) => Promise<void>;
  isSubmitting?: boolean;
  placeholder?: string;
}

function fileToMediaAttachment(file: File): MediaAttachment {
  const type = file.type.startsWith("image/")
    ? "image"
    : file.type.startsWith("video/")
      ? "video"
      : "file";

  return {
    id: `temp-${Date.now()}-${file.name}`,
    type,
    url: URL.createObjectURL(file),
    name: file.name,
  };
}

export function StatusEditor({
  onSubmit,
  isSubmitting = false,
  placeholder = "What's on your mind?",
}: StatusEditorProps) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File[]>([]);

  const handleSubmit = useCallback(async () => {
    if (!content.trim() && media.length === 0) return;

    await onSubmit({
      text: content,
      media: media.map(fileToMediaAttachment),
    });

    setContent("");
    setMedia([]);
  }, [content, media, onSubmit]);

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder={placeholder}
        disabled={isSubmitting}
      />

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex space-x-2">
          <MediaUploader
            onFileSelect={(files: File[]) => setMedia([...media, ...files])}
            disabled={isSubmitting}
          >
            <Button type="button" variant="ghost" disabled={isSubmitting}>
              <Upload className="h-5 w-5 mr-2" />
              Media
            </Button>
          </MediaUploader>

          <Button type="button" variant="ghost" disabled={isSubmitting}>
            <FileText className="h-5 w-5 mr-2" />
            Document
          </Button>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || (!content.trim() && media.length === 0)}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>

      {media.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3">
          {media.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Upload ${index + 1}`}
                className="h-20 w-20 object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setMedia(media.filter((_, i) => i !== index))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

StatusEditor.displayName = "StatusEditor";
