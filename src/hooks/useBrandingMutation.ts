import { useState } from "react";
import type { ColorResult } from "react-color";

interface BrandingTheme {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
}

interface BrandingMutation {
  theme: BrandingTheme;
  updateTheme: (updates: Partial<BrandingTheme>) => void;
}

export function useBrandingMutation(): BrandingMutation {
  const [theme, setTheme] = useState<BrandingTheme>({
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
  });

  const updateTheme = (updates: Partial<BrandingTheme>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
    // Here you would typically also persist the changes to your backend
  };

  return { theme, updateTheme };
}
