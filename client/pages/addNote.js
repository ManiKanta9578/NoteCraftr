import React, { useState } from 'react';
import { createNote } from '../services/api';

const AddNote = () => {
  const [formData, setFormData] = useState({
    question: '',
    fields: [{ type: 'answer', value: '' }] // Start with one answer field
  });

  const handleChange = (e, index) => {
    const updatedFields = [...formData.fields];
    updatedFields[index].value = e.target.value;
    setFormData({ ...formData, fields: updatedFields });
  };

  const handleAddField = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, { type, value: '' }] // Add a new field object
    }));
  };

  const handleRemoveField = (index) => {
    const updatedFields = formData.fields.filter((_, i) => i !== index);
    setFormData({ ...formData, fields: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the entire content array with type and value
    const content = formData.fields.map(field => ({
      type: field.type,
      value: field.value
    }));

    await createNote({
      question: formData.question,
      content
    });

    // Reset form to initial state
    setFormData({ question: '', fields: [{ type: 'answer', value: '' }] });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add New Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className="w-full border border-gray-300 p-2 mb-4 rounded-lg"
        />

        {formData.fields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === 'answer' ? (
              <>
                <textarea
                  name={`answer-${index}`}
                  placeholder="Answer"
                  value={field.value}
                  onChange={(e) => handleChange(e, index)}
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
            ) : (
              <>
                <textarea
                  name={`code-${index}`}
                  placeholder="Code"
                  value={field.value}
                  onChange={(e) => handleChange(e, index)}
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

        <button type="submit" className="bg-purple-500 text-white w-full py-2 rounded-lg">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
