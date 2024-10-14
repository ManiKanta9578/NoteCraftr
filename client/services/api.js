import axios from 'axios';

let baseURL = 'https://congenial-memory-x7qw4j4jpr9cpxp9-5000.app.github.dev/api';

const API = axios.create({ baseURL });

export const fetchNotes = () => API.get('/');
export const createNote = (noteData) => API.post('/notes', noteData);
