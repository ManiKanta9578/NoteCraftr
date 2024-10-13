import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../services/api';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const { data } = await fetchNotes();
    setNotes(data);
  };

  useEffect(() => {   
    getNotes();
  }, []);

  return (
    <div>
      <h1>Revision Notes</h1>
      {notes.length > 0 ? (
        notes.map(note => <NoteCard key={note._id} note={note} />)
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default Home;
