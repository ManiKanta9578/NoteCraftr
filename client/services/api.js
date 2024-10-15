import axios from 'axios';

let baseURL = "https://my-notes-0b4d.onrender.com/api" || "https://congenial-memory-x7qw4j4jpr9cpxp9-5000.app.github.dev/api";

const API = axios.create({ baseURL });

// Fetch all notes
export const fetchNotes = () => API.get('/');

// Create a new note
export const createNote = (noteData) => API.post('/notes', noteData);

// Fetch notes by technology
export const fetchNotesByTechnology = (technology) => API.get('/notes', { params: { technology } });
