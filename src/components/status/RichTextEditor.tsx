import { useCallback, useRef, useEffect, KeyboardEvent } from "react";
import type {
  RichTextEditorProps,
  StatusMention,
  StatusHashtag,
} from "../../types/status";
import {
  useMentionSuggestions,
  type ExtendedMentionSuggestion,
} from "../../hooks/useMentionSuggestions";
import { cn } from "../../utils/cn";
import { sanitizePlainText, formatMentionsAndHashtags } from "../../utils/sanitize";

export function RichTextEditor({
  content,
  onChange,
  onMentionSearch,
  onHashtagSearch,
  placeholder = "Write something...",
  maxLength,
  disabled = false,
  mentions = [] as StatusMention[],
  hashtags = [] as StatusHashtag[],
}: RichTextEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    suggestions,
    isLoading,
    error: suggestionsError,
    select,
  } = useMentionSuggestions();

  // Initialize editor with sanitized content, mentions, and hashtags
  useEffect(() => {
    if (editorRef.current && content) {
      const safeContent = formatMentionsAndHashtags(content, mentions, hashtags);
      editorRef.current.innerHTML = safeContent;
    }
  }, [content, mentions, hashtags]);

  const handleInput = useCallback(() => {
    if (!editorRef.current || disabled) return;
    const rawContent = editorRef.current.innerText;
    const safeContent = sanitizePlainText(rawContent);

    if (maxLength && safeContent.length > maxLength) {
      editorRef.current.innerText = safeContent.slice(0, maxLength);
      return;
    }

    onChange(safeContent);

    // Handle mentions and hashtags
    const words = safeContent.split(/\s+/);
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith("@") && onMentionSearch) {
      const query = sanitizePlainText(lastWord.slice(1));
      if (query) {
        onMentionSearch(query);
      }
    }
  }, [onChange, onMentionSearch, maxLength, disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const rawContent = editorRef.current?.innerText || "";
        const safeContent = sanitizePlainText(rawContent);

        // Handle hashtag creation on Enter
        const words = safeContent.split(/\s+/);
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith("#") && onHashtagSearch) {
          const hashtag = sanitizePlainText(lastWord.slice(1));
          if (hashtag) {
            onHashtagSearch(hashtag);
          }
        }
      }
    },
    [onHashtagSearch, disabled],
  );

  const handleMentionClick = useCallback(
    (suggestion: ExtendedMentionSuggestion) => {
      if (!editorRef.current || disabled) return;

      const rawContent = editorRef.current.innerText;
      const safeContent = sanitizePlainText(rawContent);
      const words = safeContent.split(/\s+/);
      const lastWord = words[words.length - 1];

      if (lastWord.startsWith("@")) {
        const safeName = sanitizePlainText(suggestion.name);
        words[words.length - 1] = `@${safeName}`;
        const newContent = words.join(" ");

        editorRef.current.innerText = newContent;
        onChange(newContent);
        select(suggestion);
      }
    },
    [onChange, select, disabled],
  );

  return (
    <div className="relative">
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={cn(
          "min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white",
          suggestionsError ? "border-red-300" : "border-gray-300",
        )}
        aria-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning
      />

      {suggestionsError && (
        <p className="mt-1 text-sm text-red-600">{sanitizePlainText(suggestionsError)}</p>
      )}

      {maxLength && (
        <div className="mt-1 text-sm text-gray-500 text-right">
          {content.length}/{maxLength}
        </div>
      )}

      {/* Mention suggestions */}
      {suggestions.length > 0 &&
        !isLoading &&
        !suggestionsError &&
        !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
            <ul className="py-1">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMentionClick(suggestion)}
                >
                  <div className="flex items-center">
                    {suggestion.avatar && (
                      <img
                        src={sanitizePlainText(suggestion.avatar)}
                        alt={sanitizePlainText(suggestion.name)}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )}
                    <div>
                      <div className="font-medium">{sanitizePlainText(suggestion.name)}</div>
                      {suggestion.subtitle && (
                        <div className="text-sm text-gray-500">
                          {sanitizePlainText(suggestion.subtitle)}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}

RichTextEditor.displayName = "RichTextEditor";
