import React, { useState, useEffect } from 'react';
import { createNote } from '../services/api';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill's styles

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddNote = ({ theme }) => {  // Assuming `theme` prop is passed for dark/light mode
  const [mounted, setMounted] = useState(false); // Track whether the component is mounted on the client side
  const [formData, setFormData] = useState({
    question: '',
    fields: [{ type: 'answer', value: '' }],
    technology: ''
  });

  // Ensure the component is only rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // ReactQuill configuration for toolbar
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'code-block'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];

  // Handle input changes
  const handleChange = (value, index) => {
    const updatedFields = [...formData.fields];
    updatedFields[index].value = value;
    setFormData({ ...formData, fields: updatedFields });
  };

  // Add a new field (answer or code)
  const handleAddField = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, { type, value: '' }]
    }));
  };

  // Remove a field
  const handleRemoveField = (index) => {
    const updatedFields = formData.fields.filter((_, i) => i !== index);
    setFormData({ ...formData, fields: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty "answer" fields that have only <p><br></p>
    const cleanedFields = formData.fields.filter((field) => {
      // Check if it's a code field or a non-empty answer field
      if (field.type === 'answer') {
        return field.value !== '<p><br></p>' && field.value.trim() !== '';
      }
      return field.value.trim() !== ''; // For code fields
    });

    const content = cleanedFields.map((field) => ({
      type: field.type,
      value: field.value
    }));

    // Submit cleaned form data
    await createNote({
      question: formData.question,
      content,
      technology: formData.technology
    });

    // Reset form to initial state after submission
    setFormData({
      question: '',
      fields: [{ type: 'answer', value: '' }],
      technology: ''
    });
  };

  return (
    <div className={`mx-auto p-6 rounded-lg mt-12`}>
      <h1 className="text-2xl lg:text-2xl font-bold mb-6 text-center">Add a New Note</h1>
      <form onSubmit={handleSubmit}>
        {/* Technology Dropdown */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Select Technology</label>
          <select
            name="technology"
            value={formData.technology}
            onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
            className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none bg-transparent`}
          >
            <option value="">Select Technology</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
          </select>
        </div>

        {/* Question Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Question</label>
          <input
            type="text"
            name="question"
            placeholder="Enter your question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            className={`w-full border p-3 rounded-lg focus:ring-2 focus:outline-none bg-transparent`}
          />
        </div>

        {/* Fields for Answer/Code */}
        {formData.fields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === 'answer' ? (
              <div>
                {mounted && (
                  <ReactQuill
                    value={field.value}
                    onChange={(value) => handleChange(value, index)}
                    placeholder="Write your answer"
                    modules={modules}
                    formats={formats}
                    className="border border-gray-300 rounded-lg mb-2"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Remove Answer
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  name={`code-${index}`}
                  placeholder="Enter your code"
                  value={field.value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className={`w-full border p-3 rounded-lg mb-2 focus:ring-2 focus:outline-none
                    ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  Remove Code
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Buttons to Add Fields */}
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            onClick={() => handleAddField('answer')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add Answer
          </button>
          <button
            type="button"
            onClick={() => handleAddField('code')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add Code
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white w-full py-3 rounded-lg transition">
          Submit Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;