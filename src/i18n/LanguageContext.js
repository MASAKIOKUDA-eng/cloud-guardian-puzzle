import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

// 言語コンテキストの作成
const LanguageContext = createContext();

// 言語プロバイダーコンポーネント
export const LanguageProvider = ({ children }) => {
  // ローカルストレージから言語設定を取得するか、デフォルトで日本語を使用
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ja';
  });

  // 現在の言語に基づいて翻訳を取得
  const [translations_, setTranslations] = useState(translations[language]);

  // 言語が変更されたときに翻訳を更新
  useEffect(() => {
    setTranslations(translations[language]);
    localStorage.setItem('language', language);
  }, [language]);

  // 言語を切り替える関数
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ja' ? 'en' : 'ja');
  };

  // 特定の言語に設定する関数
  const setLanguageTo = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translations: translations_, toggleLanguage, setLanguageTo }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 言語コンテキストを使用するためのカスタムフック
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
