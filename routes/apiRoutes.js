const router = require("express").Router();
const path = require('path');
const fs = require("fs");
let db = require('../db/db.json');
const {v4:uuidv4} = require('uuid')

// initially getting all notes in the db.json
router.get("/notes", (req,res)=>{
    const notes = JSON.pasrse(fs.readFileSync('../db/db.json'));
    res.json(notes);
})


router.post("/notes", (req,res) => {
    let id = uuidv4();
    req.body.id = id;
    db.push(req.body);
    
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db))
    res.send(`${req.method} note added!`)
})

router.delete("/notes/:id", (req,res) => {
    let remainingNotes = db.filter((note) => {
        return (note.id != req.params.id) 
    })
    fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify(remainingNotes))
    //res.send(`Note Deleted!`)

    const getNotes = () => {
        router.get('/notes', (req,res) => {
            res.json(db)
        })
    }
    getNotes()

    res.send(`Note Deleted!`)
})

module.exports = router;