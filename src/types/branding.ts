export interface BrandingTheme {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  fontFamily?: string;
  buttonStyle?: 'rounded' | 'square';
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
