import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

export default function NotesPage() {
  const { t } = useTranslation();
  const { notes, loading, error, fetchNotes } = useNotesStore();

  // null = list view, undefined = new note, object = editing note
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchNotes(); }, []);

  const openNew = () => { setEditing(undefined); setShowForm(true); };
  const openEdit = (note) => { setEditing(note); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  return (
    <div>
      {loading && <div className="loading-bar" />}

      {showForm ? (
        <NoteForm note={editing} onDone={closeForm} />
      ) : (
        <>
          <div className="notes-header">
            <div>
              <h1 className="notes-title" data-testid="notes-heading">{t('allNotes')}</h1>
              <div className="notes-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</div>
            </div>
            <button className="btn btn-primary" onClick={openNew} data-testid="new-note-btn">
              <PlusIcon />
              {t('newNote')}
            </button>
          </div>

          {error && (
            <div className="error-banner">
              ⚠ {t('error')}
              <button className="btn btn-ghost" style={{ marginLeft: 'auto' }} onClick={fetchNotes}>
                <RefreshIcon /> {t('retry')}
              </button>
            </div>
          )}

          <div className="notes-grid" data-testid="notes-grid">
            {notes.length === 0 && !loading && !error ? (
              <div className="empty-state">
                <div className="empty-state__icon">📝</div>
                <div className="empty-state__title">{t('noNotes')}</div>
                <div className="empty-state__hint">{t('noNotesHint')}</div>
              </div>
            ) : (
              notes.map((note, i) => (
                <div key={note.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <NoteCard note={note} onEdit={openEdit} />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
