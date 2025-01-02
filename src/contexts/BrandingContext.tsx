import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BrandingContextType {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  companyName: string;
  updateBranding: (branding: Partial<BrandingState>) => void;
}

interface BrandingState {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  companyName: string;
}

const defaultBranding: BrandingState = {
  primaryColor: '#4F46E5', // Indigo-600
  secondaryColor: '#6B7280', // Gray-500
  logo: '/logo.svg',
  companyName: 'TrackTalent'
};

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

interface BrandingProviderProps {
  children: ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({ children }) => {
  const [branding, setBranding] = useState<BrandingState>(defaultBranding);

  const updateBranding = (newBranding: Partial<BrandingState>) => {
    setBranding(prev => ({
      ...prev,
      ...newBranding
    }));
  };

  const value = {
    ...branding,
    updateBranding
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (context === undefined) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};
