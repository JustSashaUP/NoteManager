import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import Toast from './components/Toast';
import NotesPage from './pages/NotesPage';

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__title">{t('appTitle')}</span>
          <span className="app-header__sub">{t('appSubtitle')}</span>
        </div>
        <div className="app-header__actions">
          <LanguageSwitcher />
        </div>
      </header>
      <main className="main-content">
        <NotesPage />
      </main>
      <Toast />
    </div>
  );
}
