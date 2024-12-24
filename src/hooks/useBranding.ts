import { useState, useEffect, useContext } from "react";
import { BrandingContext } from "../contexts/BrandingContext";
import type { BrandingTheme, BrandingConfig } from "../types/branding";

const defaultTheme: BrandingTheme = {
  primaryColor: "#4F46E5", // Indigo-600
  secondaryColor: "#6B7280", // Gray-500
  fontFamily: "Inter, system-ui, sans-serif",
  backgroundColor: "#FFFFFF",
  textColor: "#111827", // Gray-900
  borderColor: "#E5E7EB", // Gray-200
  buttonStyle: {
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    fontWeight: "500",
  },
};

export function useBranding() {
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

  const updateTheme = (updates: Partial<BrandingTheme>) => {
    setTheme((current) => ({
      ...current,
      ...updates,
    }));
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
