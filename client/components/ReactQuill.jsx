import React, { useState, useMemo, useEffect } from 'react';
import { Save, X, FileText, Code, Globe, Layers, Terminal, Database, Zap, Layout, Palette, Plus, Check, AlertCircle, Bold, Italic, List, Code2, Eye, Edit3 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const technologies = [
  { value: 'React', label: 'React.js', icon: Layers, color: 'from-blue-400 to-cyan-500' },
  { value: 'NextJs', label: 'Next.js', icon: Globe, color: 'from-gray-700 to-gray-900' },
  { value: 'Nodejs', label: 'Node.js', icon: Terminal, color: 'from-green-400 to-emerald-500' },
  { value: 'JavaScript', label: 'JavaScript', icon: Code, color: 'from-yellow-400 to-orange-500' },
  { value: 'JSOutput', label: 'JS Output QAs', icon: FileText, color: 'from-amber-400 to-orange-500' },
  { value: 'ReactMR', label: 'React MR QAs', icon: Zap, color: 'from-indigo-400 to-purple-500' },
  { value: 'DSA', label: 'DSA', icon: Database, color: 'from-purple-400 to-pink-500' },
  { value: 'CSS', label: 'CSS', icon: Palette, color: 'from-teal-400 to-blue-500' },
  { value: 'HTML', label: 'HTML', icon: Layout, color: 'from-red-400 to-pink-500' },
];

const FormWithRichEditor = ({ onSubmit, setEditingId, isEditing }) => {

  const editFormData = useSelector(state => state.form);
  console.log(editFormData, "editFormData")

  const [formData, setFormData] = useState({
    technology: '',
    question: '',
    answer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRichTextChange = (content) => {
    setFormData(prev => ({ ...prev, answer: content }));
    if (errors.answer) {
      setErrors(prev => ({ ...prev, answer: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.technology) newErrors.technology = 'Please select a technology';
    if (!formData.question.trim()) newErrors.question = 'Question is required';
    if (!formData.answer.trim() || formData.answer === '<p><br></p>') newErrors.answer = 'Answer is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ technology: '', question: '', answer: '' });
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({ technology: '', question: '', answer: '' });
    setErrors({});
    setIsPreview(false);
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align'
  ];

  const selectedTech = technologies.find(tech => tech.value === formData.technology);

  useEffect(() => {
    if (isEditing) {
      setFormData((prev) => ({
        technology: editFormData?.technology || '',
        question: editFormData?.question || '',
        answer: editFormData?.answer || ''
      }))
    }

  }, [isEditing, editFormData]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Create New Note
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Add your technical knowledge with rich formatting and code blocks
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
          <div className="space-y-8">
            {/* Technology Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Technology
              </label>
              <div className="relative">
                <select
                  name="technology"
                  value={formData.technology}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.technology ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    }`}
                >
                  <option value="">Select a technology...</option>
                  {technologies.map((tech) => (
                    <option key={tech.value} value={tech.value}>
                      {tech.label}
                    </option>
                  ))}
                </select>
                {selectedTech && (
                  <div className="absolute right-3 top-3 flex items-center">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${selectedTech.color} flex items-center justify-center`}>
                      <selectedTech.icon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
              {errors.technology && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.technology}</span>
                </div>
              )}
            </div>

            {/* Question Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Question
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Enter your question here..."
                className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.question ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  }`}
              />
              {errors.question && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.question}</span>
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Answer
              </label>
              <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${errors.answer ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                }`}>
                {/* Editor */}
                <div className="min-h-[300px] bg-white dark:bg-slate-800">
                  <ReactQuill
                    theme="snow"
                    value={formData.answer}
                    onChange={handleRichTextChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your detailed answer here..."
                    className="h-64"
                  />
                </div>
              </div>
              {errors.answer && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.answer}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={isEditing ? () => setEditingId(null) : handleClear}
                className="flex items-center space-x-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 font-medium"
              >
                <X className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Clear'}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Code2 className="w-5 h-5" />
              <span className="font-medium">Code Blocks</span>
            </div>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">
              Support for syntax-highlighted code blocks in multiple languages.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Eye className="w-5 h-5" />
              <span className="font-medium">Rich Formatting</span>
            </div>
            <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">
              Full rich text editor with formatting options and live preview.
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
              <FileText className="w-5 h-5" />
              <span className="font-medium">HTML Output</span>
            </div>
            <p className="text-sm text-purple-600/80 dark:text-purple-400/80 mt-1">
              Clean HTML output that's easy to render and display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWithRichEditor;