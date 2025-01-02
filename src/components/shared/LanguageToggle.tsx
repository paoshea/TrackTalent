import React from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-gray-700"
    >
      {language.toUpperCase()}
    </button>
  );
};
