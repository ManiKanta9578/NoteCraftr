import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../services/api';
import NoteCard from './NoteCard';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        const { data } = await fetchNotes();
        setNotes(data);
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Revision Notes</h1>
            <div className="grid gap-2">
                {notes.length > 0 ? (
                    notes.map(note => <NoteCard key={note._id} note={note} />)
                ) : (
                    <p className="text-gray-500">No notes found</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
