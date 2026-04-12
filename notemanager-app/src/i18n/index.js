import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appTitle: 'Notes',
      appSubtitle: 'Your thoughts, organized.',
      newNote: 'New Note',
      allNotes: 'All Notes',
      noNotes: 'No notes yet.',
      noNotesHint: 'Create your first note to get started.',
      noteTitle: 'Title',
      noteContent: 'Content',
      titlePlaceholder: 'Note title...',
      contentPlaceholder: 'Write something...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      confirmDelete: 'Delete this note?',
      confirmDeleteHint: 'This action cannot be undone.',
      yes: 'Yes, delete',
      no: 'Keep it',
      loading: 'Loading...',
      error: 'Something went wrong.',
      retry: 'Retry',
      created: 'Created',
      updated: 'Updated',
      language: 'Language',
      noteCreated: 'Note created!',
      noteUpdated: 'Note updated!',
      noteDeleted: 'Note deleted.',
      titleRequired: 'Title is required.',
      backToList: '← Back',
    },
  },
  uk: {
    translation: {
      appTitle: 'Нотатки',
      appSubtitle: 'Ваші думки, впорядковані.',
      newNote: 'Нова нотатка',
      allNotes: 'Усі нотатки',
      noNotes: 'Нотаток поки немає.',
      noNotesHint: 'Створіть першу нотатку, щоб почати.',
      noteTitle: 'Заголовок',
      noteContent: 'Зміст',
      titlePlaceholder: 'Назва нотатки...',
      contentPlaceholder: 'Напишіть щось...',
      save: 'Зберегти',
      cancel: 'Скасувати',
      delete: 'Видалити',
      edit: 'Редагувати',
      confirmDelete: 'Видалити цю нотатку?',
      confirmDeleteHint: 'Цю дію не можна скасувати.',
      yes: 'Так, видалити',
      no: 'Залишити',
      loading: 'Завантаження...',
      error: 'Щось пішло не так.',
      retry: 'Повторити',
      created: 'Створено',
      updated: 'Оновлено',
      language: 'Мова',
      noteCreated: 'Нотатку створено!',
      noteUpdated: 'Нотатку оновлено!',
      noteDeleted: 'Нотатку видалено.',
      titleRequired: 'Заголовок обовʼязковий.',
      backToList: '← Назад',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
