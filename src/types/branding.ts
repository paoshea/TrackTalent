export interface ButtonStyle {
  borderRadius?: string;
  padding?: string;
  fontWeight?: string;
}

export interface BrandingTheme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  logo?: string;
  fontFamily?: string;
  buttonStyle?: ButtonStyle;
  customCss?: string;
}

export interface BrandingMutation {
  theme: BrandingTheme;
  updateTheme: (updates: Partial<BrandingTheme>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface BrandingConfig {
  theme: BrandingTheme;
  companyName: string;
  domain?: string;
  customDomain?: string;
  favicon?: string;
  metaTags?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
