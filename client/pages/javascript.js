import React, { useEffect } from 'react';
import { fetchNotesByTechnology } from '../services/api';
import NoteCard from '@/components/NoteCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadingShow } from '@/store/slices/loadingSlice';
import { setNotes } from '@/store/slices/notesSlice';

const JavaScript = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.data);

    const getNotes = async () => {
        dispatch(loadingShow(true));
        try {
            const { data } = await fetchNotesByTechnology('JavaScript');
            dispatch(setNotes(data));
        } catch (error) {
            console.error("Error fetching notes:", error);
        } finally {
            dispatch(loadingShow(false));
        }
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="container mx-auto px-4 mt-16">
            <div className="grid gap-4">
                {notes.length > 0 ? (
                    notes.map(note => <NoteCard key={note._id} note={note} />)
                ) : (
                    <p className="text-gray-500">No notes found</p>
                )}
            </div>
        </div>
    );
};

export default JavaScript;