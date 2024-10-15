const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/notes', async (req, res) => {
  const { question, content, technology } = req.body;

  if (!question || !Array.isArray(content) || !technology) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const newNote = new Note({ question, content, technology });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get notes based on technology
router.get('/notes', async (req, res) => {
  const { technology } = req.query; // Get technology from query parameters

  try {
    let notes;
    if (technology) {
      notes = await Note.find({ technology }); // Filter notes by technology
    } else {
      notes = await Note.find(); // Fetch all notes if no technology is specified
    }

    res.json(notes);
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
  const { question, content, technology } = req.body;

  // Ensure question, content, and technology are valid
  if (!question || !Array.isArray(content) || !technology) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { question, content, technology }, // Update question, content, and technology
      { new: true } // Return the updated note
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

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
