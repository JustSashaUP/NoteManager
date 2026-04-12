import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';

export default function NoteForm({ note, onDone }) {
  const { t } = useTranslation();
  const { createNote, updateNote, loading } = useNotesStore();

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setError('');
  }, [note]);

  const isEdit = !!note;

  const handleSubmit = async () => {
    if (!title.trim()) { setError(t('titleRequired')); return; }
    setError('');
    let result;
    if (isEdit) {
      result = await updateNote(note.id, { title: title.trim(), content: content.trim() });
    } else {
      result = await createNote({ title: title.trim(), content: content.trim() });
    }
    if (result) onDone();
  };

  return (
    <div className="note-form">
      <div className="note-form__header">
        <h2 className="note-form__heading">
          {isEdit ? t('edit') : t('newNote')}
        </h2>
        <button className="btn btn-ghost" onClick={onDone}>{t('backToList')}</button>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="note-title">{t('noteTitle')}</label>
        <input
          id="note-title"
          className="form-input"
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setError(''); }}
          placeholder={t('titlePlaceholder')}
          autoFocus
          data-testid="note-title-input"
        />
        {error && <div className="form-error">{error}</div>}
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="note-content">{t('noteContent')}</label>
        <textarea
          id="note-content"
          className="form-textarea"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder={t('contentPlaceholder')}
          data-testid="note-content-input"
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onDone} disabled={loading}>{t('cancel')}</button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          data-testid="save-note-btn"
        >
          {loading ? <span className="spinner" /> : null}
          {t('save')}
        </button>
      </div>
    </div>
  );
}
