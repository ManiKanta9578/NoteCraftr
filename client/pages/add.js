import React, { useState } from 'react';
import { createNote } from '../services/api';
import styles from '../styles/AddNote.module.css';

const AddNote = () => {
  const [formData, setFormData] = useState({
    question: '',
    fields: [{ type: 'answer', value: '' }] // Start with one answer field
  });
  console.log(formData)
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
    <div className={styles.container}>
      <h1>Add New Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          className={styles.input}
        />

        {formData.fields.map((field, index) => (
          <div key={index} className={styles.fieldContainer}>
            {field.type === 'answer' ? (
              <>
                <textarea
                  name={`answer-${index}`}
                  placeholder="Answer"
                  value={field.value}
                  onChange={(e) => handleChange(e, index)}
                  className={styles.textarea}
                />
                <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
              </>
            ) : (
              <>
                <textarea
                  name={`code-${index}`}
                  placeholder="Code"
                  value={field.value}
                  onChange={(e) => handleChange(e, index)}
                  className={styles.textarea}
                />
                <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
              </>
            )}
          </div>
        ))}

        <div className={styles.buttonGroup}>
          <button type="button" onClick={() => handleAddField('answer')}>Add Answer</button>
          <button type="button" onClick={() => handleAddField('code')}>Add Code</button>
        </div>

        <button type="submit" className={styles.button}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
