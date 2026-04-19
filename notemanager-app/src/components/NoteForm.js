import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';

export default function NoteForm({ note, onDone }) {
  const { t } = useTranslation();
  const { createNote, updateNote, loading, setToast } = useNotesStore();

  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  const isEdit = !!note;

  const handleSubmit = async () => {
    const payload = {
      title: title.trim(),
      content: content.trim(),
    };

    const result = isEdit
      ? await updateNote(note.id, payload)
      : await createNote(payload);

    if (result?.ok) {
      onDone();
      return;
    }

    if (result?.error) {
      const backendError = Object.values(result.error)[0];
      if (backendError) {
        setToast(backendError);
        return;
      }
    }

    if (result?.message) {
      setToast(result.message);
    }
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
          onChange={e => setTitle(e.target.value)}
          placeholder={t('titlePlaceholder')}
          autoFocus
          data-testid="note-title-input"
        />
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
