import axios from 'axios';

let baseURL = process.env.NEXT_PUBLIC_API_URL_VERCEL;

const API = axios.create({ baseURL });

// Fetch all notes
export const fetchNotes = () => API.get('/');

// Create a new note
export const createNote = (noteData) => API.post('/notes', noteData);

// Fetch notes by technology
export const fetchNotesByTechnology = (technology) => API.get('/notes', { params: { technology } });

// Update a note
export const updateNote = (noteId, noteData) => API.put(`/${noteId}`, noteData);

// GET notes by Id
export const fetchNoteBy = (noteId) => API.get(`/${noteId}`);

// Delete a note
export const deleteNote = (noteId) => API.delete(`/${noteId}`);

