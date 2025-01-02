import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'es';

type TranslationKey =
  | 'features.title'
  | 'features.description'
  | 'features.learnMore'
  | 'nav.signin'
  | 'nav.signup'
  | 'nav.back'
  | 'nav.signout'
  | 'nav.tryDemo'
  | 'landing.title'
  | 'landing.subtitle'
  | 'landing.description'
  | 'landing.forCandidates'
  | 'landing.candidateDesc'
  | 'landing.forEmployers'
  | 'landing.employerDesc'
  | 'landing.forPartners'
  | 'landing.partnerDesc'
  | 'landing.alreadyHaveAccount'
  | 'landing.tryDemo'
  | 'landing.features.jobMatching'
  | 'landing.features.careerTools'
  | 'landing.features.skillAssessments'
  | 'landing.features.candidateSearch'
  | 'landing.features.applicantTracking'
  | 'landing.features.interviews'
  | 'landing.features.clientManagement'
  | 'landing.features.revenueTracking'
  | 'landing.features.analytics'
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
  | 'stats.responseRate'
  // Feature pages
  | 'features.candidate.smartMatching.title'
  | 'features.candidate.smartMatching.description'
  | 'features.candidate.careerDev.title'
  | 'features.candidate.careerDev.description'
  | 'features.candidate.skillAssess.title'
  | 'features.candidate.skillAssess.description'
  | 'features.employer.search.title'
  | 'features.employer.search.description'
  | 'features.employer.tracking.title'
  | 'features.employer.tracking.description'
  | 'features.employer.interview.title'
  | 'features.employer.interview.description'
  | 'features.partner.client.title'
  | 'features.partner.client.description'
  | 'features.partner.revenue.title'
  | 'features.partner.revenue.description'
  | 'features.partner.analytics.title'
  | 'features.partner.analytics.description'
  | 'features.tryDemo'
  | 'features.exploreMore';

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
    'features.title': 'Explore Our Features',
    'features.description': 'Discover how our platform can help you achieve your goals',
    'features.learnMore': 'Learn More',
    'nav.signin': 'Sign In',
    'nav.tryDemo': 'Try Demo',
    'nav.signup': 'Get Started',
    'nav.back': 'Back',
    'nav.signout': 'Sign out',
    'landing.title': 'Find Your Next Career Opportunity',
    'landing.subtitle': 'faster than ever',
    'landing.description': 'Streamline your hiring process with our advanced talent management platform. Connect with qualified candidates and build your dream team efficiently.',
    'landing.forCandidates': 'For Candidates',
    'landing.candidateDesc': 'Find your dream job and advance your career',
    'landing.forEmployers': 'For Employers',
    'landing.employerDesc': 'Find and hire the best talent for your team',
    'landing.forPartners': 'For Partners',
    'landing.partnerDesc': 'Grow your recruitment business',
    'landing.alreadyHaveAccount': 'Already have an account?',
    'landing.tryDemo': 'Want to try it first?',
    'landing.features.jobMatching': 'Smart job matching',
    'landing.features.careerTools': 'Career development tools',
    'landing.features.skillAssessments': 'Skill assessments',
    'landing.features.candidateSearch': 'Advanced candidate search',
    'landing.features.applicantTracking': 'Applicant tracking',
    'landing.features.interviews': 'Interview scheduling',
    'landing.features.clientManagement': 'Client management',
    'landing.features.revenueTracking': 'Revenue tracking',
    'landing.features.analytics': 'Performance analytics',
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
    'stats.responseRate': 'Response Rate',
    // Feature pages
    'features.candidate.smartMatching.title': 'Smart Job Matching',
    'features.candidate.smartMatching.description': 'Our AI-powered system matches you with jobs that fit your skills and experience perfectly. Get personalized recommendations daily.',
    'features.candidate.careerDev.title': 'Career Development',
    'features.candidate.careerDev.description': 'Access resources and tools to help you grow professionally and advance your career. Track your progress and set goals.',
    'features.candidate.skillAssess.title': 'Skill Assessment',
    'features.candidate.skillAssess.description': 'Evaluate and showcase your skills to potential employers with our assessment tools. Get certified in your areas of expertise.',
    'features.employer.search.title': 'Advanced Candidate Search',
    'features.employer.search.description': 'Find the perfect candidates with our powerful search and filtering tools. Use AI-powered matching to identify the best fits for your roles.',
    'features.employer.tracking.title': 'Applicant Tracking',
    'features.employer.tracking.description': 'Manage your hiring pipeline efficiently with our comprehensive tracking system. Keep all candidate information organized in one place.',
    'features.employer.interview.title': 'Interview Management',
    'features.employer.interview.description': 'Schedule and manage interviews seamlessly with our integrated calendar system. Coordinate with team members and candidates effortlessly.',
    'features.partner.client.title': 'Client Management',
    'features.partner.client.description': 'Manage your client relationships effectively with our comprehensive tools. Track interactions, progress, and outcomes in one place.',
    'features.partner.revenue.title': 'Revenue Tracking',
    'features.partner.revenue.description': 'Track and analyze your revenue streams with detailed analytics and reporting. Get insights into performance and growth opportunities.',
    'features.partner.analytics.title': 'Performance Analytics',
    'features.partner.analytics.description': 'Get detailed insights into your performance with our advanced analytics tools. Make data-driven decisions to optimize your business.',
    'features.tryDemo': 'Try Demo',
    'features.exploreMore': 'Explore More Features'
  },
  es: {
    'features.title': 'Explora Nuestras Funciones',
    'features.description': 'Descubre cómo nuestra plataforma puede ayudarte a alcanzar tus objetivos',
    'features.learnMore': 'Saber Más',
    'nav.signin': 'Iniciar Sesión',
    'nav.tryDemo': 'Probar Demo',
    'nav.signup': 'Comenzar',
    'nav.back': 'Volver',
    'nav.signout': 'Cerrar sesión',
    'landing.title': 'Encuentra Tu Próxima Oportunidad Laboral',
    'landing.subtitle': 'más rápido que nunca',
    'landing.description': 'Optimiza tu proceso de contratación con nuestra plataforma avanzada de gestión de talento. Conéctate con candidatos calificados y construye tu equipo ideal de manera eficiente.',
    'landing.forCandidates': 'Para Candidatos',
    'landing.candidateDesc': 'Encuentra tu trabajo ideal y avanza en tu carrera',
    'landing.forEmployers': 'Para Empleadores',
    'landing.employerDesc': 'Encuentra y contrata el mejor talento para tu equipo',
    'landing.forPartners': 'Para Socios',
    'landing.partnerDesc': 'Haz crecer tu negocio de reclutamiento',
    'landing.alreadyHaveAccount': '¿Ya tienes una cuenta?',
    'landing.tryDemo': '¿Quieres probarlo primero?',
    'landing.features.jobMatching': 'Coincidencia inteligente de trabajos',
    'landing.features.careerTools': 'Herramientas de desarrollo profesional',
    'landing.features.skillAssessments': 'Evaluaciones de habilidades',
    'landing.features.candidateSearch': 'Búsqueda avanzada de candidatos',
    'landing.features.applicantTracking': 'Seguimiento de candidatos',
    'landing.features.interviews': 'Programación de entrevistas',
    'landing.features.clientManagement': 'Gestión de clientes',
    'landing.features.revenueTracking': 'Seguimiento de ingresos',
    'landing.features.analytics': 'Análisis de rendimiento',
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
    'stats.responseRate': 'Tasa de Respuesta',
    // Feature pages
    'features.candidate.smartMatching.title': 'Coincidencia Inteligente de Empleos',
    'features.candidate.smartMatching.description': 'Nuestro sistema con IA te conecta con trabajos que se ajustan perfectamente a tus habilidades y experiencia. Recibe recomendaciones personalizadas diariamente.',
    'features.candidate.careerDev.title': 'Desarrollo Profesional',
    'features.candidate.careerDev.description': 'Accede a recursos y herramientas para crecer profesionalmente y avanzar en tu carrera. Rastrea tu progreso y establece metas.',
    'features.candidate.skillAssess.title': 'Evaluación de Habilidades',
    'features.candidate.skillAssess.description': 'Evalúa y muestra tus habilidades a empleadores potenciales con nuestras herramientas de evaluación. Obtén certificaciones en tus áreas de experiencia.',
    'features.employer.search.title': 'Búsqueda Avanzada de Candidatos',
    'features.employer.search.description': 'Encuentra los candidatos perfectos con nuestras potentes herramientas de búsqueda y filtrado. Usa coincidencia con IA para identificar los mejores perfiles.',
    'features.employer.tracking.title': 'Seguimiento de Candidatos',
    'features.employer.tracking.description': 'Gestiona tu proceso de contratación eficientemente con nuestro sistema integral. Mantén toda la información de candidatos organizada.',
    'features.employer.interview.title': 'Gestión de Entrevistas',
    'features.employer.interview.description': 'Programa y gestiona entrevistas sin problemas con nuestro sistema de calendario integrado. Coordina con miembros del equipo y candidatos fácilmente.',
    'features.partner.client.title': 'Gestión de Clientes',
    'features.partner.client.description': 'Gestiona las relaciones con tus clientes efectivamente con nuestras herramientas integrales. Rastrea interacciones, progreso y resultados.',
    'features.partner.revenue.title': 'Seguimiento de Ingresos',
    'features.partner.revenue.description': 'Rastrea y analiza tus fuentes de ingresos con análisis detallados e informes. Obtén información sobre rendimiento y oportunidades de crecimiento.',
    'features.partner.analytics.title': 'Análisis de Rendimiento',
    'features.partner.analytics.description': 'Obtén información detallada sobre tu rendimiento con nuestras herramientas avanzadas de análisis. Toma decisiones basadas en datos.',
    'features.tryDemo': 'Probar Demo',
    'features.exploreMore': 'Explorar Más Funciones'
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

export type { TranslationKey, Language };
