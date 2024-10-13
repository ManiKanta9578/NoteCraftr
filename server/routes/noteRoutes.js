const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/', async (req, res) => {
  const { question, answer, code } = req.body;
  try {
    const newNote = new Note({ question, answer, code });
    await newNote.save();
    res.json(newNote);
  } catch (err) {
    res.status(500).send('Server error');
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
