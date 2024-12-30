
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
    'dashboard.jobs': 'Jobs',
    'dashboard.applications': 'Applications',
    'dashboard.messages': 'Messages',
    'dashboard.analytics': 'Analytics',
    'dashboard.profile': 'Profile',
    'actions.search': 'Search',
    'actions.apply': 'Apply Now',
    'actions.save': 'Save',
    'actions.cancel': 'Cancel'
  },
  es: {
    'nav.signin': 'Iniciar Sesión',
    'nav.signup': 'Comenzar',
    'landing.title': 'Encuentra Tu Próxima Oportunidad Laboral',
    'dashboard.jobs': 'Empleos',
    'dashboard.applications': 'Aplicaciones',
    'dashboard.messages': 'Mensajes',
    'dashboard.analytics': 'Análisis',
    'dashboard.profile': 'Perfil',
    'actions.search': 'Buscar',
    'actions.apply': 'Aplicar Ahora',
    'actions.save': 'Guardar',
    'actions.cancel': 'Cancelar'
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
