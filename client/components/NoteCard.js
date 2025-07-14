import React, { useState } from 'react';
import {
    MoreVertical,
    Edit3,
    Trash2,
    ChevronDown,
    ChevronRight,
    Code2,
    FileText,
    Globe,
    Layers,
    Terminal,
    Database,
    Zap,
    Layout,
    Palette,
    Calendar,
    User,
    Tag,
    ExternalLink,
    Copy,
    BookOpen
} from 'lucide-react';
import FormWithRichEditor from './ReactQuill';
import { useDispatch, useSelector } from 'react-redux';
import { CardSkeleton } from './LoadingSpinner';
import { loadingShow } from '@/store/slices/loadingSlice';
import { deleteNote, fetchNoteBy, updateNote } from '@/services/api';
import { editFormData } from '@/store/slices/formSlice';

// Technology icons and colors mapping
const technologyConfig = {
    React: { icon: Layers, color: 'bg-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20', textColor: 'text-blue-700 dark:text-blue-300', borderColor: 'border-blue-200 dark:border-blue-800' },
    NextJs: { icon: Globe, color: 'bg-gray-800', bgColor: 'bg-gray-50 dark:bg-gray-900/20', textColor: 'text-gray-700 dark:text-gray-300', borderColor: 'border-gray-200 dark:border-gray-800' },
    Nodejs: { icon: Terminal, color: 'bg-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20', textColor: 'text-green-700 dark:text-green-300', borderColor: 'border-green-200 dark:border-green-800' },
    JavaScript: { icon: Code2, color: 'bg-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', textColor: 'text-yellow-700 dark:text-yellow-300', borderColor: 'border-yellow-200 dark:border-yellow-800' },
    JSOutput: { icon: FileText, color: 'bg-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20', textColor: 'text-orange-700 dark:text-orange-300', borderColor: 'border-orange-200 dark:border-orange-800' },
    ReactMR: { icon: Zap, color: 'bg-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20', textColor: 'text-purple-700 dark:text-purple-300', borderColor: 'border-purple-200 dark:border-purple-800' },
    DSA: { icon: Database, color: 'bg-indigo-500', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', textColor: 'text-indigo-700 dark:text-indigo-300', borderColor: 'border-indigo-200 dark:border-indigo-800' },
    CSS: { icon: Palette, color: 'bg-pink-500', bgColor: 'bg-pink-50 dark:bg-pink-900/20', textColor: 'text-pink-700 dark:text-pink-300', borderColor: 'border-pink-200 dark:border-pink-800' },
    HTML: { icon: Layout, color: 'bg-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20', textColor: 'text-red-700 dark:text-red-300', borderColor: 'border-red-200 dark:border-red-800' },
};

// Mock HTMLRenderer component
const HTMLRenderer = ({ htmlContent }) => {
    const renderContent = (content) => {
        if (!content) return '';

        let html = content;

        // Code blocks with syntax highlighting
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'javascript';
            return `<div class="relative">
        <div class="absolute top-2 right-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">${language}</div>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700"><code class="language-${language}">${code.trim()}</code></pre>
      </div>`;
        });

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-2 py-1 rounded text-sm font-mono border">$1</code>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>');

        // Lists
        html = html.replace(/^- (.+)$/gm, '<li class="flex items-start space-x-2 py-1"><span class="text-blue-500 mt-1">•</span><span>$1</span></li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul class="space-y-1 my-3 ml-4">$1</ul>');

        // Line breaks
        html = html.replace(/\n/g, '<br>');

        return html;
    };

    return (
        <div
            className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderContent(htmlContent) }}
        />
    );
};

// Mock Modal component
const Modal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Note</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</p>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Are you sure you want to delete this note? This will permanently remove it from your collection.
                </p>

                <div className="flex items-center justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};


const NoteCard = ({ note, isEditing, onEditToggle, setEditingId }) => {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.loading);

    const [showMenu, setShowMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [copied, setCopied] = useState(false);


    const handleDeleteClick = () => {
        setShowMenu(false);
        setIsModalOpen(true);
    };

    // const handleEdit = async () => {
    //     // Mock edit functionality
    //     onEditToggle(note._id);
    //     setShowMenu(false);
    // };

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
        await updateNote(note._id, {
            question: data.question, // Match the field names from FormWithRichEditor
            answer: data.answer,
            technology: data.technology,
        });
        console.log('Updating note:', data);
        onEditToggle(null);
    };

    const handleDelete = async () => {
        await deleteNote(note._id);
        console.log('Deleting note:', note._id);
        setShowMenu(false);
        setIsModalOpen(false);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(note.answer);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const techConfig = technologyConfig[note.technology] || technologyConfig.JavaScript;
    const TechIcon = techConfig.icon;
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="group relative">
            {/* Main Card */}
            {isLoading ? (<CardSkeleton />) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 flex-1">
                            {/* Technology Badge */}
                            <div className={`${techConfig.bgColor} ${techConfig.borderColor} border rounded-xl px-3 py-1.5 flex items-center space-x-2`}>
                                <div className={`w-4 h-4 ${techConfig.color} rounded-full flex items-center justify-center`}>
                                    <TechIcon className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className={`text-xs font-medium ${techConfig.textColor}`}>
                                    {note.technology}
                                </span>
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(note.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <User className="w-3 h-3" />
                                    <span>You</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </button>

                            {showMenu && (
                                <div className="absolute top-10 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
                                    <button
                                        onClick={handleEdit}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        <span>Edit Note</span>
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                        <span>{copied ? 'Copied!' : 'Copy Content'}</span>
                                    </button>
                                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                    <button
                                        onClick={handleDeleteClick}
                                        className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete Note</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    {isEditing ? (
                        <FormWithRichEditor
                            onSubmit={onSubmit}
                            setEditingId={setEditingId}
                            isEditing={isEditing}
                        />
                    ) : (
                        <div className="space-y-4">
                            {/* Question */}
                            <div
                                className="cursor-pointer"
                                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                            >
                                <div className="flex items-center justify-between group/question">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover/question:text-blue-600 dark:group-hover/question:text-blue-400 transition-colors flex-1 pr-4">
                                        {note.question}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {isAccordionOpen ? 'Hide' : 'Show'} answer
                                        </div>
                                        <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 group-hover/question:bg-blue-100 dark:group-hover/question:bg-blue-900/30 transition-colors">
                                            {isAccordionOpen ? (
                                                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/question:text-blue-600 dark:group-hover/question:text-blue-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/question:text-blue-600 dark:group-hover/question:text-blue-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Answer */}
                            {isAccordionOpen && (
                                <div className="animate-in slide-in-from-top-2 duration-200">
                                    <div className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50 dark:bg-gray-900/50 rounded-r-xl">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Answer</span>
                                        </div>
                                        <div className="grid grid-cols-1 pl-0 md:pl-8 lg:pl-8 mt-4">
                                            <HTMLRenderer htmlContent={note.answer} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                                <Tag className="w-3 h-3" />
                                <span>Technical Note</span>
                            </div>
                            {note.updatedAt !== note.createdAt && (
                                <div className="flex items-center space-x-1">
                                    <Edit3 className="w-3 h-3" />
                                    <span>Updated {formatDate(note.updatedAt)}</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleCopy}
                            className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <Copy className="w-3 h-3" />
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
        </div>
    );
};

export default NoteCard;