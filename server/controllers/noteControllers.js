const sanitizeHtml = require("sanitize-html");
const Note = require("../models/Note");


const register = async (req, res) => {
    const { question, answer, technology } = req.body;

    if (!question || !answer || !technology) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        // Sanitize each content item's value
        const sanitizedAnswer = sanitizeHtml(answer);

        const newNote = new Note({ question, answer: sanitizedAnswer, technology });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllNotesByTechnology = async (req, res) => {
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
}

const getNotesById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const updateNote = async (req, res) => {
    const { question, answer, technology } = req.body;

    // Ensure question, content, and technology are valid
    if (!question || !answer || !technology) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        // Sanitize each content item's value
        const sanitizedAnswer = sanitizeHtml(answer);

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { question, answer: sanitizedAnswer, technology },
            { new: true } // Return the updated note
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Note deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
}


module.exports = { register, getAllNotesByTechnology, getNotesById, updateNote, deleteNote };