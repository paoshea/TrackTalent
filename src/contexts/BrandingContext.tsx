import { createContext } from "react";
import type { BrandingTheme } from "../types/branding";

export const BrandingContext = createContext<BrandingTheme | null>(null);
