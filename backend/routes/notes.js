const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
// const User = require('../models/User');

//Route 1: Get All the notes using :GET "/api/notes/fetchallnotes".login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

//Route 2: Add a new note using :POST "/api/notes/addnote".login required 
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description should be of length 5 or more").isLength({ min: 5 })]
    , async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                user: req.user.id, title, description, tag,
            })
            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
        }

    })

//Route 3: Update an existing note using :PUT "/api/notes/updatenote".login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Create a new note object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})


//Route 4: Delete an existing note using :DELETE "/api/notes/deletenote".login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        //Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted!", "note": note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }



})

module.exports = router;