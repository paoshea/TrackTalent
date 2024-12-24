import React, { useRef, ReactNode } from "react";

export interface MediaUploaderProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
  children: ReactNode;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export function MediaUploader({
  onFileSelect,
  disabled = false,
  children,
  accept = "image/*,video/*",
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => file.size <= maxSize);

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }

    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div onClick={handleClick}>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
      />
      {children}
    </div>
  );
}

MediaUploader.displayName = "MediaUploader";
