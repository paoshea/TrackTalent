import { useTranslation } from "../../contexts/TranslationContext";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${
          language === 'en' 
            ? 'bg-indigo-100 text-indigo-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`px-2 py-1 rounded ${
          language === 'es' 
            ? 'bg-indigo-100 text-indigo-600' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        ES
      </button>
    </div>
  );
}
