import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { HashtagSuggestion } from "../types/editor";

interface HashtagData {
  id: string;
  tag: string;
  count: number;
  category: string | null;
}

export function useHashtagSuggestions() {
  const [suggestions, setSuggestions] = useState<HashtagSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get trending hashtags from the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const { data, error: fetchError } = await supabase
          .from("hashtags")
          .select(
            `
            id,
            tag,
            count,
            category
          `,
          )
          .gte("last_used", sevenDaysAgo.toISOString())
          .order("count", { ascending: false })
          .limit(50);

        if (fetchError) throw fetchError;

        setSuggestions(
          (data as HashtagData[]).map((hashtag) => ({
            id: hashtag.id,
            label: hashtag.tag,
            count: hashtag.count,
            category: hashtag.category ?? undefined,
          })),
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load hashtag suggestions",
        );
        console.error("Error fetching hashtag suggestions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const addHashtag = async (tag: string, category?: string) => {
    try {
      const { data, error } = await supabase
        .from("hashtags")
        .upsert(
          {
            tag,
            category,
            count: 1,
            last_used: new Date().toISOString(),
          },
          {
            onConflict: "tag",
            ignoreDuplicates: false,
          },
        )
        .select()
        .single();

      if (error) throw error;

      // Update suggestions with new hashtag
      setSuggestions((prev) => {
        const existingIndex = prev.findIndex((h) => h.label === tag);
        if (existingIndex >= 0) {
          return prev.map((h, i) =>
            i === existingIndex ? { ...h, count: (h.count || 0) + 1 } : h,
          );
        }
        return [
          ...prev,
          {
            id: data.id,
            label: tag,
            count: 1,
            category,
          },
        ];
      });

      return data;
    } catch (err) {
      console.error("Error adding hashtag:", err);
      throw err;
    }
  };

  return {
    suggestions,
    isLoading,
    error,
    addHashtag,
  };
}
