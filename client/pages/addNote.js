import React, { useState, useEffect } from 'react';
import { createNote } from '../services/api';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill's styles

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddNote = () => {
  const [mounted, setMounted] = useState(false); // Track whether the component is mounted on the client side
  const [formData, setFormData] = useState({
    question: '',
    fields: [{ type: 'answer', value: '' }],
    technology: ''
  });

  console.log(formData);
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
    <div className="mx-auto h-screen p-6 shadow-lg rounded-lg mt-16">
      <h1 className="text-2xl font-semibold mb-4">Add New Note</h1>
      <form onSubmit={handleSubmit}>
        {/* Technology Dropdown */}
        <select
          name="technology"
          value={formData.technology}
          onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
          className="w-full border border-gray-300 bg-inherit p-2 mb-4 rounded-lg"
        >
          <option value="">Select Technology</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="JavaScript">JavaScript</option>
          <option value="JSOutput">JS Output QAs</option>
          <option value="ReactMR">React MR QAs</option> {/* MR: Machine Round */}
          <option value="DSA">DSA</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
        </select>

        {/* Question Input */}
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full border border-gray-300 bg-inherit p-2 mb-4 rounded-lg"
        />

        {/* Fields for Answer/Code */}
        {formData.fields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === 'answer' ? (
              <>
                {mounted && (
                  <ReactQuill
                    value={field.value}
                    onChange={(value) => handleChange(value, index)}
                    placeholder="Answer"
                    modules={modules}
                    formats={formats}
                    className="border border-gray-300 rounded-lg mb-2"
                  />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <textarea
                  name={`code-${index}`}
                  placeholder="Code"
                  value={field.value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        ))}

        {/* Buttons to Add Fields */}
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => handleAddField('answer')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Answer
          </button>
          <button
            type="button"
            onClick={() => handleAddField('code')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Add Code
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-purple-500 text-white w-full py-2 rounded-lg">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
