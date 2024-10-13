import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../services/api';
import NoteCard from '../components/NoteCard';
import styles from '../styles/Home.module.css'

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
    <div className={styles.container}>
      <h1>Revision Notes</h1>
      <div className={styles.card}>
        {notes.length > 0 ? (
          notes.map(note => <NoteCard key={note._id} note={note} className={styles.noteCard} />)
        ) : (
          <p className={styles.noNotes}>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
