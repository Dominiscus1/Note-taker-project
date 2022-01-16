const router = require("express").Router();
const path = require('path');
const fs = require("fs");
let db = require('../db/db.json');
const {v4:uuidv4} = require('uuid')


// initially getting all notes in the db.json
router.get("/notes", (req,res)=>{
    fs.readFile('./db/db.json', 'utf8',function (err, data) {
        if (err) throw err;
        console.log(data);
        let dataArr = JSON.parse(data);
        res.json(dataArr);//not the same as JSON
    })
})


// posting existing notes in db.json into browser
router.post("/notes", (req, res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }

    db.push(note);

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) {
            console.log(err)
        }
    })
    return res.json(db);
});

router.delete("/notes/:id", (req, res) => {
    let notesLeft = db.filter((note) => {
        return (note.id != req.params.id)
    })
    db = notesLeft;
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notesLeft))
    res.send("Note deleted")
})


module.exports = router;