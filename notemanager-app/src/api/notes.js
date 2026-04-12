import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: `${BASE_URL}/notes`,
  headers: { 'Content-Type': 'application/json' },
});

export const notesApi = {
  getAll: () => api.get('/').then(r => r.data),
  getById: (id) => api.get(`/${id}`).then(r => r.data),
  create: (note) => api.post('/', note).then(r => r.data),
  update: (id, note) => api.put(`/${id}`, note).then(r => r.data),
  delete: (id) => api.delete(`/${id}`).then(r => r.data),
};
