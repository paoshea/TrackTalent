
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const translations = {
  en: {
    'nav.signin': 'Sign In',
    'nav.signup': 'Get Started',
    'landing.title': 'Find Your Next Career Opportunity',
    // Add more translations as needed
  },
  es: {
    'nav.signin': 'Iniciar Sesión',
    'nav.signup': 'Comenzar',
    'landing.title': 'Encuentra Tu Próxima Oportunidad Laboral',
    // Add more translations as needed
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const translate = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
