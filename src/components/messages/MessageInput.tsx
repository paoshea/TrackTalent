import { useState, useCallback, KeyboardEvent } from "react";
import type { MessageInputProps } from "../../types/messages";

export function MessageInput({
  onSubmit,
  placeholder = "Type a message...",
  disabled = false,
  maxLength,
}: MessageInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = useCallback(async () => {
    if (!content.trim() || disabled) return;

    try {
      await onSubmit(content);
      setContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [content, disabled, onSubmit]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <div className="flex items-end space-x-2">
      <textarea
        value={content}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) return;
          setContent(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 min-h-[40px] max-h-[120px] p-2 border rounded-lg resize-y"
        rows={1}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !content.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}

MessageInput.displayName = "MessageInput";
