import React, { useState } from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Choose a theme
import { updateNote, deleteNote } from '../services/api';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NoteCard = ({ note, onUpdate }) => {
    const [editing, setEditing] = useState(false); // Track if editing mode is active
    const [editData, setEditData] = useState(note); // Store edited content
    const [showMenu, setShowMenu] = useState(false); // Track if menu is visible

    // Toggle edit mode
    const toggleEdit = () => {
        setEditing(!editing);
        setShowMenu(false);
    };

    // Handle deleting the note
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            await deleteNote(note._id);
            onUpdate(); // Refresh the notes list
        }
    };

    // Save the edited note
    const handleSave = async () => {
        await updateNote(editData._id, {
            question: editData.question,
            content: editData.content,
            technology: editData.technology
        });
        setEditing(false);
        // onUpdate(); // Refresh the notes list
    };

    // Handle content change for answer/code in editing mode
    const handleContentChange = (index, value) => {
        const updatedContent = [...editData.content];
        updatedContent[index].value = value;
        setEditData({ ...editData, content: updatedContent });
    };

    return (
        <div className="border border-gray-300 shadow-lg p-4 md:p-6 rounded-lg mx-auto w-full relative">
            {/* Three Dots Menu */}
            <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                <span className="text-gray-600">&#8942;</span>
            </div>

            {showMenu && (
                <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded-md shadow-md">
                    <button onClick={toggleEdit} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Edit
                    </button>
                    <button onClick={handleDelete} className="block px-4 py-2 text-red-500 hover:bg-gray-100">
                        Delete
                    </button>
                </div>
            )}

            {/* Question and Answers/Code Content */}
            {editing ? (
                <div>
                    <input
                        type="text"
                        value={editData.question}
                        onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                        className="w-full border p-2 mb-2 rounded-lg bg-inherit"
                    />
                    {editData.content.map((item, index) => (
                        <div key={index} className="mb-2">
                            {item.type === 'answer' ? (
                                <ReactQuill
                                    value={item.value}
                                    onChange={(value) => handleContentChange(index, value)}
                                    className="border rounded-lg mb-2"
                                />
                            ) : (
                                <textarea
                                    value={item.value}
                                    onChange={(e) => handleContentChange(index, e.target.value)}
                                    className="w-full border p-2 rounded-lg bg-inherit"
                                />
                            )}
                        </div>
                    ))}
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Save
                    </button>
                    <button onClick={() => setEditing(false)} className="ml-4 text-gray-500">
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="text-base font-semibold mb-3 text-left">{note.question}</h3>
                    {note.content.length > 0 ? (
                        <div className="grid grid-cols-1 pl-0 md:pl-8 lg:pl-8">
                            {note.content.map((item, index) => {
                                if (item.type === 'answer') {
                                    return (
                                        <div
                                            key={index}
                                            className="mb-2 text-base"
                                            dangerouslySetInnerHTML={{ __html: item.value }}
                                        />
                                    );
                                } else if (item.type === 'code') {
                                    return (
                                        <div key={index} className="mb-2 text-sm">
                                            <Highlight>{item.value}</Highlight>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No content available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default NoteCard;