import React from "react";
import { useBranding } from "../../hooks/useBranding";

interface CSSVariables extends React.CSSProperties {
  "--primary-color": string;
  "--secondary-color": string;
  "--font-family"?: string;
  "--text-color"?: string;
  "--background-color"?: string;
  "--border-color"?: string;
  "--button-radius"?: string;
  "--button-padding"?: string;
  "--button-font-weight"?: string;
}

export function BrandingWrapper({ children }: { children: React.ReactNode }) {
  const { theme, isLoading, error } = useBranding();

  if (error) {
    console.error("Failed to load branding:", error);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const cssVariables: CSSVariables = {
    "--primary-color": theme.primaryColor,
    "--secondary-color": theme.secondaryColor,
    "--font-family": theme.fontFamily,
    "--text-color": theme.textColor,
    "--background-color": theme.backgroundColor,
    "--border-color": theme.borderColor,
    "--button-radius": theme.buttonStyle?.borderRadius,
    "--button-padding": theme.buttonStyle?.padding,
    "--button-font-weight": theme.buttonStyle?.fontWeight,
  };

  return (
    <div className="min-h-screen" style={cssVariables}>
      {children}
    </div>
  );
}

// Re-export BrandingProvider from the context
export { BrandingProvider } from "../../contexts/BrandingContext";
