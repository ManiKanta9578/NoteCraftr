const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  technology: {
    type: String,
    required: true
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
