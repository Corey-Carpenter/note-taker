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
    let allNotes = notes.map((item, index) => ({
        ...item,
        id: index
    }))
    console.log(allNotes);
     res.json(allNotes)
})

router.post('/notes', (req, res) => {
    notes.push(req.body)
    saveNotes()
    res.json(notes)
})

router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    notes.splice(req.params.id, 1)
    saveNotes()
    res.json()
})

module.exports = router;
