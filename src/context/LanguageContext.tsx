import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import enContent from '../../en.json';
import ptContent from '../../pt.json';

type Language = 'en' | 'pt';
type Content = typeof enContent;

interface LanguageContextType {
  language: Language;
  content: Content;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [content, setContent] = useState<Content>(enContent);

  useEffect(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update content when language changes
    setContent(language === 'pt' ? ptContent : enContent);
    localStorage.setItem('language', language);
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        content, 
        setLanguage: handleSetLanguage 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};