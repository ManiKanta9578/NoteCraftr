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
    BookOpen,
    Clock,
    Eye,
    EyeOff
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

// Enhanced HTMLRenderer with better mobile optimization
const HTMLRenderer = ({ htmlContent }) => {
    const renderContent = (content) => {
        if (!content) return '';

        let html = content;

        // Code blocks with better mobile styling
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'javascript';
            return `<div class="relative my-3 sm:my-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs border-b border-gray-200 dark:border-gray-700">
                    <span class="text-gray-600 dark:text-gray-400">${language}</span>
                    <span class="text-gray-500 dark:text-gray-500">code</span>
                </div>
                <pre class="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code class="language-${language}">${code.trim()}</code></pre>
            </div>`;
        });

        // Inline code with better mobile styling
        html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-gray-200 dark:border-gray-700 break-all">$1</code>');

        // Bold with better contrast
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>');

        // Enhanced lists with better mobile spacing
        html = html.replace(/^- (.+)$/gm, '<li class="flex items-start space-x-2 py-1.5 sm:py-1"><span class="text-blue-500 mt-1 flex-shrink-0">•</span><span class="text-sm sm:text-base leading-relaxed">$1</span></li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul class="space-y-1 my-3 sm:my-4 ml-2 sm:ml-4">$1</ul>');

        // Better line breaks for mobile
        html = html.replace(/\n/g, '<br class="my-1">');

        return html;
    };

    return (
        <div
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed overflow-hidden"
            dangerouslySetInnerHTML={{ __html: renderContent(htmlContent) }}
        />
    );
};

// Enhanced Modal with better mobile styling
const Modal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm sm:max-w-md shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-all">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Note</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</p>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                        Are you sure you want to delete this note? This will permanently remove it from your collection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-end sm:space-x-3">
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-center border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onDelete}
                            className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-center"
                        >
                            Delete Note
                        </button>
                    </div>
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
            question: data.question,
            answer: data.answer,
            technology: data.technology,
        });
        onEditToggle(null);
    };

    const handleDelete = async () => {
        await deleteNote(note._id);
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
        <div className="group relative w-full">
            {isLoading ? (
                <CardSkeleton />
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">

                    {/* Clean Header */}
                    <div className="p-1 sm:p-2 flex items-center justify-between">
                        <div className={`${techConfig.bgColor} ${techConfig.borderColor} border rounded-lg px-3 py-2 flex items-center space-x-2`}>
                            <div className={`w-4 h-4 ${techConfig.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <TechIcon className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className={`text-sm font-medium ${techConfig.textColor}`}>
                                {note.technology}
                            </span>
                        </div>

                        {/* Actions Menu */}
                        <div className="relative flex-shrink-0">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            {showMenu && (
                                <>
                                    {/* Backdrop for mobile */}
                                    <div
                                        className="fixed inset-0 z-10 sm:hidden"
                                        onClick={() => setShowMenu(false)}
                                    />

                                    <div className="absolute top-12 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                                        <button
                                            onClick={handleEdit}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4 flex-shrink-0" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={handleCopy}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <Copy className="w-4 h-4 flex-shrink-0" />
                                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                                        </button>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                        <button
                                            onClick={handleDeleteClick}
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 flex-shrink-0" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="sm:p-3 p-1">
                        {isEditing ? (
                            <FormWithRichEditor
                                onSubmit={onSubmit}
                                setEditingId={setEditingId}
                                isEditing={isEditing}
                            />
                        ) : (
                            <div className="space-y-4">
                                {/* Question Section - Clean and prominent */}
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight mb-4">
                                        {note.question}
                                    </h3>
                                </div>

                                {/* Answer Toggle - Clean */}
                                <div>
                                    <button
                                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                                    >
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {isAccordionOpen ? 'Hide Answer' : 'Show Answer'}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isAccordionOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Answer Content */}
                                    {isAccordionOpen && (
                                        <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
                                             <div className="grid grid-cols-1 pl-0 md:pl-8 lg:pl-8 mt-4">
                                                <HTMLRenderer htmlContent={note.answer} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Enhanced Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} />
        </div>
    );
};

export default NoteCard;