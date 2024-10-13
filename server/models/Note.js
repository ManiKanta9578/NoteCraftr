const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['answer', 'code'], // Only allow these two types
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const noteSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  content: [contentSchema] // Use the content schema for an array
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
