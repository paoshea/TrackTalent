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

  // Initialize editor with mentions and hashtags
  useEffect(() => {
    if (editorRef.current && content) {
      let formattedContent = content;

      // Format mentions
      mentions.forEach((mention: StatusMention) => {
        const regex = new RegExp(`@${mention.name}\\b`, "g");
        formattedContent = formattedContent.replace(
          regex,
          `<span class="text-blue-600">@${mention.name}</span>`,
        );
      });

      // Format hashtags
      hashtags.forEach((tag: StatusHashtag) => {
        const regex = new RegExp(`#${tag.tag}\\b`, "g");
        formattedContent = formattedContent.replace(
          regex,
          `<span class="text-blue-600">#${tag.tag}</span>`,
        );
      });

      editorRef.current.innerHTML = formattedContent;
    }
  }, [content, mentions, hashtags]);

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

    if (lastWord.startsWith("@") && onMentionSearch) {
      const query = lastWord.slice(1);
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
        const content = editorRef.current?.innerText || "";

        // Handle hashtag creation on Enter
        const words = content.split(/\s+/);
        const lastWord = words[words.length - 1];

        if (lastWord.startsWith("#") && onHashtagSearch) {
          const hashtag = lastWord.slice(1);
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

      const content = editorRef.current.innerText;
      const words = content.split(/\s+/);
      const lastWord = words[words.length - 1];

      if (lastWord.startsWith("@")) {
        words[words.length - 1] = `@${suggestion.name}`;
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
        dangerouslySetInnerHTML={{ __html: content }}
        aria-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
        suppressContentEditableWarning
      />

      {suggestionsError && (
        <p className="mt-1 text-sm text-red-600">{suggestionsError}</p>
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
