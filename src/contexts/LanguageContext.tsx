'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from '@/lib/translations';

// 両言語の翻訳型のユニオン（実際の使用時は同じ構造を持つ）
type TranslationData = typeof translations[Language];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // 現在の言語の翻訳データにアクセスする
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('igo_language') as Language;
    if (saved === 'pt' || saved === 'ja') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('igo_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
