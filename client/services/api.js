import axios from 'axios';

const API = axios.create({
  baseURL: 'https://congenial-memory-x7qw4j4jpr9cpxp9-5000.app.github.dev/api',
});

export const fetchNotes = () => API.get('/');
export const createNote = (noteData) => API.post('/', noteData);
