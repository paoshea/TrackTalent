export interface BrandingTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  logoUrl?: string;
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  buttonStyle?: {
    borderRadius?: string;
    padding?: string;
    fontWeight?: string;
  };
  customCss?: Record<string, string>;
}

export interface BrandingConfig {
  theme: BrandingTheme;
  companyName: string;
  companyLogo?: string;
  favicon?: string;
  customDomain?: string;
  emailTemplate?: {
    header?: string;
    footer?: string;
    style?: Record<string, string>;
  };
}
