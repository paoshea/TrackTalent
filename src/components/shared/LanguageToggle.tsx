
import React from 'react';
import { Button } from './Button';
import { useTranslation } from '../../contexts/TranslationContext';

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm font-medium"
    >
      {language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}
