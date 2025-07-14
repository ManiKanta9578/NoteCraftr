import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotesByTechnology } from "../services/api";
import { loadingShow } from "@/store/slices/loadingSlice";
import { setNotes } from "@/store/slices/notesSlice";
import NoteCard from "@/components/NoteCard";

const NotesPage = ({ technology }) => {

    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes.data);
    const [editingId, setEditingId] = useState(null);


    const getNotes = async () => {
        dispatch(loadingShow(true));
        try {
            const { data } = await fetchNotesByTechnology(technology);
            dispatch(setNotes(data));
        } catch (error) {
            console.error(`Error fetching ${technology} notes:`, error);
        } finally {
            dispatch(loadingShow(false));
        }
    };

    const handleEditToggle = (id) => {
        setEditingId((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        getNotes();
    }, [technology]);

    return (
        <div className="container mx-auto px-4 mt-16">
            <div className="grid gap-4">
                {notes?.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            isEditing={editingId === note._id}
                            onEditToggle={handleEditToggle}
                            setEditingId={setEditingId}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No notes found for {technology}</p>
                )}
            </div>
        </div>
    );
};

export default NotesPage;
