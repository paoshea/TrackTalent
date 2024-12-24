import { useState, useEffect, useContext } from "react";
import { BrandingContext } from "../contexts/BrandingContext";
import { supabase } from "../lib/supabase";
import type {
  BrandingTheme,
  BrandingConfig,
  BrandingMutation,
} from "../types/branding";

const defaultTheme: BrandingTheme = {
  primaryColor: "#4F46E5", // Indigo-600
  secondaryColor: "#6B7280", // Gray-500
  textColor: "#111827", // Gray-900
  backgroundColor: "#FFFFFF", // White
  borderColor: "#E5E7EB", // Gray-200
  fontFamily: "Inter, system-ui, sans-serif",
  buttonStyle: {
    borderRadius: "0.375rem", // 6px
    padding: "0.5rem 1rem", // 8px 16px
    fontWeight: "500",
  },
};

export function useBranding(): BrandingMutation {
  const [theme, setTheme] = useState<BrandingTheme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBranding = async () => {
      try {
        // In a real app, this would fetch from an API
        // For now, we'll just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Simulated API response
        const config: BrandingConfig = {
          theme: {
            ...defaultTheme,
            // Override with any custom theme settings from API
          },
          companyName: "TalentTrack",
        };

        setTheme(config.theme);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load branding",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadBranding();
  }, []);

  const updateTheme = async (updates: Partial<BrandingTheme>) => {
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: updateError } = await supabase
        .from("company_branding")
        .update({
          theme: { ...theme, ...updates },
          updated_at: new Date().toISOString(),
        })
        .eq("company_id", user.user_metadata.company_id);

      if (updateError) throw updateError;

      setTheme((currentTheme) => ({ ...currentTheme, ...updates }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update theme");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    theme,
    updateTheme,
    isLoading,
    error,
  };
}

// Export a hook to use the branding context
export function useBrandingContext() {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error(
      "useBrandingContext must be used within a BrandingProvider",
    );
  }
  return context;
}
