import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ConfirmModal({ onConfirm, onCancel }) {
  const { t } = useTranslation();
  return (
    <div className="modal-overlay" onClick={onCancel} data-testid="confirm-modal">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__title">{t('confirmDelete')}</div>
        <div className="modal__hint">{t('confirmDeleteHint')}</div>
        <div className="modal__actions">
          <button className="btn btn-ghost" onClick={onCancel}>{t('no')}</button>
          <button className="btn btn-danger" onClick={onConfirm} data-testid="confirm-delete-btn">{t('yes')}</button>
        </div>
      </div>
    </div>
  );
}
