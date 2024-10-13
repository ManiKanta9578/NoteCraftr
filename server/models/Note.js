const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  code: { type: String, required: true }
});

module.exports = mongoose.model('Notes', noteSchema);
