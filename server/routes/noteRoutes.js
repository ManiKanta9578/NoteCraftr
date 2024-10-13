const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/notes', async (req, res) => {
  const { question, content } = req.body;
console.log()
  if (!question || !Array.isArray(content)) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const newNote = new Note({
      question,
      content // Set content directly
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
    // res.send("Welcome");
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get a specific note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  const { question, answer, code } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { question, answer, code }, { new: true });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Note deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
