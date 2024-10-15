import React, { useState } from 'react';
import { createNote } from '../services/api';

const AddNote = () => {
  const [formData, setFormData] = useState({
    question: '',
    fields: [{ type: 'answer', value: '' }],
    technology: ''
  });

  const handleChange = (e, index) => {
    const updatedFields = [...formData.fields];
    updatedFields[index].value = e.target.value;
    setFormData({ ...formData, fields: updatedFields });
  };

  const handleAddField = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, { type, value: '' }]
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
      content,
      technology: formData.technology // Include technology in the payload
    });

    // Reset form to initial state
    setFormData({ question: '', fields: [{ type: 'answer', value: '' }], technology: '' });
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4">Add New Note</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="technology"
          value={formData.technology}
          onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
          className="w-full border border-gray-300 p-2 mb-4 rounded-lg"
        >
          <option value="">Select Technology</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          <option value="HTML">HTML</option>
        </select>

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
