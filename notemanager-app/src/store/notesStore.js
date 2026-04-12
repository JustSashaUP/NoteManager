import { create } from 'zustand';
import { notesApi } from '../api/notes';

export const useNotesStore = create((set, get) => ({
  notes: [],
  loading: false,
  error: null,
  toast: null,

  setToast: (msg) => {
    set({ toast: msg });
    setTimeout(() => set({ toast: null }), 2800);
  },

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await notesApi.getAll();
      set({ notes, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  createNote: async (data) => {
    set({ loading: true, error: null });
    try {
      const note = await notesApi.create(data);
      set(s => ({ notes: [note, ...s.notes], loading: false }));
      get().setToast('noteCreated');
      return note;
    } catch (e) {
      set({ error: e.message, loading: false });
      return null;
    }
  },

  updateNote: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const note = await notesApi.update(id, data);
      set(s => ({
        notes: s.notes.map(n => (n.id === id ? note : n)),
        loading: false,
      }));
      get().setToast('noteUpdated');
      return note;
    } catch (e) {
      set({ error: e.message, loading: false });
      return null;
    }
  },

  deleteNote: async (id) => {
    set({ loading: true, error: null });
    try {
      await notesApi.delete(id);
      set(s => ({
        notes: s.notes.filter(n => n.id !== id),
        loading: false,
      }));
      get().setToast('noteDeleted');
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },
}));
