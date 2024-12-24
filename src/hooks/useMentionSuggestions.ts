import { useState, useCallback } from "react";
import type { MentionSuggestion } from "../types/status";
import { searchUsers } from "../services/profile";

export type ExtendedMentionSuggestion = MentionSuggestion & {
  subtitle?: string;
};

export interface UseMentionSuggestionsResult {
  suggestions: ExtendedMentionSuggestion[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  select: (suggestion: ExtendedMentionSuggestion) => void;
}

export function useMentionSuggestions(): UseMentionSuggestionsResult {
  const [suggestions, setSuggestions] = useState<ExtendedMentionSuggestion[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const users = await searchUsers(query);
      const mentionSuggestions = users.map((user) => ({
        id: user.id,
        name: user.name,
        type: "user" as const,
        avatar: user.avatar,
        subtitle: user.title || user.email,
      }));

      setSuggestions(mentionSuggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search users");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const select = useCallback((_suggestion: ExtendedMentionSuggestion) => {
    // Clear suggestions after selection
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    error,
    search,
    select,
  };
}
