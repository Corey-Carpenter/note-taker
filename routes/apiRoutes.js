const fs = require('fs');
const path = require('path');
const notesData = require('../db/db.json');
const express = require('express');
const router = express.Router();

let notes = notesData


const saveNotes = () => {
    fs.writeFile(
        path.resolve(__dirname, '../db/db.json'),
        JSON.stringify(notes),
        (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Notes saved successfully.');
            }
        }
    );
};


router.get('/notes', (req, res) => {
    const allNotes = notes.map((note, index) => ({
        ...note,
        id: index
    }))
    console.log(allNotes);
     res.json(allNotes)
})

router.post('/notes', (req, res) => {
    const newNote = req.body
    notes.push(newNote)
    saveNotes()
    res.json(notes)
})

router.delete('/notes/:id', (req, res) => {
    const noteIdToDelete = parseInt(req.params.id); 
    if (!isNaN(noteIdToDelete) && noteIdToDelete >= 0 && noteIdToDelete < notes.length) {
        notes.splice(noteIdToDelete, 1);
        saveNotes();
        res.json({ message: 'Note deleted successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid note ID.' });
    }
});



module.exports = router;
