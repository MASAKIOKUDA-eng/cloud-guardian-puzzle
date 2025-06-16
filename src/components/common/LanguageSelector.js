import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * 言語選択コンポーネント
 */
const LanguageSelector = () => {
  const { language, translations, setLanguageTo } = useLanguage();

  return (
    <div className="language-selector">
      <label htmlFor="language-select">{translations.language}: </label>
      <select 
        id="language-select" 
        value={language} 
        onChange={(e) => setLanguageTo(e.target.value)}
      >
        <option value="ja">{translations.languageOptions.ja}</option>
        <option value="en">{translations.languageOptions.en}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
