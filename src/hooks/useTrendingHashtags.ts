import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

interface TrendingHashtag {
  tag: string;
  count: number;
  trend: number;
}

export function useTrendingHashtags(limit: number = 5) {
  const [hashtags, setHashtags] = useState<TrendingHashtag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendingHashtags() {
      try {
        setIsLoading(true);
        setError(null);

        // Get current hashtag counts
        const { data: currentData, error: currentError } = await supabase
          .from("status_hashtags")
          .select("tag, count")
          .order("count", { ascending: false })
          .limit(limit);

        if (currentError) throw currentError;

        // Get previous period hashtag counts for trend calculation
        const previousDate = new Date();
        previousDate.setDate(previousDate.getDate() - 7); // Compare with last week

        const { data: previousData, error: previousError } = await supabase
          .from("status_hashtags_history")
          .select("tag, count")
          .eq("period", previousDate.toISOString().split("T")[0]);

        if (previousError) throw previousError;

        // Calculate trends and format data
        const formattedHashtags = currentData.map((current) => {
          const previous = previousData?.find((p) => p.tag === current.tag);
          const previousCount = previous?.count || 0;
          const trend =
            previousCount === 0
              ? 100 // If no previous data, consider it as 100% increase
              : ((current.count - previousCount) / previousCount) * 100;

          return {
            tag: current.tag,
            count: current.count,
            trend: Math.round(trend),
          };
        });

        setHashtags(formattedHashtags);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load trending hashtags",
        );
        console.error("Error fetching trending hashtags:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingHashtags();
  }, [limit]);

  return { hashtags, isLoading, error };
}
