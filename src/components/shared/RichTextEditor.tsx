import { useCallback, useRef, useEffect, KeyboardEvent } from "react";
import type { RichTextEditorProps } from "../../types/status";
import { useMentionSuggestions } from "../../hooks/useMentionSuggestions";
import { cn } from "../../utils/cn";

export function RichTextEditor({
  value,
  onChange,
  onMentionSelect,
  onHashtagSelect,
  placeholder = "Write something...",
  maxLength,
  disabled = false,
  error,
  mentions = [],
  hashtags = [],
}: RichTextEditorProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    suggestions,
    isLoading,
    error: suggestionsError,
    search,
    select,
  } = useMentionSuggestions();

  // Initialize editor with mentions and hashtags
  useEffect(() => {
    if (editorRef.current && value) {
      let formattedContent = value;

      // Format mentions
      mentions.forEach((mention) => {
        const regex = new RegExp(`@${mention.name}\\b`, "g");
        formattedContent = formattedContent.replace(
          regex,
          `<span class="text-blue-600">@${mention.name}</span>`,
        );
      });

      // Format hashtags
      hashtags.forEach((tag) => {
        const regex = new RegExp(`#${tag}\\b`, "g");
        formattedContent = formattedContent.replace(
          regex,
          `<span class="text-blue-600">#${tag}</span>`,
        );
      });

      editorRef.current.innerHTML = formattedContent;
    }
  }, [value, mentions, hashtags]);

  const handleInput = useCallback(() => {
    if (!editorRef.current || disabled) return;
    const content = editorRef.current.innerText;

    if (maxLength && content.length > maxLength) {
      editorRef.current.innerText = content.slice(0, maxLength);
      return;
    }

    onChange(content);

    // Handle mentions and hashtags
    const words = content.split(/\s+/);
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith("@")) {
      const query = lastWord.slice(1);
      if (query) {
        search(query);
      }
    }
  }, [onChange, search, maxLength, disabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const content = editorRef.current?.innerText || "";

        // Handle hashtag creation on Enter
        const words = content.split(/\s+/);
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith("#")) {
          const hashtag = lastWord.slice(1);
          if (hashtag && onHashtagSelect) {
            onHashtagSelect(hashtag);
          }
        }
      }
    },
    [onHashtagSelect, disabled],
  );

  const handleMentionClick = useCallback(
    (suggestion: Parameters<NonNullable<typeof onMentionSelect>>[0]) => {
      if (!editorRef.current || disabled) return;

      const content = editorRef.current.innerText;
      const words = content.split(/\s+/);
      const lastWord = words[words.length - 1];

      if (lastWord.startsWith("@")) {
        words[words.length - 1] = `@${suggestion.name}`;
        const newContent = words.join(" ");

        editorRef.current.innerText = newContent;
        onChange(newContent);

        if (onMentionSelect) {
          onMentionSelect(suggestion);
        }

        select(suggestion);
      }
    },
    [onChange, onMentionSelect, select, disabled],
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
          error ? "border-red-300" : "border-gray-300",
        )}
        dangerouslySetInnerHTML={{ __html: value }}
        aria-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {maxLength && (
        <div className="mt-1 text-sm text-gray-500 text-right">
          {value.length}/{maxLength}
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
                        src={suggestion.avatar}
                        alt={suggestion.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )}
                    <div>
                      <div className="font-medium">{suggestion.name}</div>
                      {suggestion.subtitle && (
                        <div className="text-sm text-gray-500">
                          {suggestion.subtitle}
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
