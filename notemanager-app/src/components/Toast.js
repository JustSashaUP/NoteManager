import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';

export default function Toast() {
  const { t } = useTranslation();
  const toast = useNotesStore(s => s.toast);
  if (!toast) return null;
  return <div className="toast" role="status" data-testid="toast">{t(toast)}</div>;
}
