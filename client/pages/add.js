import React, { useState } from 'react';
import { createNote } from '../services/api';

const AddNote = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    code: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote(formData);
    setFormData({ question: '', answer: '', code: '' });
  };

  return (
    <div>
      <h1>Add New Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={handleChange}
        />
        <textarea
          name="answer"
          placeholder="Answer"
          value={formData.answer}
          onChange={handleChange}
        />
        <textarea
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
