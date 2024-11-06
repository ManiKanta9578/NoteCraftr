const express = require('express');
const router = express.Router();
const {register, getAllNotesByTechnology, getNotesById, updateNote, deleteNote} = require("../controllers/noteControllers");

// Create a new note
router.post('/notes',register);

// Get notes based on technology
router.get('/notes', getAllNotesByTechnology);

// Get a specific note
router.get('/:id', getNotesById);

// Update a note
router.put('/:id', updateNote);

// Delete a note
router.delete('/:id', deleteNote);

module.exports = router;
