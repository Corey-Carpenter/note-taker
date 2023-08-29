const fs = require('fs');
const path = require('path');
const notesData = require('../db/db.json');
const express = require('express');
const router = express.Router();

let notes = [...notesData];

const saveNotes = () => {
    fs.writeFile(
        path.resolve(__dirname, '../db/db.json'),
        JSON.stringify(notes),
        (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Notes have been successfully saved.');
            }
        }
    );
};

router.get('/all-notes', (req, res) => {
    const notesWithIds = notes.map((note, index) => ({
        ...note,
        noteId: index
    }));
    console.log('All notes:', notesWithIds);
    res.json(notesWithIds);
});

router.post('/add-note', (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    saveNotes();
    res.json(notes);
});

router.delete('/delete-note/:noteId', (req, res) => {
    const noteIdToDelete = parseInt(req.params.noteId);
    if (!isNaN(noteIdToDelete) && noteIdToDelete >= 0 && noteIdToDelete < notes.length) {
        notes.splice(noteIdToDelete, 1);
        saveNotes();
        res.json({ message: 'Note deleted successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid note ID.' });
    }
});

module.exports = router;
