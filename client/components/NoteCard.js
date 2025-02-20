import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadingShow } from '@/store/slices/loadingSlice';
import { updateNote, deleteNote, fetchNoteBy } from '../services/api';
import Modal from './Modal';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import parse, { domToReact } from 'html-react-parser';
import FormWithRichEditor from './ReactQuill';
import { editFormData, resetFormData } from '@/store/slices/formSlice';
import { HTMLRenderer } from './HTMLRenderer';

const NoteCard = ({ note, isEditing, onEditToggle, setEditingId }) => {
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handleDeleteClick = () => {
        setShowMenu(false);
        setIsModalOpen(true);
    };

    const handleEdit = async () => {
        dispatch(loadingShow(true));
        const fetchedNote = await fetchNoteBy(note._id);
        if (fetchedNote?.status === 200) {
            dispatch(editFormData(fetchedNote?.data));
            onEditToggle(note._id);
            setShowMenu(false);
        }
        dispatch(loadingShow(false));
    };

    const onSubmit = async (data) => {
        dispatch(loadingShow(true));
        await updateNote(note._id, {
            question: data.question, // Match the field names from FormWithRichEditor
            answer: data.answer,
            technology: data.technology,
        });
        onEditToggle(null); // Close the editing form
        dispatch(resetFormData());
        dispatch(loadingShow(false));
    };

    const handleDelete = async () => {
        setShowMenu(false);
        await deleteNote(note._id);
        setIsModalOpen(false);
    };

    // const parseOptions = {
    //     replace: (domNode) => {
    //         if (domNode.name === 'pre') {
    //             return (
    //                 <Highlight className="javascript">
    //                     {domToReact(domNode.children)}
    //                 </Highlight>
    //             );
    //         }
    //     },
    // };

    return (
        <div className="border border-gray-300 shadow-lg p-2 md:p-4 rounded-lg mx-auto w-full relative">
            {/* Menu */}
            <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
            >
                <span className="text-gray-600">&#8942;</span>
            </div>

            {showMenu && (
                <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded-md shadow-md transition-transform">
                    <button
                        onClick={handleEdit}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="block px-4 py-2 text-red-700 hover:bg-red-100"
                    >
                        Delete
                    </button>
                </div>
            )}

            {isEditing ? (
                <FormWithRichEditor onSubmit={onSubmit} setEditingId={setEditingId} isEditing={isEditing} />
            ) : (
                <div>
                    <h3
                        className="text-base font-semibold cursor-pointer flex justify-between items-center"
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    >
                        {note?.question}
                        <span> {isAccordionOpen ? '-' : '+'} </span>
                    </h3>
                    {isAccordionOpen && (
                        <div className="grid grid-cols-1 pl-0 md:pl-8 lg:pl-8 mt-4">
                            {/* <div>{parse(note?.answer || '')}</div> */}
                            <HTMLRenderer htmlContent={note?.answer || ''} />
                        </div>
                    )}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
        </div>
    );
};

export default NoteCard;