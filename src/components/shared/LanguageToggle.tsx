
import { useState } from 'react';
import { Button } from './Button';

interface LanguageToggleProps {
  defaultLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export function LanguageToggle({ 
  defaultLanguage = 'en',
  onLanguageChange 
}: LanguageToggleProps) {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    setCurrentLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-sm"
    >
      {currentLanguage.toUpperCase()}
    </Button>
  );
}
