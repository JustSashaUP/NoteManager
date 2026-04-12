import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';
import ConfirmModal from './ConfirmModal';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
}

export default function NoteCard({ note, onEdit }) {
  const { t } = useTranslation();
  const deleteNote = useNotesStore(s => s.deleteNote);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setShowConfirm(false);
    await deleteNote(note.id);
  };

  return (
    <>
      <div
        className="note-card"
        onClick={() => onEdit(note)}
        data-testid="note-card"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onEdit(note)}
      >
        <div className="note-card__accent" />
        <div className="note-card__actions" onClick={e => e.stopPropagation()}>
          <button
            className="btn-icon"
            title={t('edit')}
            onClick={() => onEdit(note)}
            data-testid="edit-note-btn"
            aria-label={t('edit')}
          >
            <EditIcon />
          </button>
          <button
            className="btn-icon danger"
            title={t('delete')}
            onClick={() => setShowConfirm(true)}
            data-testid="delete-note-btn"
            aria-label={t('delete')}
          >
            <TrashIcon />
          </button>
        </div>
        <div className="note-card__title">{note.title}</div>
        {note.content && <div className="note-card__content">{note.content}</div>}
        <div className="note-card__meta">
          {note.updatedAt
            ? `${t('updated')} ${formatDate(note.updatedAt)}`
            : note.createdAt
            ? `${t('created')} ${formatDate(note.createdAt)}`
            : ''}
        </div>
      </div>
      {showConfirm && (
        <ConfirmModal onConfirm={handleDelete} onCancel={() => setShowConfirm(false)} />
      )}
    </>
  );
}
