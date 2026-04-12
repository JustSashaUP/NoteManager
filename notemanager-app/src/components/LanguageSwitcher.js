import React from 'react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UK' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2) || 'en';

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          className={`lang-btn${current === code ? ' active' : ''}`}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={current === code}
          data-testid={`lang-${code}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
