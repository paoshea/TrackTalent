import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'es';

type TranslationKey =
  | 'nav.signin'
  | 'nav.signup'
  | 'nav.back'
  | 'nav.signout'
  | 'landing.title'
  | 'dashboard.dashboard'
  | 'dashboard.jobs'
  | 'dashboard.candidates'
  | 'dashboard.applications'
  | 'dashboard.messages'
  | 'dashboard.notifications'
  | 'dashboard.analytics'
  | 'dashboard.settings'
  | 'dashboard.profile'
  | 'dashboard.recommendations'
  | 'dashboard.noRecommendations'
  | 'actions.search'
  | 'actions.apply'
  | 'actions.save'
  | 'actions.cancel'
  | 'stats.activeJobs'
  | 'stats.applications'
  | 'stats.interviews'
  | 'stats.responseRate';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: TranslationKey) => string;
}

type Translations = {
  [K in Language]: {
    [Key in TranslationKey]: string;
  };
};

const translations: Translations = {
  en: {
    'nav.signin': 'Sign In',
    'nav.signup': 'Get Started',
    'nav.back': 'Back',
    'nav.signout': 'Sign out',
    'landing.title': 'Find Your Next Career Opportunity',
    'dashboard.dashboard': 'Dashboard',
    'dashboard.jobs': 'Jobs',
    'dashboard.candidates': 'Candidates',
    'dashboard.applications': 'Applications',
    'dashboard.messages': 'Messages',
    'dashboard.notifications': 'Notifications',
    'dashboard.analytics': 'Analytics',
    'dashboard.settings': 'Settings',
    'dashboard.profile': 'Profile',
    'dashboard.recommendations': 'Recommended Jobs',
    'dashboard.noRecommendations': 'No recommended jobs found. Update your skills to get better recommendations.',
    'actions.search': 'Search',
    'actions.apply': 'Apply Now',
    'actions.save': 'Save',
    'actions.cancel': 'Cancel',
    'stats.activeJobs': 'Active Jobs',
    'stats.applications': 'Applications',
    'stats.interviews': 'Interviews',
    'stats.responseRate': 'Response Rate'
  },
  es: {
    'nav.signin': 'Iniciar Sesión',
    'nav.signup': 'Comenzar',
    'nav.back': 'Volver',
    'nav.signout': 'Cerrar sesión',
    'landing.title': 'Encuentra Tu Próxima Oportunidad Laboral',
    'dashboard.dashboard': 'Panel',
    'dashboard.jobs': 'Empleos',
    'dashboard.candidates': 'Candidatos',
    'dashboard.applications': 'Aplicaciones',
    'dashboard.messages': 'Mensajes',
    'dashboard.notifications': 'Notificaciones',
    'dashboard.analytics': 'Análisis',
    'dashboard.settings': 'Configuración',
    'dashboard.profile': 'Perfil',
    'dashboard.recommendations': 'Empleos Recomendados',
    'dashboard.noRecommendations': 'No hay empleos recomendados. Actualiza tus habilidades para obtener mejores recomendaciones.',
    'actions.search': 'Buscar',
    'actions.apply': 'Aplicar Ahora',
    'actions.save': 'Guardar',
    'actions.cancel': 'Cancelar',
    'stats.activeJobs': 'Empleos Activos',
    'stats.applications': 'Aplicaciones',
    'stats.interviews': 'Entrevistas',
    'stats.responseRate': 'Tasa de Respuesta'
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const translate = useCallback((key: TranslationKey): string => {
    return translations[language][key];
  }, [language]);

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

export type { TranslationKey };
