const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator'); //to validate data in user request

//Route 1-fetch all notes using get-login required
router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ User: req.user.id })
        res.json(notes);
    } catch (error) {
        return res.status(500).json({ "error": "internal server error" });
    }
})

//Route 2-add note using post

router.post('/addnotes', fetchuser, [body('Title', "Title should be  minimum length  of 3").isLength({ min: 3 }),
body('Description', "Description shouid have minimum 5 chars").isLength({ min: 5 })], async(req, res) => {
    try {
        const err =  validationResult(req);

        if (!err.isEmpty()) {
            console.log(err.array())
            return res.status(400).json({ error: err.array() });
        }
        const { Title, Description, Tag } = req.body;

        const note = new Notes({
            Title, Description, Tag, User: req.user.id
        }
        )
        await note.save();
        res.json(note);
    } catch (error) {
        return res.status(500).json({ "error": "internal server error" });
    }
})

// route3-update notes using put
router.put('/updatenotes/:id', fetchuser, [body('Title', "Title should be  minimum length  of 3").isLength({ min: 3 }),
body('Description', "Description shouid have minimum 5 chars").isLength({ min: 5 })], async (req, res) => {
    try {

        const err =  validationResult(req);

        if (!err.isEmpty()) {
            console.log(err.array())
            console.log(req.body);
            return res.status(400).json({ error: err.array() });
        }
        const { Title, Description, Tag } = req.body;
        const updatednotes = {
        }
        if (Title) { updatednotes.Title = Title; }
        if (Description) { updatednotes.Description = Description; }
        updatednotes.Tag = Tag; 

        const notes = await Notes.findById(req.params.id);
        if (!notes) {
            res.status(404).send("not found");
        }
        if ( req.user.id!== notes.User.toString()) {
            res.status(403).send("access denied");
        }

       const enotes= await Notes.findByIdAndUpdate(req.params.id,{$set:updatednotes},{new:true})

        res.send(enotes);
       


    } catch (error) {
        return res.status(500).json({ "error": "internal server error "+error });
    }
})

 // route4-Delete  notes using Delete
 router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    try {
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
        res.status(404).send("not found");
    }
    if ( req.user.id!== notes.User.toString()) {
        res.status(403).send("access denied");
    }
   notes= await Notes.findByIdAndDelete(req.params.id)
     res.json({"Success":"Note has been deleted",notes})   
    }catch (error) {
        return res.status(500).json({ "error": "internal server error "+error });
    }
})

module.exports = router;